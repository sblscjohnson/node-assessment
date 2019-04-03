const express = require('express')
const ctrl = require('./userCtrl')
const app = express()
const PORT = 3000
const {json} = require('express');

app.use(json())

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