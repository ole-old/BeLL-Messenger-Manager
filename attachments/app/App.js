$(function() {

  App = new (Backbone.View.extend({

    Models: {},
    Views: {},
    Collections: {},

    el: "body",

    template: $("#template-app").html(),

    start: function(){
      this.$el.append(_.template(this.template))
      Backbone.history.start({pushState: false})
      Backbone.history.navigate('', {trigger: true})
    },
    
   
    clear: function() {
      App.$el.children('.body').html('')
    },
    
    append: function(content) {
      App.$el.children('.body').append(content)
    },
    
    setTitle: function(title) {
      $('.nav .title').text(title)
    },

    updateNav: function() {
      var hash = window.location.hash.substring(1)
      $('.nav').removeClass('active')
      $('.nav .' + hash).addClass('active')
    }


  }))

})
