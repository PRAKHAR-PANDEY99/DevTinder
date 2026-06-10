const express = require('express');
const app = express();
const adminAuth = require('./middlewares/auth');
app.get('/test', (req, res) => {
    res.send('Hello World!');
}
);
app.use("/admin",adminAuth);
app.get('/admin/dashboard', (req, res) => {
    res.send('Welcome to the admin dashboard!');
});
app.get('/admin/settings', (req, res) => {
    res.send('Welcome to the admin settings!');
});

app.listen(3000, () => {console.log('Server is running on port 3000');   
});
  