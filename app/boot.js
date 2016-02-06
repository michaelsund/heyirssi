System.register(['angular2/platform/browser', './app.component', './message-service'], function(exports_1) {
    var browser_1, app_component_1, message_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (message_service_1_1) {
                message_service_1 = message_service_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [message_service_1.MessageService]);
        }
    }
});
//# sourceMappingURL=boot.js.map