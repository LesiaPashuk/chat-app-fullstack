const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type: String, required:true}, 
    email:{type:String, unique:true}, 
    createdAt:{type:Date, default: Date.now}, 
    id:{type:String, unique:true}, 
    password:{type:String, required:true},
    chats:[{type:mongoose.Schema.Types.ObjectId, ref:'Chat'}]
})

module.exports= mongoose.model('User', userSchema)