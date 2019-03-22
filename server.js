const express = require('express')
const bodyParser = require('body-parser')
const ctrl = require('./usersCtrl')
const app = express()
const PORT = 3000

app.use(bodyParser.json())

app.get('/api/user/', ctrl.get)
app.get('/api/user/:userId', ctrl.getbyId)
app.get('/api/admin', ctrl.admins)
app.get('/api/nonadmin', ctrl.notadmins)
app.get('/api/type/:userType', ctrl.getbyType)
app.put('/api/user/:userId', ctrl.editbyId)
app.post('/api/user', ctrl.postuser)
app.delete('/api/user/:userId', ctrl.delete)

app.listen(PORT, () => {
  console.log(`Liftoff on ${PORT}`)
})