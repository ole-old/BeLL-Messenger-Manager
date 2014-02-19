$(function() {

  App.Views.LoginForm = Backbone.View.extend({
    
    className: "form",

    events: {
      "click #save": "setForm",
      "submit form" : "setFormFromEnterKey"
    },

    render: function() {
      this.form = new Backbone.Form({ model: this.model })
      this.$el.append(this.form.render().el)
      this.$el.append('<a class="btn" id="save">save</a><a class="btn" id="delete">delete</a>')
    },

    setFormFromEnterKey: function(event) {
      event.preventDefault()
      this.setForm()
    },

    setForm: function() {
      var form = this
      form.form.commit()
      form.model.once('sync', function() {
        $.couch.login({
          name: form.model.get('userName'),
          password: form.model.get('password'),
          success: function(data) {
            form.trigger('done')
          },
          error: function(status) {
            alert('login failed')
          }
        });
      })
      form.model.save()
    },

  });

});
