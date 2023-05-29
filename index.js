const express = require('express')

const app = express()
const routes = require('./routes/routes');
const sequelize = require("./config/sequelize")
app.use(express.json());

const PORT = 4000

app.get('/', (req, res) => {
 res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
 res.send('This is my about route..... ')
})
app.use('/api', routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})



// Export the Express API
module.exports = app