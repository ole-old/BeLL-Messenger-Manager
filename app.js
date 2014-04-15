 var couchapp = require('couchapp')
  , path = require('path')
  ;

ddoc = {}

ddoc._id = '_design/bell-messenger-manager'

couchapp.loadAttachments(ddoc, path.join(__dirname, 'attachments'));

module.exports = ddoc;
