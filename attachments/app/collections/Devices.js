$(function() {

  App.Collections.Devices = Backbone.Collection.extend({

    model: App.Models.Device,

    db : document.URL.split("/")[3],

    url: function() {
      return '/' + this.db + "/_all_docs?include_docs=true"
    },

    parse: function(response) {
      var docs = _.map(response.rows, function(row) {
        if (row.hasOwnProperty('doc') && row.doc.hasOwnProperty('kind') && row.doc.kind == "Device") return row.doc
      })
      return docs
    },
     
    comparator: function(model) {
      var label = model.get('label')
      if (label) return label.toLowerCase()
    }

  })

})
