/* Medicine Controller - Enhanced */
(function() {
  console.log('Medicine Controller Loaded');
  
  const MedicineController = {
    medicineList: [],
    
    init: function() {
      this.attachEventListeners();
      this.loadMedicines();
      this.setupFormValidation();
      this.addAnimations();
    },
    
    setupFormValidation: function() {
      const form = document.getElementById('Mediform');
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
    
    attachEventListeners: function() {
      const saveBtn = document.getElementById('btnsaveMedi');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => this.saveMedicine());
      }
    },
    
    saveMedicine: function() {
      const mid = document.getElementById('mid').value.trim();
      const des = document.getElementById('mdes').value.trim();
      const qty = document.getElementById('mqty').value.trim();
      const approve = document.getElementById('txtapprove').value;
      
      if (!mid || !des || !qty) {
        this.showNotification('Please fill all fields', 'error');
        return;
      }
      
      if (this.medicineList.some(m => m.mid === mid)) {
        this.showNotification('Medicine ID already exists', 'error');
        return;
      }
      
      this.medicineList.push({ mid, des, qty, approve });
      localStorage.setItem('medicines', JSON.stringify(this.medicineList));
      this.displayMedicines();
      this.clearForm();
      this.showNotification('✓ Medicine saved successfully!', 'success');
    },
    
    loadMedicines: function() {
      const stored = localStorage.getItem('medicines');
      this.medicineList = stored ? JSON.parse(stored) : [];
      this.displayMedicines();
    },
    
    displayMedicines: function() {
      const tbody = document.querySelector('#tblMedicine tbody');
      if (tbody) {
        tbody.innerHTML = '';
        if (this.medicineList.length === 0) {
          tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 30px; color: #95a5a6;"><i>No medicines added yet</i></td></tr>';
        } else {
          this.medicineList.forEach((medicine) => {
            const statusBadge = medicine.approve === '1' 
              ? '<span style="background: #27ae60; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px;">✓ Approved</span>'
              : '<span style="background: #e74c3c; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px;">✗ Pending</span>';
            
            const row = `<tr style="animation: slideIn 0.3s ease;">
              <td><strong>#${medicine.mid}</strong></td>
              <td>${medicine.des}</td>
              <td>${medicine.qty} units</td>
              <td>${statusBadge}</td>
              <td><button class="btn btn-sm" style="background: #e74c3c; color: white; border: none; cursor: pointer;" onclick="MedicineController.deleteMedicine('${medicine.mid}')">🗑 Delete</button></td>
            </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
          });
        }
      }
    },
    
    deleteMedicine: function(id) {
      if (confirm('Are you sure you want to delete this medicine?')) {
        this.medicineList = this.medicineList.filter(m => m.mid !== id);
        localStorage.setItem('medicines', JSON.stringify(this.medicineList));
        this.displayMedicines();
        this.showNotification('✓ Medicine deleted successfully', 'success');
      }
    },
    
    clearForm: function() {
      document.getElementById('mid').value = '';
      document.getElementById('mdes').value = '';
      document.getElementById('mqty').value = '';
      document.getElementById('txtapprove').value = '1';
      document.getElementById('mid').focus();
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
      if (!document.getElementById('medicine-controller-animations')) {
        const style = document.createElement('style');
        style.id = 'medicine-controller-animations';
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
    MedicineController.init();
  });
  
  window.MedicineController = MedicineController;
})();
