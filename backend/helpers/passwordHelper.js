const bcrypt = require(`bcrypt`);

const hashPassword = async (password) => { // using this function we can hash the password // following tech infi yt video
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
};

const comparePassword = async (password, hashedPassword) => {  // following tech infi yt video

    let result = bcrypt.compare(password, hashedPassword)

    return result
}

module.exports = {
    hashPassword: hashPassword,
    comparePassword: comparePassword
}
