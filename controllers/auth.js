const bcrypt = require('bcrypt')

const users1 = [{
  username: 'yo',
  email: 'j',
  firstName: 'j',
  lastName: 'j',
  passwordHash: '$2b$04$wsIJLL4hp1U7mcdCbM4c7uwMokYG5Ek4vyiZPah9IXxeI..UFsPu2'
}]

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      let foundUser = false
      console.log(1)
      for (let i = 0; i < users1.length; i++) {
        console.log(2)
        if (users1[i].username === username) {
          console.log(3)
          res.status(200).send(users1[i])
          bcrypt.compare(password, users1.passwordHash, function(err, result) {
            console.log(4)
            if (!err) {
              console.log(5)
              if (result) {
                console.log(6)
                const loginSuccess = 'You have successfully logged in!'
                let foundUser = true
                // res.status(200).send({sucess: true, prompt: loginSuccess})
              } else {
                console.log(7)
                // res.status(200).send({sucess: false})
              }
            } else {
              console.log(8)
              console.log('Error during bcrypt.compare(): ' + err)
              // res.status(400).send({sucess: false})
            }
          })
        }
      } if (!foundUser) {
        console.log(9)
        //res.status(400).send("User not found.")
      }
      console.log(10)
      },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        users1.push(req.body)
        const { username, email, firstName, lastName, password } = req.body
        saltRounds = 2
        bcrypt.hash(password, saltRounds, (err, passwordHash) => {
          if (!err) {
            let newDatabaseEntry = {}
            newDatabaseEntry.username = username
            newDatabaseEntry.email = email
            newDatabaseEntry.firstName = firstName
            newDatabaseEntry.lastName = lastName
            newDatabaseEntry.passwordHash = passwordHash
            // newDatabaseEntry.confirmPassword = confirmPassword
            console.log('\nRegistering User: ')
            console.log(newDatabaseEntry)
            users1.push(newDatabaseEntry)
            
          } else {
            console.log('Error during bcrypt.hash(): ' + err)
            res.status(400).send({success: false})
          }
        })


        res.status(200).send(req.body)
    }
}