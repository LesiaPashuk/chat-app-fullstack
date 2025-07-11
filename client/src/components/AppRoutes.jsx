import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { Chat } from './Chat.tsx'
import { Main } from './Main.tsx'
import {RegisterForm} from './RegisterForm.tsx'
const AppRoutes =()=>{
    return (
        <Routes>
            <Route path='/' element={<Main></Main>}></Route>
           
            <Route path='/chat/:id/:chatRoom' element={<Chat></Chat>}></Route>
            <Route path='/register' element={<RegisterForm></RegisterForm>} ></Route>
        </Routes>
    )
}
export default AppRoutes;