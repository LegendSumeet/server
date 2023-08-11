const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const MentorRoutes = require('./routes/mentor');
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connected!'))
  .catch((err) => console.log(err));
app.use(express.json());

app.get('/', function (req, res) {
  res.send('<h1>MYCLAN API IS RUNNING</h1><br>');
});



app.use('/api/', authRoute);
app.use('/api/users', userRoute);
app.use('/api/mentor', MentorRoutes)

app.listen(process.env.PORT || 5002, () =>
  console.log(`app listening on port ${process.env.PORT || 5002}!`)
);

