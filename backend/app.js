const express = require(`express`);
const cors = require(`cors`)
const user = require("./routes/userRoute");
const message = require("./routes/messageRoute");
const app = express();

// middleware
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, 'views')));

// routing
app.use("/api/v1", user);
app.use("/api/v1", message);

module.exports = app;