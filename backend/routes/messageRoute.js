const { addMessage, getAllMessage } = require("../controllers/messageController");

const router = require("express").Router();


router.post("/add-message", addMessage);
router.post("/get-message", getAllMessage);

module.exports = router;