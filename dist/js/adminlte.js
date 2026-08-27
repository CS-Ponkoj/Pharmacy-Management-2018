/* AdminLTE App */
(function() {
  const AdminLTE = {
    init: function() {
      this.setupSidebar();
      this.setupNavigation();
    },
    
    setupSidebar: function() {
      const toggleBtn = document.querySelector('[data-widget="pushmenu"]');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
          document.body.classList.toggle('sidebar-collapse');
        });
      }
    },
    
    setupNavigation: function() {
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          navLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    AdminLTE.init();
  });
  
  window.AdminLTE = AdminLTE;
})();
