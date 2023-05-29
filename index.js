const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const app = express()
const Sequelize = require('sequelize');
const sequelize = new Sequelize('freindster', 'root', '9026724930M@n', {
  host: 'localhost',
  dialect: 'mysql',
  port: "3306"
});
const Op = Sequelize.Op;

//schema
const User = sequelize.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  mobile: {
    type: Sequelize.STRING,
    unique: true,
  },
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  latitude: Sequelize.STRING,
  longitue: Sequelize.STRING,
  friend: Sequelize.STRING,
  block: Sequelize.STRING,
  requests: Sequelize.STRING
});

const transporter = nodemailer.createTransport({
  service: 'your-email-service-provider',
  auth: {
    user: 'your-email',
    pass: 'your-password',
  },
});

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
 res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
 res.send('This is my about route..... ')
})


// function generateToken(user) {
//   const token = jwt.sign({ id: user.id }, 'AES-256', { expiresIn: '10m' });
//   return token;
// }

// function authenticateToken(req, res, next) {
//   const token = req.headers['authorization'];
//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   jwt.verify(token, 'AES-256', (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//     req.user = user;
//     next();
//   });
// }

// app.post('/signup', async (req, res) => {
//   try {
//     const { name, email, mobile, password } = req.body;
//     if (email == "" && mobile == "") {
//       return res.send({ data: "atleast prove an email or phone number" })
//     }
//     let EXUser
//     if (email) {
//       EXUser = await User.findOne({ where: { email } });
//     } else if (mobile) {
//       EXUser = await User.findOne({ where: { mobile } });
//     }
//     if (EXUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const otpCode = Math.floor(100000 + Math.random() * 900000);

//     // await transporter.sendMail({
//     //  from: 'your-email',
//     //  to: email,
//     //  subject: 'OTP Verification',
//     //  text: `Your OTP code is: ${otpCode}`,
//     // });
//     //since i dont have free otp service provider thats why this area is commented if provided, there is an extension code that i would add.
//     const hashedPassword = await bcrypt.hash(password, 10);
//     let arr = []
//     const user = await User.create({ name, email, mobile, friend: JSON.stringify(arr), block: JSON.stringify(arr), requests: JSON.stringify(arr), password: hashedPassword });

//     const token = generateToken(user);

//     return res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/signin', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     const token = generateToken(user);

//     return res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/forgotPass', async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found or You Havent set a recovery Email!' });
//     }
//     // await transporter.sendMail({
//     //  from: 'your-email',
//     //  to: email,
//     //  subject: 'OTP Verification',
//     //  text: `Your OTP code is: ${otpCode}`,
//     // });
//     //since i dont have free otp service provider thats why this area is commented if provided, there is an extension code that i would add.

//     return res.json({ data: "done" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/refresh-token', authenticateToken, async (req, res) => {
//   try {
//     const token = generateToken(req.user);
//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/seeAllFriends', authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findOne({ where: { id: req.user.id } });
//     let friends = JSON.parse(user.dataValues.friend)
//     if (req.body.remove == true) {
//       let index = friends.indexOf(req.body.id)
//       if (index > -1) friends.splice(index, 1)
//       friends = JSON.stringify(friends)
//       await sequelize.query(`update users set friend  = '${friends}' where id = ${req.user.id}`)
//       return res.send({ data: 'friend removed' })
//     }
//     if (friends.length == 0) return res.send({ friends: "You have no friends" })
//     for (let i in friends) {
//       let { dataValues } = await User.findOne({ where: { id: friends[i] } })
//       friends[i] = dataValues.name
//     }
//     return res.send({ friends: friends })
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/seePeople', authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findOne({ where: { id: req.user.id } });
//     let friends = JSON.parse(user.dataValues.friend)
//     const potential = await User.findAll({ where: { id: { [Op.notIn]: friends } } });
//     for (let i in potential) {
//       potential[i] = { id: potential[i].dataValues.id, name: potential[i].dataValues.name }
//     }
//     if (potential.length == 0) return res.send({ friends: "You have all friends" })
//     return res.send({ potentialFriends: potential })
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/sendRequest', authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findOne({ where: { id: req.user.id } });
//     let friends = JSON.parse(user.dataValues.friend)
//     for (let i in friends) if (req.body.id == friends[i]) return res.send({ data: "already friends" })
//     const { dataValues } = await User.findOne({ where: { id: req.body.id } });
//     let reqF = JSON.parse(dataValues.requests)
//     if (req.user.id in reqF || reqF[0] == req.user.id) return res.send({ data: 'request already sent' })
//     reqF.push(req.user.id)
//     reqF = JSON.stringify(reqF)
//     await sequelize.query(`update users set requests  = '${reqF}' where id = ${req.body.id}`)
//     return res.send({ data: 'request sent' })
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/acceptRequest', authenticateToken, async (req, res) => {
//   try {
//     const { dataValues } = await User.findOne({ where: { id: req.user.id } });
//     let friends = JSON.parse(dataValues.friend)
//     if (req.body.response == 'R') {
//       let requests = JSON.parse(dataValues.requests)
//       if (requests.length == 0) {
//         return res.send({ data: 'request not found' })
//       }
//       let ind = requests.indexOf(req.body.id)
//       if (ind > -1) {
//         requests.splice(ind, 1)
//       } else {
//         return res.send({ data: 'request not found' })
//       }
//       requests = JSON.stringify(requests)
//       await sequelize.query(`update users set requests  = '${requests}' where id = ${req.user.id}`)
//       return res.send({ data: 'request removed' })
//     }
//     if (req.body.id in friends || friends[0] == req.body.id) { return res.send({ data: 'already a friend' }) }
//     friends.push(req.body.id)
//     friends = JSON.stringify(friends)
//     let requests = JSON.parse(dataValues.requests)
//     let ind = requests.indexOf(req.body.id)
//     requests.splice(ind, 1)
//     requests = JSON.stringify(requests)
//     await sequelize.query(`update users set friend  = '${friends}', requests = '${requests}' where id = ${req.user.id}`)
//     return res.send({ data: 'request accepted' })
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/updateProfile', authenticateToken, async (req, res) => {
//   try {
//     const { dataValues } = await User.findOne({ where: { id: req.user.id } });
//     let { name, email, mobile } = dataValues
//     let data = req.body
//     data.name = data.name ? data.name : name
//     data.email = data.email ? data.email : email
//     data.mobile = data.mobile ? data.mobile : mobile
//     await sequelize.query(`update users set name  = '${data.name}', email = '${data.email}', mobile = '${data.mobile}' where id = ${req.user.id}`)
//     return res.send({ data: "Profile Updated" })
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/viewProfile', authenticateToken, async (req, res) => {
//   try {
//     const { dataValues } = await User.findOne({
//       where: {
//         [Op.or]: [
//           { email: req.body.email ? req.body.email : "" },
//           { mobile: req.body.mobile ? req.body.mobile : "" }
//         ]
//       }
//     });

//     return res.send({ data: dataValues })
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
// app.post('/searchFriend', authenticateToken, async (req, res) => {
//   try {
//     let data = {}
//     if (req.body.name) {
//       data['key'] = 'name'
//       data['value'] = req.body.name
//     } else if (req.body.email) {
//       data['key'] = 'email'
//       data['value'] = req.body.email
//     } else if (req.body.mobile) {
//       data['key'] = 'mobile'
//       data['value'] = req.body.mobile
//     } else {
//       return res.send({ data: "provide correct value" })
//     }
//     console.log(data);
//     let [results] = await sequelize.query(`SELECT * FROM users WHERE ${data.key} LIKE '${data.value}%'`)
//     return res.send({ data: results })
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



// sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
// })



// Export the Express API
module.exports = app