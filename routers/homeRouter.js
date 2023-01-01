const express = require('express');
const Router = express.Router();
const homeSchema = require('../models/homeSchema')

Router.get('/', (err, res) => {

    res.render('register', { title: "Fill the Form", password: '', email: '' })
})

Router.post('/register', async (req, res) => {
    try {

        const { name, number, email, password, cpassword } = req.body;
        if (password === cpassword) {
            const userData = new homeSchema({
                name, number, email, password
            })
            userData.save(err => {
                if (err) {

                    console.log("Error");
                } else {
                    res.render('register', { title: "Done", password: '', email: '' })
                }
            })

            const useremail = await homeSchema.findOne({ email: email })
            if (email === useremail.email) {
                res.render('register', { title: "Email is Already there  , Please choose different one", password: '', email: '' })
            }
            else {
                console.log("Error");
            }

        }
        else {
            res.render('register', { title: '', password: 'Password not Matching', email: '' })
        }


    } catch (error) {
        res.render('register', { title: "Error in Code", password: '', email: '' })
    }
})

// Sign in 

Router.post('/login', (req, res) => {
    const { email, password } = req.body;

    homeSchema.findOne({ email: email }, (err, result) => {

        if (email === result.email && password === result.password) {
            res.render('dashboard', { name: result.name })
        }
        else {
            console.log(err);

            res.render('register', { title: 'Email or Password may be incorrect', password: '', email: '' })
        }
    })
})


module.exports = Router;