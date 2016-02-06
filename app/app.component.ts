import {Component, enableProdMode, NgZone} from 'angular2/core'
import {Options} from './options-model';
import {MessageService} from './message-service';
import {Message} from './message-model';
const electron = require('electron');
const ipc = require('electron').ipcRenderer;
// dev/prod
enableProdMode();
@Component({
    selector: 'my-options',
    templateUrl: './app/html/app.component.html',
})

export class AppComponent {
    options = new Options();  
    constructor(public messageService: MessageService, private zone: NgZone) {
        ipc.send('getips', 'blabla');
        ipc.on('getips', (event, arg) => {
            zone.run(() => {
               this.options.ips = arg; 
            });
        });

        ipc.on('messages', (event, arg) => {
            console.log("new message");
            zone.run(() => {
                this.newMessage(arg);    
            });
            
            if (this.options.pudgeSounds) {
                this.playsound();
            }
        });
    }
    
    public newMessage(msg: Message) {
        console.log('got new message ' + JSON.stringify(msg));
        this.messageService.addMessage(msg);
        console.log(JSON.stringify(this.messageService));
    }
    
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
    sounds() {
        if (this.options.pudgeSounds) {
            this.options.pudgeSoundsText = "Disabled";
        }
        else {
            this.options.pudgeSoundsText = "Enabled";
        }
        this.options.pudgeSounds = !this.options.pudgeSounds;
    }
    public playsound() {
        var random = Math.floor(Math.random() * (18 - 1 + 1)) + 1;
        var audio = new Audio(__dirname + '/sounds/' + random + '.wav');
        audio.volume = 0.1;
        audio.currentTime = 0;
        audio.play();
    }
}
