System.register(['angular2/core', './options-model', './message-service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, options_model_1, message_service_1;
    var electron, ipc, AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (options_model_1_1) {
                options_model_1 = options_model_1_1;
            },
            function (message_service_1_1) {
                message_service_1 = message_service_1_1;
            }],
        execute: function() {
            electron = require('electron');
            ipc = require('electron').ipcRenderer;
            // dev/prod
            core_1.enableProdMode();
            AppComponent = (function () {
                function AppComponent(messageService, zone) {
                    var _this = this;
                    this.messageService = messageService;
                    this.zone = zone;
                    this.options = new options_model_1.Options();
                    ipc.send('getips', 'blabla');
                    ipc.on('getips', function (event, arg) {
                        zone.run(function () {
                            _this.options.ips = arg;
                        });
                    });
                    ipc.on('messages', function (event, arg) {
                        console.log("new message");
                        zone.run(function () {
                            _this.newMessage(arg);
                        });
                        if (_this.options.pudgeSounds) {
                            _this.playsound();
                        }
                    });
                }
                AppComponent.prototype.newMessage = function (msg) {
                    console.log('got new message ' + JSON.stringify(msg));
                    this.messageService.addMessage(msg);
                    console.log(JSON.stringify(this.messageService));
                };
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
                AppComponent.prototype.sounds = function () {
                    if (this.options.pudgeSounds) {
                        this.options.pudgeSoundsText = "Disabled";
                    }
                    else {
                        this.options.pudgeSoundsText = "Enabled";
                    }
                    this.options.pudgeSounds = !this.options.pudgeSounds;
                };
                AppComponent.prototype.playsound = function () {
                    var random = Math.floor(Math.random() * (18 - 1 + 1)) + 1;
                    var audio = new Audio(__dirname + '/sounds/' + random + '.wav');
                    audio.volume = 0.1;
                    audio.currentTime = 0;
                    audio.play();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-options',
                        templateUrl: './app/html/app.component.html',
                    }), 
                    __metadata('design:paramtypes', [message_service_1.MessageService, core_1.NgZone])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map