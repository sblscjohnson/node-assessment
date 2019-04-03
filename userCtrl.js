let userData = require('./userData.json')

module.exports = {
  get: (req, res) => {
    const {age, email, favorites} = req.query
    if(age) {
      let byAge = userData.filter(el => el.age < parseInt(age))
      res.status(200).send(byAge)
    } else if(email) {
      let byEmail = userData.filter(el => el.email === email)
      res.status(200).send(byEmail)
    } else if(favorites) {
      let byFavorites = userData.filter(el => el.favorites.includes(favorites))
      res.status(200).send(byFavorites)
    } else {
      res.status(200).send(userData)
    }
  },
  getbyId: (req, res) => {
    const {userId} = req.params
    let byId = userData.filter(el => el.id === parseInt(userId))
    if(byId.length) {
      res.status(200).send(byId[0])
    } else {
      // console.log(userData)
      res.sendStatus(404)
    }
  },
  admins: (req, res) => {
    let byAdmins = userData.filter(el => el.type === 'admin')
    res.status(200).send(byAdmins)
  },
  notadmins: (req, res) => {
    let byNot = userData.filter(el => el.type !== 'admin')
    res.status(200).send(byNot)
  },
  getbyType: (req, res) => {
    const {userType} = req.params
    let byType = userData.filter(el => el.type === userType)
    res.status(200).send(byType)
  },
  editbyId: (req, res) => {
    const {userId} = req.params;
    let index = userData.findIndex(el => el.id === parseInt(userId))
    let editedUser = {...userData[index], ...req.body}
    userData.splice(index, 1, editedUser)
    res.status(200).send(userData)
  },
  delete: (req, res) => {
    const {userId} = req.params
    console.log('userid', userId)
    // let index = userData.findIndex(el => el.id === parseInt(userId))
    let filteredUserData = userData.filter(el => el.id !== parseInt(userId))
    userData = filteredUserData
    res.status(200).send(userData)
  },
  postuser: (req, res) => {
    let newId = userData[userData.length - 1].id + 1
    console.log(newId)
    userData.push({id: newId, ...req.body})
    // console.log(userData)
    res.status(200).send(userData)
  }
}