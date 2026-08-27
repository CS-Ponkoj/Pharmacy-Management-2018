/* jQuery Placeholder - Minimal jQuery functionality */
(function() {
  window.jQuery = window.$ = function(selector) {
    if (typeof selector === 'string') {
      return document.querySelectorAll(selector);
    }
    return selector;
  };
  
  $.fn = {};
  $.fn.each = function(callback) {
    if (this.length !== undefined) {
      for (let i = 0; i < this.length; i++) {
        callback.call(this[i], i);
      }
    }
    return this;
  };
  
  $.each = function(obj, callback) {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        callback(i, obj[i]);
      }
    } else {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          callback(key, obj[key]);
        }
      }
    }
  };
  
  $.ajax = function(options) {
    const xhr = new XMLHttpRequest();
    xhr.open(options.type || 'GET', options.url, true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        if (options.success) {
          options.success(JSON.parse(xhr.responseText));
        }
      }
    };
    xhr.onerror = function() {
      if (options.error) {
        options.error(xhr);
      }
    };
    xhr.send(options.data || null);
  };
})();
