System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var electron, ipc, AppComponent, OPTIONS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            electron = require('electron');
            ipc = require('electron').ipcRenderer;
            AppComponent = (function () {
                function AppComponent() {
                    this.options = OPTIONS;
                }
                AppComponent.prototype.onSelect = function (options) { this.selectedOption = options; };
                AppComponent.prototype.updateToApi = function () {
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
                };
                AppComponent.prototype.playsound = function () {
                    // For future use when we can recieve messages in here properly
                    var random = Math.floor(Math.random() * (18 - 1 + 1)) + 1;
                    var audio = new Audio(__dirname + '/sounds/' + random + '.wav');
                    audio.volume = 0.1;
                    audio.currentTime = 0;
                    audio.play();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-options',
                        template: "\n    <div>\n      <div class=\"block notification\">\n        <p>Notifications {{options.notificationText}}</p>\n      </div>\n      <div class=\"block space-left\">\n        <div class=\"onoffswitch\">\n          <input type=\"checkbox\" (click)=\"updateToApi()\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"myonoffswitch\" checked>\n          <label class=\"onoffswitch-label\" for=\"myonoffswitch\"></label>\n        </div>\n      </div>\n    </div>\n    <div class=\"space-left\">\n      <p>Ip: {{options.ips}}</p>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
            OPTIONS = { "notificationsEnabled": true, "notificationText": "Enabled", "ips": [] };
            ipc.send('getips', 'blabla');
            ipc.on('getips', function (event, arg) {
                OPTIONS.ips = arg;
                console.log('ips: ' + OPTIONS.ips);
            });
        }
    }
});
//# sourceMappingURL=app.component.js.map