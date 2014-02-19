$(function() {

  App.Views.DeviceForm = Backbone.View.extend({
    
    className: "form",

    events: {
      "click #save": "setForm",
      "click #delete": "delete",
      "submit form" : "setFormFromEnterKey"
    },

    render: function() {
      this.form = new Backbone.Form({ model: this.model })
      this.$el.append(this.form.render().el)
      this.$el.append('<a class="btn btn-primary btn-lg active" role="button" id="save">save</a><a class="btn btn-primary btn-lg active" role="button" id="delete">delete</a>')
    },

    delete: function() {
      var form = this
      this.model.on('sync', function() {
        form.trigger('done')
      })
      this.model.destroy()
    },

    setFormFromEnterKey: function(event) {
      event.preventDefault()
      this.setForm()
    },

    setForm: function() {
      var form = this
      form.form.commit()
      form.model.once('sync', function() {
        form.trigger('done')
      })
      form.model.save()
    },

  });

});
