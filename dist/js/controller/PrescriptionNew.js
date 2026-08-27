/* Prescription Controller - Enhanced */
(function() {
  console.log('Prescription Controller Loaded');
  
  const PrescriptionController = {
    prescriptionList: [],
    patientList: [],
    medicineList: [],
    
    init: function() {
      this.loadDropdowns();
      this.attachEventListeners();
      this.loadPrescriptions();
      this.setupFormValidation();
      this.addAnimations();
    },
    
    setupFormValidation: function() {
      const form = document.getElementById('Prescriptionform');
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
      const stored = localStorage.getItem('patients');
      this.patientList = stored ? JSON.parse(stored) : [];
      
      const medStored = localStorage.getItem('medicines');
      this.medicineList = medStored ? JSON.parse(medStored) : [];
      
      this.populateDropdowns();
    },
    
    populateDropdowns: function() {
      const patientDropdown = document.getElementById('droppatientid');
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
      const saveBtn = document.getElementById('savepres');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => this.savePrescription());
      }
    },
    
    savePrescription: function() {
      const presid = document.getElementById('txtpresid').value.trim();
      const patientid = document.getElementById('droppatientid').value;
      const docname = document.getElementById('txtdocname').value.trim();
      const mid = document.getElementById('dropmid').value;
      const presdate = document.getElementById('presdate').value;
      
      if (!presid || !patientid || !docname || !mid || !presdate) {
        this.showNotification('Please fill all fields', 'error');
        return;
      }
      
      if (this.prescriptionList.some(p => p.presid === presid)) {
        this.showNotification('Prescription ID already exists', 'error');
        return;
      }
      
      this.prescriptionList.push({ presid, patientid, docname, mid, presdate });
      localStorage.setItem('prescriptions', JSON.stringify(this.prescriptionList));
      this.displayPrescriptions();
      this.clearForm();
      this.showNotification('✓ Prescription saved successfully!', 'success');
    },
    
    loadPrescriptions: function() {
      const stored = localStorage.getItem('prescriptions');
      this.prescriptionList = stored ? JSON.parse(stored) : [];
      this.displayPrescriptions();
    },
    
    displayPrescriptions: function() {
      const tbody = document.querySelector('#tblPrescription tbody');
      if (tbody) {
        tbody.innerHTML = '';
        if (this.prescriptionList.length === 0) {
          tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 30px; color: #95a5a6;"><i>No prescriptions added yet</i></td></tr>';
        } else {
          this.prescriptionList.forEach((prescription) => {
            const row = `<tr style="animation: slideIn 0.3s ease;">
              <td><strong>#${prescription.presid}</strong></td>
              <td>${prescription.patientid}</td>
              <td>${prescription.presdate}</td>
              <td><button class="btn btn-sm" style="background: #e74c3c; color: white; border: none; cursor: pointer;" onclick="PrescriptionController.deletePrescription('${prescription.presid}')">🗑 Delete</button></td>
            </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
          });
        }
      }
    },
    
    deletePrescription: function(id) {
      if (confirm('Are you sure you want to delete this prescription?')) {
        this.prescriptionList = this.prescriptionList.filter(p => p.presid !== id);
        localStorage.setItem('prescriptions', JSON.stringify(this.prescriptionList));
        this.displayPrescriptions();
        this.showNotification('✓ Prescription deleted successfully', 'success');
      }
    },
    
    clearForm: function() {
      document.getElementById('txtpresid').value = '';
      document.getElementById('txtdocname').value = '';
      document.getElementById('presdate').value = '';
      document.getElementById('droppatientid').value = '';
      document.getElementById('dropmid').value = '';
      document.getElementById('txtpresid').focus();
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
      if (!document.getElementById('prescription-controller-animations')) {
        const style = document.createElement('style');
        style.id = 'prescription-controller-animations';
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
    PrescriptionController.init();
  });
  
  window.PrescriptionController = PrescriptionController;
})();
