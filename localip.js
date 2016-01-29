'use strict';

var os = require('os');
var ifaces = os.networkInterfaces();
var ips = [];
var getip = function() {

  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // ignore localhost
        return;
      }
      ips.push(iface.address);
    });
  });
  return ips;
};
module.exports.getip = getip;
