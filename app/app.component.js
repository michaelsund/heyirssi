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
    var electron, remote, ipc, AppComponent, OPTIONS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            electron = require('electron');
            remote = electron.remote;
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
                        this.options.ips.push('test');
                    }
                    else {
                        this.options.notificationsEnabled = true;
                        this.options.notificationText = 'Enabled';
                        ipc.send('options', this.options);
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-options',
                        template: "\n    <p>Notifications is: {{options.notificationText}}</p>\n    <div class=\"onoffswitch\">\n      <input type=\"checkbox\" (click)=\"updateToApi()\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"myonoffswitch\" checked>\n      <label class=\"onoffswitch-label\" for=\"myonoffswitch\"></label>\n    </div>\n    <div *ngFor=\"#ip of options.ips\">\n      <p>{{ip}}</p>\n    </div>\n\n  "
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