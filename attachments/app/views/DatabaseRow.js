$(function() {

  App.Views.DatabaseRow = Backbone.View.extend({

		initialize: function(){
      // listen to events in the Model
      this.listenTo(this.model, 'destroy', this.remove)
      this.listenTo(this.model, 'change', this.render)
    },

    // events in the DOM
    events: {
      "click #delete": "delete"
    },

    delete: function() {
      var form = this
      this.model.on('sync', function() {
        form.trigger('done')
      })
      this.model.destroy()
    },

    tagName: "tr",

    template : _.template($("#template-DatabaseRow").html()),

    render: function () {

      var vars = this.model.toJSON()

      if(!vars.hasOwnProperty('name')) vars.name = '...'
      if(!vars.hasOwnProperty('disk_size')) vars.disk_size = '...'
      if(!vars.hasOwnProperty('status')) vars.status = '...'
      if(!vars.hasOwnProperty('doc_count')) vars.doc_count = '...'

      // transform disk_size to human readable
      if (vars.disk_size > 1000 && vars.disk_size > 1000000) {
        vars.disk_size = vars.disk_size/1000000 + ' MB'
      }
      else if (vars.disk_size > 1000) {
        vars.disk_size = vars.disk_size/1000 + ' KB'
      }
      else {
        vars.disk_size = vars.disk_size + ' Bytes'
      }

      this.$el.html(this.template(vars))

    },

  })

})
