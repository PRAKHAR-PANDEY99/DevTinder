const express = require('express');
const connectDB =require('./config/database');
const app = express();
const User = require('./models/user');
app.use(express.json());
app.post("/signup", async (req, res) => {
    // creating a new instance of the User model with the user data
    const user = new User(req.body);
    try {        await user.save();
        res.send({message:"User created successfully"});
    } catch (error) {
        console.error("Error creating user", error);    
        res.status(500).send({message:"Error creating user"});
    }
});
connectDB().then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {console.log('Server is running on port 3000');   
});
}).catch((err) => { 
    console.error("Error connecting to MongoDB", err);
});

  