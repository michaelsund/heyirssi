(function () {
 
      var remote = require('remote'); 
      var BrowserWindow = remote.require('browser-window'); 
 
     function init() { 
//           document.getElementById("min-btn").addEventListener("click", function (e) {
//                var window = BrowserWindow.getFocusedWindow();
//                window.minimize(); 
//           });
// 
//           document.getElementById("max-btn").addEventListener("click", function (e) {
//                var window = BrowserWindow.getFocusedWindow(); 
//                window.maximize(); 
//           });
          // dont quit att on cross click if osx
          if (process.platform !== 'darwin') {
            document.getElementById("close-btn").addEventListener("click", function (e) {
              var window = BrowserWindow.getFocusedWindow();
              window.close();
            });
          }
          else {
            document.getElementById("close-btn").addEventListener("click", function (e) {
              var window = BrowserWindow.getFocusedWindow();
              window.minimize();
            }); 
          } 
     }; 

     document.onreadystatechange = function () {
          if (document.readyState == "complete") {
               init(); 
          }
     };
 
})();