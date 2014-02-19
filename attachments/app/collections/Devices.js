$(function() {

  App.Collections.Devices = Backbone.Collection.extend({

    model: App.Models.Device,

    db : document.URL.split("/")[3],

    url: function() {
      return '/' + this.db + "/_all_docs?include_docs=true"
    },

    kind: 'Device',

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
      var label = model.get('label')
      if (label) return label.toLowerCase()
    }

  })

})
