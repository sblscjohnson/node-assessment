const userData = require('./userData.json')
// use lots of filters

module.exports = {
  get: (req, res) => {
    const {age, email, favorites} = req.query
    let users = []
    
      if(age) {
        for(let i = 0; i < userData.length; i++) {
          if(userData[i].age < parseInt(age)) {
            users.push(userData[i])
          }
        }
      } else if (email) {
        for(let i = 0; i < userData.length; i++) {
          if(userData[i].email === email) {
            users.push(userData[i])
          }
        }
      } else if (favorites) {
        for(let i = 0; i < userData.length; i++) {
          if(userData[i].favorites.includes(favorites)) {
            users.push(userData[i])
        }
      }
    } else {
      users = userData.slice()
    }
    res.status(200).send(users)
  },

  getbyId: (req, res) => { // use a filter
    let users = userData.slice()
    let {userId} = req.params
    let newArr = users.filter(val => val.id === parseInt(userId))
    console.log('byid', newArr)
    if (newArr[0]) {
    res.status(200).send(newArr[0])
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
    res.status(200).send(users)
  },

  notadmins: (req, res) => {
    let users = []
    for(let i = 0; i < userData.length; i++) {
      if(userData[i].type !== 'admin') {
        users.push(userData[i])
      }
    }
    res.status(200).send(users)
  },

  getbyType: (req, res) => {
    let users = []
    for(let i = 0; i < userData.length; i++) {
      if(userData[i].type === req.params.userType) {
        users.push(userData[i])
      }
    }
    res.status(200).send(users)
  },

  editbyId: (req, res) => {
    let users = userData.slice()
    for(let i = 0; i < users.length; i++) {
      if(users[i].id === parseInt(req.params.userId)) {
        users[i] = {...users[i], ...req.body}
      }
    }
    res.status(200).send(users)
  },

  postuser: (req, res) => {
    let users = userData.slice()
    let id = users.length + 1
    let newPerson = {id, ...req.body}
    users.push(newPerson)
    res.status(200).send(users)
  },

  delete: (req, res) => {
    const {userId} = req.params
    const newId = parseInt(userId)
    console.log('userId', userId)
    console.log('logic? the rapper', userData.find((val => val.id === parseInt(userId))))
    if (userData.find((val => val.id === parseInt(userId)))) {
      const index = userData.findIndex(val => val.id === parseInt(userId))
      // console.log('index', index)
      userData.splice(index, 1)
      // const newArr = userData.filter(val => val.id === newId)
      // console.log('find', userData.find(val => val.id === parseInt(userId)))
      // console.log(newArr)
      res.status(200).send(userData)
    } else {
      res.sendStatus(404)
    }

  }
}