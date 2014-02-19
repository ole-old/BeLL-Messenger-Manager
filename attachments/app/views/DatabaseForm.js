$(function() {

  App.Views.DatabaseForm = Backbone.View.extend({

    tagName: 'form',
    
    className: "form",

    events: {
      "click #save": "setForm",
      "click #delete": "delete",
      "submit form" : "setForm"
    },

    render: function() {
      this.form = new Backbone.Form({ model: this.model })
      this.$el.append(this.form.render().el)
      this.$el.append('<button class="btn btn-primary btn-lg active" role="button" id="save">save</button><button class="btn btn-primary btn-lg active" role="button" id="delete">delete</button>')
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

    setForm: function(event) {
      event.preventDefault()
      var form = this
      form.form.commit()
      form.model.once('sync', function() {
        form.trigger('done')
      })
      form.model.save()
    },

  });

});
