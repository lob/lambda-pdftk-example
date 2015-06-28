'use strict';

var exec = require('child_process').exec;
var path = require('path');

PDFTK_PATH = path.resolve(__dirname, 'bin/pdftk');
LIBRARY_PATH = path.resolve(__dirname, 'bin');

exports.handler = function (event, context) {
  var command = 'LD_LIBRARY_PATH=' + LIBRARY_PATH + ' ' + PDFTK_PATH + ' --version';
  exec(command, context.done);
};
