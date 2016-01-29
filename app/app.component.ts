import {Component} from 'angular2/core';
const electron = require('electron');
const remote = electron.remote;
const ipc = require('electron').ipcRenderer;

interface IOptions {
    notificationsEnabled: boolean;
    notificationText: string;
    ips: string[];
}

@Component({
    selector: 'my-options',
    template: `
    <p>Notifications is: {{options.notificationText}}</p>
    <div class="onoffswitch">
      <input type="checkbox" (click)="updateToApi()" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>
      <label class="onoffswitch-label" for="myonoffswitch"></label>
    </div>
    <div *ngFor="#ip of options.ips">
      <p>{{ip}}</p>
    </div>

  `
})

export class AppComponent {
    public options = OPTIONS;
    public selectedOption: IOptions;
    onSelect(options: IOptions) { this.selectedOption = options; }
    updateToApi() {
        if (this.options.notificationsEnabled) {
            this.options.notificationsEnabled = false;
            this.options.notificationText = 'Disabled';
            ipc.send('options', this.options);
            this.options.ips.push('test');
        }
        else {
            this.options.notificationsEnabled = true;
            this.options.notificationText = 'Enabled';
            ipc.send('options', this.options);
        }
    }
}

var OPTIONS: IOptions = { "notificationsEnabled": true, "notificationText": "Enabled", "ips": [] };
ipc.send('getips', 'blabla');
ipc.on('getips', function(event, arg) {
    OPTIONS.ips = arg;
    console.log('ips: ' + OPTIONS.ips);
});