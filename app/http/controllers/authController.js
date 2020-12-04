const User = require("../../models/user")
const bcrypt = require('bcrypt')
const passport = require("passport")
function authController() {
    return {
        login(req, res) {
            res.render('auth/login')
        },
        postLogin(req, res, next) {

            const { name, email, password } = req.body
            //validate request
            if (!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }

            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('err', info.message)
                    return next(err)
                }
                //checking if user nort exist
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect("/")

                })

            })(req, res, next)
        },
        //we haver to give "," to separate two objects
        register(req, res) {
            res.render('auth/register')
        },
        //registration logic
        async postRegister(req, res) {
            const { name, email, password } = req.body
            //validate request
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }
            //check if email exist in databse
            User.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash('error', 'Email already taken')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register')
                }
            })

            //hashing users password using 'bcrypt'
            const hashedPassword = await bcrypt.hash(password, 10)

            //create a user

            const user = new User({
                name,
                email,
                password: hashedPassword

            })
            user.save().then((user) => {
                //Login

                return res.redirect('/')

            }).catch(err => {
                req.flash('error', 'Somthing went wrong')
                return res.redirect('/register')

            })

        },
        logout(req, res) {   //new method for logout 
            req.logout()
            return res.redirect('/login')
        }

    }
}
//exporting home module 

module.exports = authController