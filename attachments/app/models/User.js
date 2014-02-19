$(function() {

  App.Models.User = Backbone.Model.extend({

    sync: function() { this.trigger('sync') },
    
    schema: {
      'userName': 'Text',
      'password': 'Text'
    }    


  }) 

})