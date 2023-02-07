const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();



const Customer = require("../models/userSchema");
const authenticate = require("../middleware/authenticate")

router.get('/', (req, res) => {
  res.send("hello auth from router");
})


//registration

router.post('/registration', async (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  if (!name || !email || !password || !confirm_password) {
    return res.status(422).json({ error: "All filleds are require" });
  }
  try {
    const customerExist = await Customer.findOne({ email: email });

    if (customerExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != confirm_password) {
      return res.status(422).json({ error: "passwords are not matching" });
    } else {
      const detail = new Customer({ name, email, password, confirm_password });
      await detail.save();
      res.status(201).json({ message: "Customer registration successfully" });
    }


  } catch (e) {
    console.log(e);
  }

})

//login

router.post('/login', async (req, res) => {

  try {
    //let token;
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "please filled the data" })
    }

    const customerLogin = await Customer.findOne({ email: email })

    console.log(customerLogin)

    if (customerLogin) {
      const isMatch = await Customer.findOne({ password: password })
      //  let token = await employeeLogin.generateAuthToken();
      //  console.log("yes");
      //   console.log(token)

      //     res.cookie('iaurojwtoken',token,{
      //     expires:new Date(Date.now()+25892000000),
      //     httpOnly:true
      //   })

      if (!isMatch) {
        res.status(400).json({ error: "invalid credentials" })
      } else {
        let token = await customerLogin.generateAuthToken();
        console.log("yes-sir");
        console.log(token)
         console.log("starting")
        res.cookie('iaurojwtoken', token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true
        })
        console.log("why this is happening")

        //localstorage

        //localStorage.setItem('iauronew',token);


        res.json({ message: "login successful" })
      }

    } else {
      res.status(400).json({ error: "invalid credentials" })
    }

  } catch (err) {
    console.log(err)
  }

})


module.exports = router;