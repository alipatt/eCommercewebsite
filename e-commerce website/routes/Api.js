const express = require('express')
const app = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Status = require('../models/Status')

app.use(cors())

process.env.SECRET_KEY = 'secret'

app.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + 'Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

app.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      } else {
        res.status(400).json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
})

app.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

app.post('/addProduct', (req, res) => {
  const product = {
      name: req.body.name,
  category: req.body.category,
  img: req.body.img,
  price: req.body.price,
  iprice: req.body.iprice,
  sizes: req.body.sizes,
  sizem:req.body.sizem,
  sizel:req.body.sizel,
  gender:req.body.gender
    }

// Insert into table
Status.create(product).then((response) => {
  res.status(200).json(response)
}).catch((err) => {
  console.log('Insert failed with error: ' + err)
  res.status(404).json()
})
})

app.post('/updateProduct', (req, res) => {
  const product = {
    id:req.body.id,
  name: req.body.name,
  category: req.body.category,
  img: req.body.img,
  price: req.body.price,
  iprice: req.body.iprice,
  sizes: req.body.sizes,
  sizem:req.body.sizem,
  sizel:req.body.sizel,
  gender:req.body.gender
    }

// Update into table
Status.update(product,{ where: { id: product.id } }).then((response) => {
  res.status(200).json(response)
}).catch((err) => {
  console.log('update failed with error: ' + err)
  res.status(404).json()
})
})

app.post('/deleteProduct', (req, res) => {
  const product = {
    id:req.body.id
    }

// Delete into table
Status.destroy({ where: { id: product.id } }
  ).then(() => {
    res.status(200).json()
  }).catch(function (err) {
    console.log('delete failed with error: ' + err)
    res.status(404).json()
  })
})

app.post('/products' , async function(req,res) {
  
  await Status.findAll().then((products) => {
  res.status(200).json(products)
}).catch((err) => {
  console.log({ err })
  res.status(404).json()
  
})
})

app.post('/buy' ,async function(req,res) {
  const products = req.body
  
  for( var i = 0 ; i < products.length ; i++){
   await Status.update(products[i],{ where: { id: products[i].id } }).then((response) => {
    res.status(200).json(response)
  }).catch((err) => {
    console.log('update failed with error: ' + err)
    res.status(404).json()
  }) }
  
  
})
  




module.exports = app
