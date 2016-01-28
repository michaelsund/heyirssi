import {Component} from 'angular2/core';
const electron = require('electron');
const remote = electron.remote;
const ipc = require('electron').ipcRenderer;

@Component({
  selector: 'options',
  template: `
    <button (click)="testfunc()">Click me!</button>
    <br/>
    <br/>
    <div class="onoffswitch">
      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>
      <label class="onoffswitch-label" for="myonoffswitch"></label>
    </div>
  `
})

export class AppComponent {
  // public notificationsEnabled = true;
  public options: Options = {
    notificationsEnabled: true
  }
  public testfunc = function() {
    if (this.options.notificationsEnabled) {
      this.options.notificationsEnabled = false;
      ipc.send('options', this.options);
    }
    else {
      this.options.notificationsEnabled = true;
      ipc.send('options', this.options);
    }
  }
}

interface Options {
  notificationsEnabled: boolean;
}
