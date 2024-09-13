const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
let users = []; 


app.post('/signup', (req, res) => {
    const { username, password } = req.body;
 if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: '!Username already exists' });
    }

    users.push({ username, password });
    res.status(200).json({ message: 'User registered successfully' }); 
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: '!Invalid username or password' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
