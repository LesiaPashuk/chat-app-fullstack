const express=require('express')
const router=express.Router();
const User =require('../server/modelsDB/User')
const Chat = require('./modelsDB/Chat')
const multer =require('multer');
const { default: mongoose } = require('mongoose');
const upload= multer({dest:'uploads/'})
const { ObjectId } = require('mongoose').Types;

router.post('/', async (req, res)=>{
    try{
        const {email, password}=req.body;
          console.log('Запрос:', { email, password });
        if(!email||!password){
            return res.status(400).json({message:'Email and password are required'})
        }
        const findedUser = await User.findOne({
            email,  
            password
        })
         console.log('Найден пользователь:', findedUser); 

        if (!findedUser) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }
        res.status(200).json(findedUser)
    }
    catch(err){
        console.error('Login error: ', err)
        res.status(500).json(err)
    }
})

router.post('/register', async (req, res)=>{
    try{ 
        const {email, password, name, id}=req.body;

        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
       

        if(!email||!password||!name||!id){
            return res.status(400).json({message:"Email and password are required"})
        }
        
        const user= new User({username:name, email, password, id});
        await user.save()
        res.status(201).json(user)
    }
    catch(err){
        res.status(500).json({ message: 'Server error ', err });
    }
})

router.post('/chat/:id/:chatRoom',upload.single('img'),  async (req, res)=>{
    try{
        const {name, code}=req.body;
        const img=req.file?.path
        const id=req.params.id;
        console.log(id)
        if(!code||!name){
            return res.status(400).json({message:"Code and name are required"})
        }
        const existingChat= await Chat.findOne({code})
        if(existingChat){
            return res.status(400).json({message:"Chat already exists"})
        } 
        const user = await User.findOne({_id:id})
        if (!user){
            return res.status(404).json({message:"user isnt founded"})
        }
        const chat = new Chat({
            name, 
            code, 
            img, 
            participants:[user._id]
        })
        await chat.save()
        user.chats.push(chat._id)
       await user.save()
        
        res.status(201).json(chat)
    }
    catch(err){
        console.error(err)
         res.status(500).json({ message: 'Server error ', err });
    }
})
router.get('/chat/:id/:chatRoom', async(req, res)=>{
    try{
    const id=req.params.id
    const user=await User.findOne({_id:id});
    if(!user){
        return res.status(404).json({message:"user is not finded"})
    }
    const chatsBD= await Chat.find({_id:{$in:user.chats}})
    res.status(200).json(chatsBD);
}
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message })
    }
})
router.get(`/chat/:id/:chatRoom/takeChatMessagesBD`, async(req, res)=>{
    try{
        const id=req.params.id
        const chatRoom=req.params.chatRoom;
        const user = await User.findOne({_id:id})
        if(!user){
            return res.status(404).json({message:"user is not finded"})
        }
        const chat = await Chat.findOne({name:chatRoom, participants:{$in:user._id}})
        if(!chat){
            return res.status(404).json({message:"chat is not finded"})
        }
        res.status(200).json(chat.messages)
    }
    catch(err){
        console.error(err)
        res.status(500).json({message:"server error in get message: ", error:err.message})
    }
})
router.patch('/chat/:id/:chatRoom/:codeChatRoom', async(req, res)=>{
    try{
        const codeChatRoom= req.params.codeChatRoom;
        const id = req.params.id
        const chat= await Chat.findOne({code:codeChatRoom});
        if(!chat){
            return res.status(400).json({message:"Chat isnt created"})
        }
        const user = await User.findOne({_id:id})
        if(!user){
            return res.status(404).json({message:"user not founded"})
        }
        if(chat.participants.includes(user._id)){
            return res.status(409).json({message:"Chat already exists"})
        }
        user.chats.push(chat._id)
        user.save()

        chat.participants.push(user._id)
        chat.save()
        res.status(200).json(chat)
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:'Server error', error: err.message})
    }
})
module.exports=router;