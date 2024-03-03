const responseHelper = require("../helpers/responseHelper");
const messageModel = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from
        })

        if (data) {
            let apiResponse = responseHelper.generate(false, "message added successfully", data);
            res.status(201).send(apiResponse);
        } else {
            let apiResponse = responseHelper.generate(true, "failed to add message to the database", []);
            res.status(412).send(apiResponse);
        }
    } catch (error) {
        let apiResponse = responseHelper.generate(true, error.message, []);
        res.status(400).send(apiResponse);
    }
};

module.exports.getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await messageModel.find({
            users: {
                $all: [from, to]
            }
        })
            .sort({ updatedAt: 1 });

        let projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })

        let apiResponse = responseHelper.generate(false, "messages", projectMessages);
        res.status(201).send(apiResponse);

    } catch (error) {
        let apiResponse = responseHelper.generate(true, error.message, []);
        res.status(400).send(apiResponse);
    }
}