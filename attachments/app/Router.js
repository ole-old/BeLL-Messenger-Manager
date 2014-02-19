$(function() {
  App.Router = new (Backbone.Router.extend({

    routes: {
      '' : 'Login',
      'databases' : 'Databases',
      'database' : 'DatabaseForm',
      'devices' : 'Devices',
      'device' : 'DeviceForm',
      'device/:deviceId' : 'DeviceForm',
      'sync/:deviceId' : 'Sync'
    },


    Login: function() {

      var modelClass = 'User'
      var viewClass = 'LoginForm'
      this.StandardForm(modelClass, viewClass, null, function(model) {
        // todo
        App.user = model
        Backbone.history.navigate('devices', {trigger: true})

      })

    },

    
    Devices: function() {
      
      var devices = new App.Collections.Devices()
      var devicesTable = new App.Views.DevicesTable({collection: devices})

      App.clear()
      App.updateNav()
      App.setTitle('Devices')
      App.append(devicesTable.el)

      devicesTable.collection.fetch({success: function() {
        devicesTable.render()
      }})

    },


    DeviceForm: function(deviceId) {

      var modelClass = 'Device'
      var viewClass = 'DeviceForm'
      this.StandardForm(modelClass, viewClass, deviceId, function() {
        Backbone.history.navigate('devices', {trigger: true})
      })

    },


    Databases: function() {
      
      var collection = new App.Collections.Databases()
      var table = new App.Views.DatabasesTable({collection: collection})

      App.clear()
      App.updateNav()
      App.setTitle('Devices')
      App.append(table.el)

      table.collection.fetch({success: function() {
        table.render()
      }})

    },


    DatabaseForm: function(deviceId) {

      var modelClass = 'Database'
      var viewClass = 'DatabaseForm'
      this.StandardForm(modelClass, viewClass, deviceId, function() {
        Backbone.history.navigate('databases', {trigger: true})
      })

    },


    Sync: function(deviceId) {

      var ev = new Backbone.Model()
      var databases = new App.Collections.Databases()
      var databasesTable = new App.Views.DatabasesTable({collection: databases})
      var device = new App.Models.Device()
      device.set('_id', deviceId)

      App.clear()
      App.setTitle('Devices')
      App.append(databasesTable.el)

      ev.on('0', function() {

       // databasesTable.collection.fetch({success: function() {
        databasesTable.collection.on('sync', function() {
          databasesTable.render()
          ev.trigger('1') 
        })
        databasesTable.collection.fetch()
      })

      ev.on('1', function() {
        device.fetch({success: function() {
          ev.trigger('2')
        }})
      })

      ev.on('2', function() {
        databasesTable.collection.on('syncWith:done', function() {
          //Backbone.history.navigate('devices', {trigger: true})
        })
        databasesTable.collection.syncWith(device)
      })

      ev.trigger('0')

    },


    StandardForm: function(modelClass, viewClass, id, callback) {
      
      App.setTitle('')

      var model = new App.Models[modelClass]()
      var form = new App.Views[viewClass]({model: model})
      if(id) form.model.set('_id', id)

      form.once('done', function() {
        callback(form.model)
      })
      
      App.clear()
      App.append(form.el)

      if(id) {
        form.model.fetch({success: function() {
          form.render()
        }})
      }
      else {
        form.render()
      }


    }


  }))

})
