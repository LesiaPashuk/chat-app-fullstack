const mongoose= require('mongoose');
const chatSchema = new mongoose.Schema({
    name: String, 
    code:{type:String, unique:true}, 
    img:String, 
    participants:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}], 
    messages:[{username:String, content:String, date:Date, idUser: {type:mongoose.Schema.Types.ObjectId, ref:'User'}}],
    
})

module.exports= mongoose.model('Chat', chatSchema)