
# todo
- figure out structure that makes most sense.  All messenger data and app in `messenger` database? Content types in their own database and messenger app in the `apps` database? I'm leaning towards contained in messenger database... maybe `_messenger` database. 
- on sync
 - clear device_messenger and device_databases database
 - pull device's messenger database to device_messenger and check to see if there is an update for messenger app, if so then prompt and restart app
 - pull device's databases database to device_databases database and compare
 - clear all databases function
- when syncing, poll for document count and total disk size for the database we're syncing to. this gives us at least some indicator of progress during sync even if we don't get to see % complete.


- On sync, show database stats of the Device that isn't the messenger. This way we can see the progress of pushing data from the Messenger to target Device.
 - iframes opening a `showdatabase.html#dbName` file on the Device side
 - There's also this messaging pattern that could be used... /message database keeps continuous replication between nodes. When on Node A, an invisible iframe opens to Node B at `/messenger/_design/messenger/process.html`. Node A makes a request to Node B by placing a message in the `message` database.  The process on Node B then sees this request, processes it using data local to Node B, and then responds by putting another doc or updating original message doc in the `message` database which then replicates over to Node A. We would start by