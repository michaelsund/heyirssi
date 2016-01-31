import {Component} from 'angular2/core';
const electron = require('electron');
const ipc = require('electron').ipcRenderer;

interface IOptions {
    notificationsEnabled: boolean;
    notificationText: string;
    ips: string[];
}


@Component({
    selector: 'my-options',
    template: `
    <div>
      <div class="block notification">
        <p>Notifications {{options.notificationText}}</p>
      </div>
      <div class="block space-left">
        <div class="onoffswitch">
          <input type="checkbox" (click)="updateToApi()" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>
          <label class="onoffswitch-label" for="myonoffswitch"></label>
        </div>
      </div>
    </div>
    <div class="space-left">
      <p>Ip: {{options.ips}}</p>
    </div>
  `
})

export class AppComponent {
    public options = OPTIONS;
    public selectedOption: IOptions;
    onSelect(options: IOptions) { this.selectedOption = options;}
    updateToApi() {
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
    playsound() {
      // For future use when we can recieve messages in here properly
      var random = Math.floor(Math.random() * (18 - 1 + 1)) + 1;
      var audio = new Audio(__dirname + '/sounds/' + random +'.wav');
      audio.volume = 0.1;
      audio.currentTime = 0;
      audio.play();
    }
}

var OPTIONS: IOptions = { "notificationsEnabled": true, "notificationText": "Enabled", "ips": [] };
ipc.send('getips', 'blabla');
ipc.on('getips', function(event, arg) {
    OPTIONS.ips = arg;
    console.log('ips: ' + OPTIONS.ips);
});
