$(function() {

  App.Models.User = Backbone.Model.extend({

  	schema: {
      'userName': 'Text',
      'password': 'Text'
    },

    sync: function() { this.trigger('sync') }

  }) 

})