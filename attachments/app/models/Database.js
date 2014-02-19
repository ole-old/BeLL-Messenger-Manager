$(function() {

  App.Models.Database = Backbone.Model.extend({

    schema: {
      'name': 'Text',
      'kind': 'Hidden'
    },

    idAttribute: '_id',

    initialize: function() {

      // events
      this.listenTo(this, 'destroy', this.dropDatabase)
      this.listenTo(this, 'create', this.createDatabase)

      // default values
      if (!this.get('kind')) this.set('kind', 'Database')

      // operation
      this.fetchDbInfo()

    },

    url: function() {
      if (_.has(this, 'id')) {
        var url = (_.has(this.toJSON(), '_rev'))
          ? this.server + '/' + this.db + '/' + this.id + '?rev=' + this.get('_rev') // For UPDATE and DELETE
          : this.server + '/' + this.db + '/' + this.id // For READ
      }
      else {
        var url = this.server + '/' + this.db // for CREATE
      }
      return url
    },
    
    // Set your server. For example, http://127.0.0.1:5984
    server: '',

    // Set your database.  In web browsers, to use the current database in browser's URL, use document.URL.split("/")[3]
    db : document.URL.split("/")[3],

    replicationSync: function(serverOne, serverTwo) {
      var database = this
      database.monitorDbInfoChanges('start')
      database.set('status', serverOne + ' --> ' + serverTwo)
      $.couch.replicate(serverOne + '/' + database.get('name'), serverTwo + '/' + database.get('name'), {success: function() {
        database.set('status', serverOne + ' <-- ' + serverTwo)
        $.couch.replicate(serverTwo + '/' + database.get('name'), serverOne + '/' + database.get('name'), {success: function() {
          database.set('status', 'done')
          database.trigger('replicationSync:done')
          database.monitorDbInfoChanges('stop')
        }}, {create_target:true})
      }}, {create_target:true})
    },

    createDatabase: function(callback) {
      if(typeof(callback) != 'function') callback = function() {}
      $.couch.db(this.get('name')).create({
        success: function(data) {
          callback(null, data)
        },
        error: function(status) {
          callback(status, null)
        }
      });
    },


    dropDatabase: function(callback) {
      if(typeof(callback) != 'function') callback = function() {}
      $.couch.db(this.get('name')).drop({
        success: function(data) {
          callback(null, data)
        },
        error: function(status) {
          callback(status, null)
        }
      });
    },


    fetchDbInfo: function() {
      var model = this
      $.couch.db(model.get('name')).info({
        success: function(data) {
          model.set('doc_count', data.doc_count)
          model.set('disk_size', data.disk_size)
        },
        error: function(err) {
          model.set('doc_count', '...')
          model.set('disk_size', '...')
          if(err == '404') {
            model.createDatabase(function(err, body) {
              if(!err) {
                // Now we can successfully fetch the info
                model.fetchDbInfo()
              }
              else {
                alert('We found a missing database and could not create it. Redirecting to log you in to see if that helps. Your CouchDB may down if this does not work.')
                Backbone.history.navigate('', {trigger: true}) 
              }
            })
          }
          else {
            // Some other error
            model.set('status', err)
          }

        }
      })
    },


    monitorDbInfoChanges: function(op) {
      var model = this
      if(op == 'start') {
        this.infoMonitor = setInterval(function(){
          model.fetchDbInfo()
        },5000)
      }
      else if(op == 'stop') {
        clearInterval(this.infoMonitor)
      }
    }


  }) 

})