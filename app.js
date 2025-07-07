require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/', (req, res, next) => {
  res.json('Hello. This is the homepage.')
})

app.listen(PORT, () => {
  console.log(`The app is live on port: ${PORT}`)
})