const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

const router = require("express").Router();

const Users = require("./authModel");
const { isName, isUsername, isPassword, } = require("./authService");

router.post("/register", isName, isUsername, isPassword, (req, res) => {
    const credentials = req.body;

    const rounds = process.env.BCRYPT_ROUNDS || 8;

    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    // save the user to the database
    Users.add(credentials)
      .then(user => {
        delete user.password
        const token = createToken(user)

        res.status(201).json({ data: user, token });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  
});

router.post("/login", isUsername, isPassword, (req, res) => {
  const { username, password } = req.body;

    Users.findBy({ username: username })
      .then(([user]) => {
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
            delete user.password
            const token = createToken(user);

            res.status(200).json({ token, data: user });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
});
function createToken(user){
  const payload = user;

  const secret = process.env.JWT_SECRET || 'is it secret? is it safe?';

  const option = {
    expiresIn: '1d',
  }

  return jwt.sign(payload, secret, option);
}

module.exports = router;