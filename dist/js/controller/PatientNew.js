/* Patient Controller - Enhanced with Notifications */
(function() {
  console.log('Patient Controller Loaded');
  
  const PatientController = {
    patientList: [],
    
    init: function() {
      this.attachEventListeners();
      this.loadPatients();
      this.setupFormValidation();
      this.addAnimations();
    },
    
    setupFormValidation: function() {
      const form = document.getElementById('Patientform');
      if (form) {
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
          input.addEventListener('focus', function() {
            this.style.borderColor = '#3498db';
            this.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
          });
          input.addEventListener('blur', function() {
            this.style.borderColor = '#bdc3c7';
            this.style.boxShadow = 'none';
          });
        });
      }
    },
    
    attachEventListeners: function() {
      const saveBtn = document.getElementById('savebtn');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => this.savePatient());
      }
    },
    
    savePatient: function() {
      const id = document.getElementById('txtpid').value.trim();
      const name = document.getElementById('txtpname').value.trim();
      const address = document.getElementById('txtpaddress').value.trim();
      
      if (!id || !name || !address) {
        this.showNotification('Please fill all fields', 'error');
        return;
      }
      
      if (this.patientList.some(p => p.id === id)) {
        this.showNotification('Patient ID already exists', 'error');
        return;
      }
      
      this.patientList.push({ id, name, address });
      localStorage.setItem('patients', JSON.stringify(this.patientList));
      this.displayPatients();
      this.clearForm();
      this.showNotification('✓ Patient saved successfully!', 'success');
    },
    
    loadPatients: function() {
      const stored = localStorage.getItem('patients');
      this.patientList = stored ? JSON.parse(stored) : [];
      this.displayPatients();
    },
    
    displayPatients: function() {
      const tbody = document.querySelector('#tblPatient tbody');
      if (tbody) {
        tbody.innerHTML = '';
        if (this.patientList.length === 0) {
          tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 30px; color: #95a5a6;"><i>No patients added yet</i></td></tr>';
        } else {
          this.patientList.forEach((patient, index) => {
            const row = `<tr style="animation: slideIn 0.3s ease;">
              <td><strong>#${patient.id}</strong></td>
              <td>${patient.address}</td>
              <td>${patient.name}</td>
              <td><button class="btn btn-sm" style="background: #e74c3c; color: white; border: none; cursor: pointer;" onclick="PatientController.deletePatient('${patient.id}')">🗑 Delete</button></td>
            </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
          });
        }
      }
    },
    
    deletePatient: function(id) {
      if (confirm('Are you sure you want to delete this patient?')) {
        this.patientList = this.patientList.filter(p => p.id !== id);
        localStorage.setItem('patients', JSON.stringify(this.patientList));
        this.displayPatients();
        this.showNotification('✓ Patient deleted successfully', 'success');
      }
    },
    
    clearForm: function() {
      document.getElementById('txtpid').value = '';
      document.getElementById('txtpname').value = '';
      document.getElementById('txtpaddress').value = '';
      document.getElementById('txtpid').focus();
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
      if (!document.getElementById('patient-controller-animations')) {
        const style = document.createElement('style');
        style.id = 'patient-controller-animations';
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
    PatientController.init();
  });
  
  window.PatientController = PatientController;
})();
