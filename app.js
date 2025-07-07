require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/authRouter');
const appRouter = require('./routes/appRouter');
const adminRouter = require('./routes/adminRouter');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/', (req, res, next) => {
  res.json('Hello. This is the homepage.')
})

app.use('/auth', authRouter)
app.use('/app', appRouter)
app.use('/admin', adminRouter)

app.listen(PORT, () => {
  console.log(`The app is live on port: ${PORT}`)
})