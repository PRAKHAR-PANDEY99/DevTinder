const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },

    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },

    status:{
        type:String,
        required:true,
        enum:{
            values:["interested","accepted","rejected","ignored"],
            message:`{VALUE} is incorrect status type`
        }
    }

},{
    timestamps:true
});
connectionRequestSchema.pre("save", async function () {
    if (this.fromUserId.equals(this.toUserId)) {
        throw new Error("Cannot send request to yourself!");
    }
});


const ConnectionRequest = mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);


module.exports = ConnectionRequest;