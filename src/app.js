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
// get user by email
app.get("/user", async (req, res) => {
    const emailID = req.body.emailID;
    try {
        const user = await User.find({ emailID: emailID });
        if(user.length === 0) {
            return res.status(404).send({message:"User not found"});
        }
        else {
        res.send(user);
        }
    } catch (error) {
        console.error("Error finding user", error);
        res.status(500).send({message:"Error finding user"});
    }
});
app.get("/feed",async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        console.error("Error finding users", error);
        res.status(500).send({message:"Error finding users"});
    }
});
app.delete("/delete", async (req, res) => {
    const userrID = req.body.userID;
    try {        const user = await User.findByIdAndDelete(userrID);
        if(!user) {
            return res.status(404).send({message:"User not found"});
        }
        res.send({message:"User deleted successfully"});
    }
    catch (error) {
        console.error("Error deleting user", error);
        res.status(500).send({message:"Error deleting user"});
    }   
});

connectDB().then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {console.log('Server is running on port 3000');   
});
}).catch((err) => { 
    console.error("Error connecting to MongoDB", err);
});

  