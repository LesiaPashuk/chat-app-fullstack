const express = require('express');
const http = require("http")
const {Server} = require('socket.io')
const cors = require('cors');
const router = require('./router');
const { connectDB } = require('./db');
const Chat = require('./modelsDB/Chat');
const User =require('./modelsDB/User')

const app=express();

app.use(cors({origin:"*"}))
app.use(express.json())
app.use(router)
app.use('/uploads', express.static('uploads'))

const server = http.createServer(app)

const io= new Server(server, {
    cors:{
        origin:"*", 
        methods:["GET", "POST"], 
    }
})
io.on('connection', (socket)=>{
    socket.on('join', ({username, chatRoom})=>{
        socket.join(chatRoom)
        socket.emit('message', {
            data:{usernsme:"admin", content:`hey my love ${username}`}
        } )
    })

    socket.on('sendMessage', async({content, id, chatRoom})=>{
    try{
        const chat = await Chat.findOne({name:chatRoom})
        const user= await User.findOne({_id:id})
        const date = new Date()
        console.log(date)
        if(chat && user){
            chat.messages.push({username:user.username, content:content, date:date, idUser:user._id})
            await chat.save()
            io.to(chatRoom).emit('message', {data:{username:user.username, content:content, idUser:user._id,date:date}})
        }
        
    }
    catch(err){
        console.error(err)
    }
})
    io.on('disconnect', ()=>{
        console.log("disconnect")
    })
})

io.setMaxListeners(20); 
connectDB().then(()=>{
    server.listen(5000, ()=>{
    console.log(`Server is fine: http://localhost:5000/`) 
   }) 
}) 