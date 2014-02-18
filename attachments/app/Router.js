$(function() {
  App.Router = new (Backbone.Router.extend({

    routes: {
      '' : 'Devices',
      'devices' : 'Devices',
      'device' : 'DeviceForm',
      'device/:deviceId' : 'DeviceForm',
      'sync/:deviceId' : 'Sync'
    },

    
    Devices: function() {
      
      var devices = new App.Collections.Devices()
      var devicesTable = new App.Views.DevicesTable({collection: devices})

      App.clear()
      App.setTitle('Devices')
      App.append(devicesTable.el)

      devicesTable.collection.fetch({success: function() {
        devicesTable.render()
      }})

    },


    DeviceForm: function(deviceId) {
      var modelClass = 'Device'
      var viewClass = 'DeviceForm'
      this.StandardForm(modelClass, viewClass, deviceId)
    },


    Sync: function(deviceId) {

      var ev = new Backbone.Model()
      var databases = new App.Collections.Databases()
      var databasesTable = new App.Collections.DatabasesTable({collection: databases})
      var device = new App.Model.Device()
      device.id = deviceId

      ev.on('0', function() {
        databasesTable.collection.fetch({success: function() {
          databasesTable.render()
          ev.trigger('1') 
        }})
      })

      ev.on('1', function() {
        device.fetch({success: function() {
          ev.trigger('2')
        }})
      })

      ev.on('2', function() {
        databasesTable.on('done', function() {
          alert('Syncing has completed')
          Backbone.history.navigate('', {trigger: true})
        })
        databasesTable.syncWith(device)
      })

      ev.trigger('0')

    },


    StandardForm: function(modelClass, viewClass, id, redirect) {
      
      App.setTitle('')

      var model = new App.Models[modelClass]()
      var form = new App.Views[viewClass]({model: model})
      if(id) form.model.set('_id', id)

      form.once('done', function() {
        Backbone.history.navigate('', {trigger: true})
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
