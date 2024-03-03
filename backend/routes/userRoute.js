const express = require(`express`)

const {
    userRegister, userLogin, userList
} = require(`../controllers/userController`);


// const { isAuthorized, isAdmin } = require('../middlewares/authMiddleware');

// router object
const router = express.Router()

router.post("/register", userRegister)
router.post("/login", userLogin)
router.post("/all-user", userList);

module.exports = router