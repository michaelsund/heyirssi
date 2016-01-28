import {Component} from 'angular2/core';
const electron = require('electron');
const remote = electron.remote;
const ipc = require('electron').ipcRenderer;

@Component({
  selector: 'options',
  template: `
    <p>Notifications is: {{options.notificationText}}</p>
    <div class="onoffswitch">  
      <input type="checkbox" (click)="testfunc()" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>
      <label class="onoffswitch-label" for="myonoffswitch"></label>
    </div>

  `
})

export class AppComponent {
  public options: Options = {
    notificationsEnabled: true,
    notificationText: 'Enabled'
  }
  public testfunc = function() {
    if (this.options.notificationsEnabled) {
      this.options.notificationsEnabled = false;
      this.options.notificationText = 'Disabled';
      ipc.send('options', this.options);
    }
    else {
      this.options.notificationsEnabled = true;
      this.options.notificationText = 'Enabled';
      ipc.send('options', this.options);
    }
  }
}

interface Options {
  notificationsEnabled: boolean;
  notificationText: string;
}
