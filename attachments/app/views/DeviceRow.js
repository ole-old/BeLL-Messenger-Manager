$(function() {

  App.Views.DeviceRow = Backbone.View.extend({

    tagName: "tr",

    template : _.template($("#template-DeviceRow").html()),

    render: function () {
      this.$el.append(this.template(this.model.toJSON()))
    },

  })

})
