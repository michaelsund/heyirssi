System.register([], function(exports_1) {
    var Options;
    return {
        setters:[],
        execute: function() {
            Options = (function () {
                function Options(notificationsEnabled, notificationText, ips, pudgeSounds, pudgeSoundsText) {
                    if (notificationsEnabled === void 0) { notificationsEnabled = true; }
                    if (notificationText === void 0) { notificationText = "Enabled"; }
                    if (ips === void 0) { ips = []; }
                    if (pudgeSounds === void 0) { pudgeSounds = true; }
                    if (pudgeSoundsText === void 0) { pudgeSoundsText = "Enabled"; }
                    this.notificationsEnabled = notificationsEnabled;
                    this.notificationText = notificationText;
                    this.ips = ips;
                    this.pudgeSounds = pudgeSounds;
                    this.pudgeSoundsText = pudgeSoundsText;
                }
                return Options;
            })();
            exports_1("Options", Options);
        }
    }
});
//# sourceMappingURL=options-model.js.map