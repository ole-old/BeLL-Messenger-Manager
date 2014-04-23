#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sys = require('sys')
var exec = require('child_process').exec;
var program = require('commander');
var fs = require('fs')
function puts(error, stdout, stderr) { sys.puts(stdout) } 
var cmd = ''

// Increase the ulimit so the entire directory of attachments can be uploaded
cmd += 'launchctl limit maxfiles 10056 10056; \n'
cmd += 'ulimit -n 10056; \n'

program
  .version('0.0.1')
  .option('-u, --url [url]', '', 'http://pi:raspberry@127.0.0.1:5984')
  .parse(process.argv);

cmd += 'curl -XPUT ' + program.url + '; \n'

var databases = require('./databases')

databases.forEach(function(database) {
  cmd += 'curl -XPOST -H "Content-Type: application/json" ' + program.url + ' -d \'{"kind":"Database", "name":"' + database + '"}\'; \n' 
})

cmd += 'couchapp push app.js ' + program.url + '; \n'

console.log(cmd)
exec(cmd, puts)

