/* Prescription Controller */
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
        patientDropdown.innerHTML = '';
        this.patientList.forEach(p => {
          const option = document.createElement('option');
          option.value = p.id;
          option.textContent = `${p.id} - ${p.name}`;
          patientDropdown.appendChild(option);
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
      const saveBtn = document.getElementById('savepres');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => this.savePrescription());
      }
    },
    
    savePrescription: function() {
      const presid = document.getElementById('txtpresid').value;
      const patientid = document.getElementById('droppatientid').value;
      const docname = document.getElementById('txtdocname').value;
      const mid = document.getElementById('dropmid').value;
      const presdate = document.getElementById('presdate').value;
      
      if (presid && patientid && docname && mid && presdate) {
        this.prescriptionList.push({ presid, patientid, docname, mid, presdate });
        this.displayPrescriptions();
        this.clearForm();
        console.log('Prescription saved:', { presid, patientid, docname, mid, presdate });
      } else {
        alert('Please fill all fields');
      }
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
        this.prescriptionList.forEach(prescription => {
          const row = `<tr>
            <td>${prescription.presid}</td>
            <td>${prescription.patientid}</td>
            <td>${prescription.presdate}</td>
            <td><button class="btn btn-sm" onclick="deletePrescription('${prescription.presid}')">Delete</button></td>
          </tr>`;
          tbody.insertAdjacentHTML('beforeend', row);
        });
      }
    },
    
    clearForm: function() {
      document.getElementById('txtpresid').value = '';
      document.getElementById('txtdocname').value = '';
      document.getElementById('presdate').value = '';
    }
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    PrescriptionController.init();
  });
  
  window.PrescriptionController = PrescriptionController;
  window.deletePrescription = function(id) {
    PrescriptionController.prescriptionList = PrescriptionController.prescriptionList.filter(p => p.presid !== id);
    PrescriptionController.displayPrescriptions();
  };
})();
