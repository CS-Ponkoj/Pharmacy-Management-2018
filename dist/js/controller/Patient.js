/* Patient Controller */
(function() {
  console.log('Patient Controller Loaded');
  
  const PatientController = {
    patientList: [],
    
    init: function() {
      this.attachEventListeners();
      this.loadPatients();
    },
    
    attachEventListeners: function() {
      const saveBtn = document.getElementById('savebtn');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => this.savePatient());
      }
    },
    
    savePatient: function() {
      const id = document.getElementById('txtpid').value;
      const name = document.getElementById('txtpname').value;
      const address = document.getElementById('txtpaddress').value;
      
      if (id && name && address) {
        this.patientList.push({ id, name, address });
        this.displayPatients();
        this.clearForm();
        console.log('Patient saved:', { id, name, address });
      } else {
        alert('Please fill all fields');
      }
    },
    
    loadPatients: function() {
      // Load from localStorage or database
      const stored = localStorage.getItem('patients');
      this.patientList = stored ? JSON.parse(stored) : [];
      this.displayPatients();
    },
    
    displayPatients: function() {
      const tbody = document.querySelector('#tblPatient tbody');
      if (tbody) {
        tbody.innerHTML = '';
        this.patientList.forEach(patient => {
          const row = `<tr>
            <td>${patient.id}</td>
            <td>${patient.address}</td>
            <td>${patient.name}</td>
            <td><button class="btn btn-sm" onclick="deletePatient('${patient.id}')">Delete</button></td>
          </tr>`;
          tbody.insertAdjacentHTML('beforeend', row);
        });
      }
    },
    
    clearForm: function() {
      document.getElementById('txtpid').value = '';
      document.getElementById('txtpname').value = '';
      document.getElementById('txtpaddress').value = '';
    }
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    PatientController.init();
  });
  
  window.PatientController = PatientController;
  window.deletePatient = function(id) {
    PatientController.patientList = PatientController.patientList.filter(p => p.id !== id);
    PatientController.displayPatients();
  };
})();
