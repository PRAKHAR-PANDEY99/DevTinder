const express = require('express');
const connectDB =require('./config/database');
const app = express();
const User = require('./models/user');
const {validateSignUpData} = require('./utils/validation');
const bcrypt = require('bcrypt');
app.use(express.json());
app.post("/signup", async (req, res) => {
    // creating a new instance of the User model with the user data
    
    try {
        validateSignUpData(req.body);
        // encrypting the password
        const {firstName, lastName, emailID, password} = req.body;
        const passwordhash = await bcrypt.hash(password, 10);
        const user = new User({firstName, lastName, emailID, password: passwordhash});
        await user.save();
        res.send({message:"User created successfully"});
    } catch (error) {
    console.error(error);
    res.status(400).send({
        message: error.message
    });
}h 
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
app.patch("/update", async (req, res) => {
    const userID = req.body.userID;
    const updates = req.body.updates;
    try {
    const ALLOWED_UPDATES = ["password", "age", "gender", "photoUrl", "about", "skills"];
    const isUpdateAllowed = Object.keys(updates).every((update) => ALLOWED_UPDATES.includes(update));
    if (!isUpdateAllowed) {
       throw new Error("Invalid updates! Only password, age, gender, photoUrl, about, and skills can be updated.");     
    } 
        const user = await User.findByIdAndUpdate(userID, updates, { returnDocument: "after", runValidators: true });
        console.log("Updated user:", user);
        if (!user) {
            return res.status(404).send({message:"User not found"});
        }
        res.send({message:"User updated successfully"});
    } catch (error) {
        console.error("Error updating user", error);
        res.status(500).send({message:"Error updating user"});
    }
});
app.post("/login", async (req, res) => {
    
    try {
        const {emailID, password} = req.body;
        const user = await User.findOne({ emailID: emailID });
        if (!user) {
            throw new Error("User not found email is not present in DB");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.send({message:"Login successful"});
        }
        else {
            throw new Error("Invalid credentials");
        }
    }
    catch (error) {
    res.status(400).send({
        message: error.message
    });
}
});

connectDB().then(() => {
    console.log("Connected to MongoDB");  
    app.listen(3000, () => {console.log('Server is running on port 3000');   
});
}).catch((err) => { 
    console.error("Error connecting to MongoDB", err);
});

  