const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userRoute = require("./routes/user");


dotenv.config();
// get variables from .env file || process.env.VARIABLE_NAME
mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB Connected!')).catch((err) => console.log(err))
app.use(express.json());
app.use("/api/", userRoute);
app.use("/api/users",userRoute);





app.listen(process.env.PORT || 5002, () => console.log(`Example app listening on port ${port}!`))