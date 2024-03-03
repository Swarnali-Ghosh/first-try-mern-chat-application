const mongoose = require(`mongoose`);

const databaseConnection = () => {

    mongoose.connect(process.env.DB_URL, { // LIKE FIRDOSH & SIX PACK PROGRAMMER
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }).then((data) => {
        console.log(`server connected with mongodb: ${data.connection.host}`)
    }).catch((err) => {
        console.log(err);
        process.exit(1);
    })

}

module.exports = databaseConnection;