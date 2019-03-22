const userData = require('./userData.json')

module.exports = {
  get: (req, res) => {
    let users = []
    if(req.query) {
      if(req.query.age) {
        for(let i = 0; i < userData.length; i++) {
          if(userData[i].age < parseInt(req.query.age)) {
            users.push(userData[i])
          }
        }
      } else if (req.query.email) {
        for(let i = 0; i < userData.length; i++) {
          if(userData[i].email === req.query.email) {
            users.push(userData[i])
          }
        }
      } else if (req.query.favorites) {
        for(let i = 0; i < userData.length; i++) {
          if(userData[i].favorites.includes(req.query.favorites)) {
            users.push(userData[i])
          }
        }
      }
    } else {
      users = userData
    }
    console.log(users.length)
    res.status(200).send(users)
  },

  getbyId: (req, res) => {
    let users = userData
    if (req.params.userId <= 100) {
    res.status(200).send(users[parseInt(req.params.userId)])
    } else {
      res.sendStatus(404)
    }
  },

  admins: (req, res) => {
    let users = []
    for(let i = 0; i < userData.length; i++) {
      if(userData[i].type === 'admin') {
        users.push(userData[i])
      }
    }
    console.log(users.length)
    res.status(200).send(users)
  },

  notadmins: (req, res) => {
    let users = []
    for(let i = 0; i < userData.length; i++) {
      if(userData[i].type !== 'admin') {
        users.push(userData[i])
      }
    }
    console.log(users.length)
    res.status(200).send(users)
  },

  getbyType: (req, res) => {
    let users = []
    for(let i = 0; i < userData.length; i++) {
      if(userData[i].type === req.params.userType) {
        users.push(userData[i])
      }
    }
    console.log(users.length)
    res.status(200).send(users)
  },

  editbyId: (req, res) => {
    let users = userData
    for(let i = 0; i < users.length; i++) {
      if(users[i].id === parseInt(req.params.userId)) {
        users[i] = {...users[i], ...req.body}
      }
    }
    console.log(users.length)
    res.status(200).send(users)
  },

  postuser: (req, res) => {
    let users = userData
    let id = users.length + 1
    let newPerson = {id, ...req.body}
    users.push(newPerson)
    console.log(users.length)
    res.status(200).send(users)
  },

  delete: (req, res) => {
    let users = []
    if (req.params.userId <= 100) {
    for(let i = 0; i < userData.length; i++) {
      if(userData[i].id !== parseInt(req.params.userId)) {
        console.log(userData[i])
        users.push(userData[i])
      }
    }
    console.log(users.length)
    res.status(200).send(users)
  } else {
    res.sendStatus(404)
  }}
}