$(function() {

  App.Views.DatabasesTable = Backbone.View.extend({

    tagName: "table",

    className: "table table-striped",

    template: $('#template-DatabasesTable').html(),

    itemView: 'DatabaseRow',

    initialize: function(){
    },

    addOne: function(model){
      var rowView = new App.Views[this.itemView]({model: model})
      rowView.render()  
      this.$el.append(rowView.el)
    },

    addAll: function(){
      this.collection.forEach(this.addOne, this)
    },

    render: function() {
      this.$el.append(this.template)
      this.addAll()
    }

  })

})

