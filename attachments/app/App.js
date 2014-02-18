$(function() {

  App = new (Backbone.View.extend({

    Models: {},
    Views: {},
    Collections: {},

    el: "body",

    template: $("#template-app").html(),

    start: function(){
      this.$el.html(_.template(this.template))
      Backbone.history.start({pushState: false})
    },
    
   
    clear: function() {
      App.$el.children('.body').html('')
    },
    
    append: function(content) {
      App.$el.children('.body').append(content)
    },
    
    setTitle: function(title) {
      $('.nav .title').text(title)
    }


  }))

})
