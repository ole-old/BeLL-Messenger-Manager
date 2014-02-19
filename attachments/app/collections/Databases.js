$(function() {

  App.Collections.Databases = Backbone.Collection.extend({

    model: App.Models.Database,

    db : document.URL.split("/")[3],

    url: function() {
      return '/' + this.db + "/_all_docs?include_docs=true"
    },

    kind: "Database",

    parse: function(response) {
      var collection = this
      var docs = [] 
      _.each(response.rows, function(row) {
        if (row.hasOwnProperty('doc') && row.doc.hasOwnProperty('kind') && row.doc.kind == collection.kind) {
          docs.push(row.doc)
        }
      })
      return docs
    },
     
    comparator: function(model) {
      var label = model.get('name')
      if (label) return label.toLowerCase()
    },

    // Runs replicationSync() on a database, waits for done, moves on to the next one
    syncWith: function(device) {
      var collection = this
      var i = 0
      var serverOne = 'http://' + App.user.get('userName') + ':' + App.user.get('password') + '@' + window.location.origin.substr(7)
      var serverTwo = device.get('url')
      function replicate() {
        if(i == collection.models.length) {
          collection.trigger('syncWith:done')
        }
        else {
          collection.models[i].on('replicationSync:done', function() {
            i++
            replicate()
          })
          collection.models[i].replicationSync(serverOne, serverTwo)
        }
      }
      replicate()
    }

  })

})
