const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: 1,
            name: 'John',
            email: 'john@gmail.com',
            password: 'qwerty',
            entries: 0,
            joined: new Date()
        },
        {
            id: 2,
            name: 'Doe',
            email: 'doe@gmail.com',
            password: 'asdfgh',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: 987,
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}



app.get('/', (req, res, next) => {
    res.send(database.users);
})

app.post('/signin', (req, res, next) => {
    // bcrypt.compare("zxcvbn", '$2a$10$eb5FzzGAtjyc1Z5Q2N04OektTFULy9zY7oMu3Mqbnzl3E/JU.w5K.', function(err, res) {
    //     console.log('first guess', res);
    // });
    // bcrypt.compare("veggies", '$2a$10$SOpzo0pwkgjUCkOqpCwkeewBe29nRggj.6CAUXk4HquKZfLKRy1RO', function(err, res) {
    //     console.log('second guess', res);
    // });
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password ) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res, next) => {
    const { name, email, password } = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // });
    database.users.push({
        id: database.users.length + 1,
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res, next) => {
    const { id } = req.params;
    let found = false;
    for (const user of database.users) {
        if (user.id === Number(id)) {
            found = true;
            return res.json(user);
        }
    }
    if (!found) {
        res.status(400).json('user is not found');
    }
})

app.put('/image', (req, res, next) => {
    const { id } = req.body;
    let found = false;
    for (const user of database.users) {
        if (user.id === Number(id)) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    }
    if (!found) {
        res.status(400).json('user is not found');
    }
})

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('server is running on port 3000');
})
