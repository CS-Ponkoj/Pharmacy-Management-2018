/* Medicine Controller */
(function() {
  console.log('Medicine Controller Loaded');
  
  const MedicineController = {
    medicineList: [],
    
    init: function() {
      this.attachEventListeners();
      this.loadMedicines();
    },
    
    attachEventListeners: function() {
      const saveBtn = document.getElementById('btnsaveMedi');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => this.saveMedicine());
      }
    },
    
    saveMedicine: function() {
      const mid = document.getElementById('mid').value;
      const des = document.getElementById('mdes').value;
      const qty = document.getElementById('mqty').value;
      const approve = document.getElementById('txtapprove').value;
      
      if (mid && des && qty) {
        this.medicineList.push({ mid, des, qty, approve });
        this.displayMedicines();
        this.clearForm();
        console.log('Medicine saved:', { mid, des, qty, approve });
      } else {
        alert('Please fill all fields');
      }
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
        this.medicineList.forEach(medicine => {
          const row = `<tr>
            <td>${medicine.mid}</td>
            <td>${medicine.des}</td>
            <td>${medicine.qty}</td>
            <td>${medicine.approve === '1' ? 'Yes' : 'No'}</td>
            <td><button class="btn btn-sm" onclick="deleteMedicine('${medicine.mid}')">Delete</button></td>
          </tr>`;
          tbody.insertAdjacentHTML('beforeend', row);
        });
      }
    },
    
    clearForm: function() {
      document.getElementById('mid').value = '';
      document.getElementById('mdes').value = '';
      document.getElementById('mqty').value = '';
      document.getElementById('txtapprove').value = '1';
    }
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    MedicineController.init();
  });
  
  window.MedicineController = MedicineController;
  window.deleteMedicine = function(id) {
    MedicineController.medicineList = MedicineController.medicineList.filter(m => m.mid !== id);
    MedicineController.displayMedicines();
  };
})();
