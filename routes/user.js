const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());
const path = require('path');

 //--------------USER SIGN UP API -----------------//

// In-memory storage for user data (for demonstration purposes)
let users = [];
// Signup API endpoint
  router.post('/signup' ,(req, res) => {
  const { email, password, name } = req.body;
  // Check if the email is already registered
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'Email is already registered.' });
  }
  // Create a new user object
  const newUser = { email, password, name };
  // Add the new user to the in-memory storage
  users.push(newUser);
  // Respond with a success message
  res.status(201).json({ message: 'User registered successfully.', user: newUser });
});
// redirect path to sign up page
router.get('/signup', (req, res) => {
  const filePath4 = path.join(__dirname, '../views/signup.html');
  res.sendFile(filePath4);
});

 //--------------USER LOGIN API -----------------//
  const users1 = [
    { email: 'user1@gmail.com', password: 'password1' },
    { email: 'user2@gmail.com', password: 'password2' },
  ];
// Login API endpoint
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users1.find(u => u.email === email && u.password === password);
    if (user) 
    { res.status(200).json({ message: 'Login successful', user });} 
      else { res.status(401).json({ message: 'Invalid credentials' }) }
  });

  router.get('/login', (req, res) => {
    const filePath6 = path.join(__dirname, '../views/login.html');
    res.sendFile(filePath6);
  });

  //--------------MONEY SEND API -----------------//
router.post('/send-money', (req, res) => {
  const { email, amount, recipientEmail } = req.body;
  // Check if the provided email exists in the users1 array
  const senderUser = users1.find(u => u.email === email);
  const recipientUser = users1.find(u => u.email === recipientEmail);
  if (senderUser && recipientUser) {
    res.status(200).json({ message: 'Money sent successfully', senderUser, amount, recipientUser });
  } else {
    res.status(401).json({ message: 'Money sent unsuccessful. Invalid User.' });
  }
});
// PATH TO MONEY SEND PAGE
router.get('/send-money', (req, res) => {
  const filePath3 = path.join(__dirname, '../views/send-money.html');
  res.sendFile(filePath3);
});

// DASHBOARD PAGE
router.get('/dashboard', (req, res) => {
  const filePath = path.join(__dirname, '../views/dashboard.html');
  res.sendFile(filePath);
});


// transaction history'
router.get('/transaction-history', (req, res) => {
  const filePath2 = path.join(__dirname, '../views/transaction-history.html');
  res.sendFile(filePath2);
});

// Sample transaction data
const transactions = [
  { id: 1, sender: 'user1@example.com', recipient: 'user2@example.com', amount: 50 },
  { id: 2, sender: 'user2@example.com', recipient: 'user3@example.com', amount: 30 },
];

// Get all transactions
router.get('/transactions', (req, res) => {
  res.json(transactions);
});


module.exports = router; 

