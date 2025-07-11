const mongoose = require('mongoose');
async function connectDB() {
    try{
        await mongoose.connect('mongodb://localhost:27017/chatroom', {
        serverSelectionTimeoutMS:5000, 
        socketTimeoutMS:45000
    })
    console.log('MongoDB подключилось ')
    }
    catch(err){
        console.error('Ошибка в подключении ', err)
        process.exit(1);
    }
}
module.exports={connectDB};