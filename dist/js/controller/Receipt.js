/* Receipt Controller */
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
        patientDropdown.innerHTML = '';
        this.patientList.forEach(p => {
          const option = document.createElement('option');
          option.value = p.id;
          option.textContent = `${p.id} - ${p.name}`;
          patientDropdown.appendChild(option);
        });
      }
      
      if (prescriptionDropdown) {
        prescriptionDropdown.innerHTML = '';
        this.prescriptionList.forEach(p => {
          const option = document.createElement('option');
          option.value = p.presid;
          option.textContent = `${p.presid}`;
          prescriptionDropdown.appendChild(option);
        });
      }
      
      if (medicineDropdown) {
        medicineDropdown.innerHTML = '';
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
      const rid = document.getElementById('rid').value;
      const unitprice = document.getElementById('txtUnitprice').value;
      const qty = document.getElementById('rqty').value;
      const date = document.getElementById('txtdate').value;
      const patientid = document.getElementById('droppaid').value;
      const presid = document.getElementById('droppid').value;
      const mid = document.getElementById('dropmid').value;
      
      if (rid && unitprice && qty && date && patientid && presid && mid) {
        const total = unitprice * qty;
        this.receiptList.push({ rid, unitprice, qty, date, patientid, presid, mid, total });
        this.displayReceipts();
        this.clearForm();
        console.log('Receipt saved');
      } else {
        alert('Please fill all fields');
      }
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
        this.receiptList.forEach(receipt => {
          const row = `<tr>
            <td>${receipt.rid}</td>
            <td>${receipt.patientid}</td>
            <td>${receipt.presid}</td>
            <td>${receipt.mid}</td>
            <td>${receipt.unitprice}</td>
            <td>${receipt.qty}</td>
            <td>${receipt.date}</td>
            <td>${receipt.total}</td>
            <td><button class="btn btn-sm" onclick="deleteReceipt('${receipt.rid}')">Delete</button></td>
          </tr>`;
          tbody.insertAdjacentHTML('beforeend', row);
        });
      }
    },
    
    clearForm: function() {
      document.getElementById('rid').value = '';
      document.getElementById('txtUnitprice').value = '';
      document.getElementById('rqty').value = '';
      document.getElementById('txtdate').value = '';
    }
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    ReceiptController.init();
  });
  
  window.ReceiptController = ReceiptController;
  window.deleteReceipt = function(id) {
    ReceiptController.receiptList = ReceiptController.receiptList.filter(r => r.rid !== id);
    ReceiptController.displayReceipts();
  };
})();
