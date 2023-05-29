const express = require('express')
const routes = require('./routes/routes');
const sequelize = require("./config/sequelize")

const app = express()
app.use(express.json());
const PORT = 4000
app.use('/api', routes);


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})


app.get('/', (req, res) => {
  res.send('Hey this is my API')
})


// Export the Express API
module.exports = app