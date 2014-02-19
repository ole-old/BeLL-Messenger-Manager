$(function() {

  App.Views.DatabaseRow = Backbone.View.extend({

		initialize: function(){
      this.model.on('change', this.render, this);
    },

    tagName: "tr",

    template : _.template($("#template-DatabaseRow").html()),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()))
    },

  })

})
