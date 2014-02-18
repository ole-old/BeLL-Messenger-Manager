$(function() {

  App.Models.Database = Backbone.Model.extend({

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
    server: null,

    // Set your database.  In web browsers, to use the current database in browser's URL, use document.URL.split("/")[3]
    db : document.URL.split("/")[3],

  }) 

})
