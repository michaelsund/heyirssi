System.register([], function(exports_1) {
    var Message;
    return {
        setters:[],
        execute: function() {
            Message = (function () {
                function Message(time, channel, nick, msg) {
                    this.time = time;
                    this.channel = channel;
                    this.nick = nick;
                    this.msg = msg;
                }
                return Message;
            })();
            exports_1("Message", Message);
        }
    }
});
//# sourceMappingURL=message-model.js.map