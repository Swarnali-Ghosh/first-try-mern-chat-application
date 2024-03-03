
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const config = require('../config/appConfig');

let generateToken = (data) => {  // tech info yt generate token
    return new Promise((resolve, reject) => {
        try {

            let token = jwt.sign({
                // _id: data._id,
                // employee_role: data.employee_role,
                data

            }, process.env.JWT_SECRET, {
                // expiresIn: '1h',
                expiresIn: "7d"
            })

            resolve(token);

        } catch (err) {
            reject(err);
        }
    });
}


let verifyAuthToken = (token) => {  // tech info yt auth token
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                reject(err)
            } else {
                resolve(decoded);
            }
        })
    })
}

module.exports = {
    generateToken: generateToken,
    verifyAuthToken: verifyAuthToken
}
