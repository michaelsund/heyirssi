'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//standalone nofifier
var notifier = require('node-notifier');

var path = require('path');

//webserver stuff
var express = require('express');
var expressapp = express();
var bodyParser = require('body-parser');
var port = 4852;
var notificationsEnabled = true;
expressapp.use(bodyParser.json());
expressapp.use(bodyParser.urlencoded({ extended: true }));

expressapp.post('/', function(req, res) {
  if (notificationsEnabled) {
    popup(req.body.msg, req.body.nick, req.body.channel);
  }
  res.send("ok");
});

expressapp.listen(4852);
console.log('listening on port: ' + port);

//webserver stuff end

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
    frame: false
  });
  mainWindow.setResizable(true);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setSkipTaskbar(true);
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  
  // osx special, also in js/toolbar
  if (process.platform !== 'darwin') {
    mainWindow.on('close', function(e) {
      e.preventDefault();
      mainWindow.hide();
    }); 
  }
  
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    app.quit();
  // 
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

var popup = function(msg, nick, channel) {
  var message = nick + ' said ' + msg;
  notifier.notify({
    'title': channel,
    'message': message
  });
};

var toggleNotifications = function() {
  notificationsEnabled = !notificationsEnabled;
};


if (process.platform !== 'darwin') {
  const Menu = electron.Menu;
  const Tray = electron.Tray;
  var icon = path.join(__dirname, 'pics', 'green.png');
  var appIcon = null;
  app.on('ready', function(){
    appIcon = new Tray(icon);
    var contextMenu = Menu.buildFromTemplate([
      {
        label: 'Notify me',
        type: 'checkbox',
        checked: true,
        click: function() {
          toggleNotifications();
        }
      },
      {
        label: 'Open',
        click: function() {
          mainWindow.show();
        }
      },
      {
        label: 'Quit',
        click: function() {
          app.quit();
          mainWindow = null;
        }
      }
    ]);
    appIcon.setToolTip('Hiya there matey!');
    appIcon.setContextMenu(contextMenu);
  });
}
