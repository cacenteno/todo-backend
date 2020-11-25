const fs = require("fs")
const User = require("../model/User");
const argon2 = require("argon2")
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
/*
-sendEmail()
-userExists
-verifyUser(_id,user.recovery_code)
 */
function find(name, email, cb) {
    var thing = mongoose.connection.db.collection(name, async function (err, collection) {
        collection.find({ email: email }).toArray(cb);
    })
    return thing;
}
module.exports = {
    //Restrict routes to Logged in Users
    isAuthorized: () => {
        return async (req, res, next) => {
            try {

                let token = req.headers['secret-token']
                //Checks if valid if not throws error
                let valid = jwt.verify(token, process.env.SECRET)
                req.decoded = valid;
                next(null, req)
            }
            catch (error) {
                //custom error
                error = new Error("Please log in to view requested content. Need help ? Contact Support@workers.plus")
                next(error);
            }
        }
    },
    //Signs a user up
    SignUp: () => {
        return async (req, res, next) => {
            try {
                var accountData = req.body;
                var hashedPassword;
                var email = accountData.email;
                hashedPassword = await argon2.hash(req.body.password, { type: argon2.argon2id, memoryCost: 2 ** 16, hashLength: 50, })
                accountData.password = hashedPassword;
                var avatarName;
                if (!!!req.file) {
                    avatarName = "";
                }
                else {
                    avatarName = `/upload/${req.file.filename}`
                }
                let userAct =
                {
                    first_name: accountData.first_name,
                    last_name: accountData.last_name,
                    email: accountData.email.toLowerCase() ,
                    password: hashedPassword
                }
                user = await User.create(userAct)
                next(null, req);
            }
            catch (err) {
                error = new Error("Account already exists!");
                next(err)
            }
        }
    },
    //Logs User and returns JWT to authorize session for restricted endpoints
    Login: () => {
        return async (req, res, next) => {
            try {
                var email = req.body.email;
                const user = await find("users", email.toLowerCase(), async function (err, res) {
                    if (!res[0]) {
                        let error = new Error("Account not found!");
                        next(error);
                        return;
                    }
                    var passwordEntered = req.body.password;
                    var passwordDatabase = res[0].password
                    var isCorrect = await argon2.verify(passwordDatabase, passwordEntered).catch(err => { let error = new Error("Password Incorrect"); next(error); })
                    if (!isCorrect) {
                        let error = new Error("Password Incorrect");
                        next(error)               
                    }
                    else if (isCorrect) {
                        //Jwt Creation
                        let data = {
                            _id: res[0]._id,
                         }
                        const secret = process.env.SECRET;
                        const expiration = '6h'
                        let token = jwt.sign({ data }, secret, { expiresIn: expiration });
                        req.role = res[0].account_type
                        req.token = token;
                        req._id = data._id
                        next(null, req)
                    }
                });
            }
            catch (err) {
                let error = new Error("Password incorrect");
                next(error);
            }
        }
    },
    userExists() {
        return async (req, res, next) => {
            var account = User.findOne({ email: req.body.email })
            var routeToPhoto;
            if (req.file) {
                routeToPhoto = routeToPhoto = "./public/uploads/" + req.file.filename
            }
            if (User) {
                if (req.file) {
                    //deletes photo if uploaded
                    fs.unlink(routeToPhoto, function (err) {
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log("Successfully deleted.")
                        }
                    })
                    let error = new Error("Account Exists")
                    next(error)
                }
            }
            next(null, req)
        }
    },
}
