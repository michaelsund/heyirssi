'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const appver = "heyirssi 1.0.0";
var options =
{
  notificationsEnabled: true
};
var ipc = require("electron").ipcMain
var notifier = require('node-notifier');
var path = require('path');
var localip = require('./localip').getip();


//webserver stuff
var express = require('express');
var expressapp = express();
var bodyParser = require('body-parser');
var port = 4852;
expressapp.use(bodyParser.json());
expressapp.use(bodyParser.urlencoded({ extended: true }));

expressapp.post('/', function(req, res) {
  if (options.notificationsEnabled) {
    popup(req.body.msg, req.body.nick, req.body.channel);
  }
  res.send("ok");
});

expressapp.listen(4852);
console.log('listening on port: ' + port);
console.log(localip);
//webserver stuff end

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 500,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
    frame: false
  });
  mainWindow.setResizable(true);
  mainWindow.setMenuBarVisibility(true);
  mainWindow.setSkipTaskbar(true);
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.on('close', function(e) {
    e.preventDefault();
    mainWindow.hide();
  });


  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

ipc.on('options', function(event, arg) {
  console.log(arg);
  options = arg;
});

ipc.on('getips', function(event, arg) {
  console.log(arg);
  event.sender.send('getips', localip);
});



app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
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

// var toggleNotifications = function() {
//   notify = !notify;
//   console.log('notify: ' + notify);
// };


const Menu = electron.Menu;
const Tray = electron.Tray;
var icon = path.join(__dirname, 'pics', 'green.png');
var appIcon = null;
app.on('ready', function(){
appIcon = new Tray(icon);
var contextMenu = Menu.buildFromTemplate([
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
    }
  }
]);
appIcon.setToolTip(appver);
appIcon.setContextMenu(contextMenu);
});
