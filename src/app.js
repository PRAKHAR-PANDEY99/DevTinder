const express = require('express');
const connectDB =require('./config/database');
const app = express();
const cookieParser=require("cookie-parser");
const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/request');
const userRouter=require('./routes/user');
//const jwt=require("jsonwebtoken")
app.use(cookieParser());
app.use(express.json());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
// get user by email
// app.get("/user", async (req, res) => {
//     const emailID = req.body.emailID;
//     try {
//         const user = await User.find({ emailID: emailID });
//         if(user.length === 0) {
//             return res.status(404).send({message:"User not found"});
//         }
//         else {
//         res.send(user);
//         }
//     } catch (error) {
//         console.error("Error finding user", error);
//         res.status(500).send({message:"Error finding user"});
//     }
// }); 
// app.get("/feed",async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.send(users);
//     } catch (error) {
//         console.error("Error finding users", error);
//         res.status(500).send({message:"Error finding users"});
//     }
// });
// app.delete("/delete", async (req, res) => {
//     const userrID = req.body.userID;
//     try {        const user = await User.findByIdAndDelete(userrID);
//         if(!user) {
//             return res.status(404).send({message:"User not found"});
//         }
//         res.send({message:"User deleted successfully"});
//     }
//     catch (error) {
//         console.error("Error deleting user", error);
//         res.status(500).send({message:"Error deleting user"});
//     }   
// });
// app.patch("/update", async (req, res) => {
//     const userID = req.body.userID;
//     const updates = req.body.updates;
//     try {
//     const ALLOWED_UPDATES = ["password", "age", "gender", "photoUrl", "about", "skills"];
//     const isUpdateAllowed = Object.keys(updates).every((update) => ALLOWED_UPDATES.includes(update));
//     if (!isUpdateAllowed) {
//        throw new Error("Invalid updates! Only password, age, gender, photoUrl, about, and skills can be updated.");     
//     } 
//         const user = await User.findByIdAndUpdate(userID, updates, { returnDocument: "after", runValidators: true });
//         console.log("Updated user:", user);
//         if (!user) {
//             return res.status(404).send({message:"User not found"});
//         }
//         res.send({message:"User updated successfully"});
//     } catch (error) {
//         console.error("Error updating user", error);
//         res.status(500).send({message:"Error updating user"});
//     }
// });
connectDB().then(() => {
    console.log("Connected to MongoDB");  
    app.listen(3000, () => {console.log('Server is running on port 3000');   
});
}).catch((err) => { 
    console.error("Error connecting to MongoDB", err);
});

  