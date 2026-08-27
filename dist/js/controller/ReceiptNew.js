/* Receipt Controller - Enhanced */
(function() {
  console.log('Receipt Controller Loaded');
  
  const ReceiptController = {
    receiptList: [],
    patientList: [],
    prescriptionList: [],
    medicineList: [],
    
    init: function() {
      this.loadDropdowns();
      this.attachEventListeners();
      this.loadReceipts();
      this.setupFormValidation();
      this.addAnimations();
    },
    
    setupFormValidation: function() {
      const form = document.getElementById('Receiptform');
      if (form) {
        const inputs = form.querySelectorAll('.form-control, .ui.dropdown');
        inputs.forEach(input => {
          input.addEventListener('focus', function() {
            this.style.borderColor = '#3498db';
          });
          input.addEventListener('blur', function() {
            this.style.borderColor = '#bdc3c7';
          });
        });
      }
    },
    
    loadDropdowns: function() {
      const patStored = localStorage.getItem('patients');
      this.patientList = patStored ? JSON.parse(patStored) : [];
      
      const presStored = localStorage.getItem('prescriptions');
      this.prescriptionList = presStored ? JSON.parse(presStored) : [];
      
      const medStored = localStorage.getItem('medicines');
      this.medicineList = medStored ? JSON.parse(medStored) : [];
      
      this.populateDropdowns();
    },
    
    populateDropdowns: function() {
      const patientDropdown = document.getElementById('droppaid');
      const prescriptionDropdown = document.getElementById('droppid');
      const medicineDropdown = document.getElementById('dropmid');
      
      if (patientDropdown) {
        patientDropdown.innerHTML = '<option value="">-- Select Patient --</option>';
        this.patientList.forEach(p => {
          const option = document.createElement('option');
          option.value = p.id;
          option.textContent = `${p.id} - ${p.name}`;
          patientDropdown.appendChild(option);
        });
      }
      
      if (prescriptionDropdown) {
        prescriptionDropdown.innerHTML = '<option value="">-- Select Prescription --</option>';
        this.prescriptionList.forEach(p => {
          const option = document.createElement('option');
          option.value = p.presid;
          option.textContent = `PID: ${p.presid}`;
          prescriptionDropdown.appendChild(option);
        });
      }
      
      if (medicineDropdown) {
        medicineDropdown.innerHTML = '<option value="">-- Select Medicine --</option>';
        this.medicineList.forEach(m => {
          const option = document.createElement('option');
          option.value = m.mid;
          option.textContent = `${m.mid} - ${m.des}`;
          medicineDropdown.appendChild(option);
        });
      }
    },
    
    attachEventListeners: function() {
      const saveBtn = document.getElementById('btnsaveres');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => this.saveReceipt());
      }
    },
    
    saveReceipt: function() {
      const rid = document.getElementById('rid').value.trim();
      const unitprice = document.getElementById('txtUnitprice').value.trim();
      const qty = document.getElementById('rqty').value.trim();
      const date = document.getElementById('txtdate').value;
      const patientid = document.getElementById('droppaid').value;
      const presid = document.getElementById('droppid').value;
      const mid = document.getElementById('dropmid').value;
      
      if (!rid || !unitprice || !qty || !date || !patientid || !presid || !mid) {
        this.showNotification('Please fill all fields', 'error');
        return;
      }
      
      if (isNaN(unitprice) || isNaN(qty)) {
        this.showNotification('Price and Quantity must be numbers', 'error');
        return;
      }
      
      if (this.receiptList.some(r => r.rid === rid)) {
        this.showNotification('Receipt ID already exists', 'error');
        return;
      }
      
      const total = (parseFloat(unitprice) * parseFloat(qty)).toFixed(2);
      this.receiptList.push({ rid, unitprice: parseFloat(unitprice).toFixed(2), qty, date, patientid, presid, mid, total });
      localStorage.setItem('receipts', JSON.stringify(this.receiptList));
      this.displayReceipts();
      this.clearForm();
      this.showNotification('✓ Receipt saved successfully!', 'success');
    },
    
    loadReceipts: function() {
      const stored = localStorage.getItem('receipts');
      this.receiptList = stored ? JSON.parse(stored) : [];
      this.displayReceipts();
    },
    
    displayReceipts: function() {
      const tbody = document.querySelector('#tblReceipt tbody');
      if (tbody) {
        tbody.innerHTML = '';
        if (this.receiptList.length === 0) {
          tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 30px; color: #95a5a6;"><i>No receipts added yet</i></td></tr>';
        } else {
          this.receiptList.forEach((receipt) => {
            const row = `<tr style="animation: slideIn 0.3s ease;">
              <td><strong>#${receipt.rid}</strong></td>
              <td>${receipt.patientid}</td>
              <td>${receipt.presid}</td>
              <td>${receipt.mid}</td>
              <td>$${receipt.unitprice}</td>
              <td>${receipt.qty}</td>
              <td>${receipt.date}</td>
              <td><strong style="color: #27ae60;">$${receipt.total}</strong></td>
              <td><button class="btn btn-sm" style="background: #e74c3c; color: white; border: none; cursor: pointer;" onclick="ReceiptController.deleteReceipt('${receipt.rid}')">🗑 Delete</button></td>
            </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
          });
        }
      }
    },
    
    deleteReceipt: function(id) {
      if (confirm('Are you sure you want to delete this receipt?')) {
        this.receiptList = this.receiptList.filter(r => r.rid !== id);
        localStorage.setItem('receipts', JSON.stringify(this.receiptList));
        this.displayReceipts();
        this.showNotification('✓ Receipt deleted successfully', 'success');
      }
    },
    
    clearForm: function() {
      document.getElementById('rid').value = '';
      document.getElementById('txtUnitprice').value = '';
      document.getElementById('rqty').value = '';
      document.getElementById('txtdate').value = '';
      document.getElementById('droppaid').value = '';
      document.getElementById('droppid').value = '';
      document.getElementById('dropmid').value = '';
      document.getElementById('rid').focus();
    },
    
    showNotification: function(message, type) {
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        font-size: 14px;
        max-width: 400px;
      `;
      
      if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #27ae60 0%, #229954 100%)';
        notification.style.color = 'white';
      } else {
        notification.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
        notification.style.color = 'white';
      }
      
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease forwards';
        setTimeout(() => notification.remove(), 400);
      }, 3000);
    },
    
    addAnimations: function() {
      if (!document.getElementById('receipt-controller-animations')) {
        const style = document.createElement('style');
        style.id = 'receipt-controller-animations';
        style.textContent = `
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(400px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideOutRight {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(400px); }
          }
        `;
        document.head.appendChild(style);
      }
    }
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    ReceiptController.init();
  });
  
  window.ReceiptController = ReceiptController;
})();
