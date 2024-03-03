const checkHelper = require("../helpers/checkHelper");
const passwordHelper = require("../helpers/passwordHelper");
const responseHelper = require("../helpers/responseHelper");
const tokenHelper = require("../helpers/tokenHelper");
const userModel = require("../models/userModel");

// register
const userRegister = async (req, res) => {
    try {

        // step 1: find user
        let findUser = await userModel.findOne({ email: req.body.email });

        if (checkHelper.isEmpty(findUser)) {

            // step 2:  save user to database

            const newUser = new userModel({
                username: req.body.username,
                email: req.body.email,
                password: await passwordHelper.hashPassword(req.body.password),

            })

            const data = await newUser.save();

            let apiResponse = responseHelper.generate(false, "user created successfully", data);
            res.status(201).send(apiResponse);

        } else { // If employee already exist
            let apiResponse = responseHelper.generate(true, "user already created", []);
            res.status(412).send(apiResponse);
        }

    } catch (error) {
        let apiResponse = responseHelper.generate(true, error.message, []);
        res.status(400).send(apiResponse);
    }
}

const userLogin = async (req, res, next) => {
    try {
        let finduser = await userModel.findOne({ email: req.body.email });
        // .select('-__v -_id').lean();
        if (checkHelper.isEmpty(finduser)) {

            let apiResponse = responseHelper.generate(true, "user not registered!", []);
            return res.status(404).send(apiResponse);

        } else {
            if (await passwordHelper.comparePassword(req.body.password, finduser.password)) {
                let data = {
                    token: await tokenHelper.generateToken(finduser),
                    user: finduser
                };

                let apiResponse = responseHelper.generate(false, 'login successfully', data);
                return res.status(200).send(apiResponse);
            } else {

                let apiResponse = responseHelper.generate(true, "authentication failed! invalid email and password", []);
                res.status(401).send(apiResponse);

            }
        }

    } catch (error) {
        let apiResponse = responseHelper.generate(true, error.message, []);
        res.status(400).send(apiResponse);
    }
}

const userList = async (req, res, next) => {
    try {
        const data = await userModel.find();
        if (data.length > 0) {
            let apiResponse = responseHelper.generate(false, "fetched user successfully", data);
            res.status(200).send(apiResponse);
        } else {
            let apiResponse = responseHelper.generate(false, "user not found!", data);
            res.status(200).send(apiResponse);
        }
    } catch (error) {

        let apiResponse = responseHelper.generate(true, error.message, []);
        res.status(400).send(apiResponse);

    }
}

module.exports = {
    userRegister, userLogin, userList
}