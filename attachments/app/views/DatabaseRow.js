$(function() {

  App.Views.DatabaseRow = Backbone.View.extend({

    tagName: "tr",

    template : _.template($("#template-DatabaseRow").html()),

    render: function () {
      this.$el.append(this.template(this.model.toJSON()))
    },

  })

})
