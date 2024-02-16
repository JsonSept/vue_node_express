import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import friendsRouter from './routes/friends.js'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser' 
import jwt from 'jsonwebtoken'
import {getFriends, getFriend, addFriend ,deleteFriend ,editFriend ,addUser, checkUser } from './models/database.js'

config();

const PORT = process.env.PORT

const app = express();
app.use(cors({
    origin:'http://localhost:8080',
    credentials:true
})) // cross origin resource sharing , use and accept json data from the user


app.use(express.json())
app.use(cookieParser())

app.use(express.static('../frontend/src/views/SignupView.vue')) // when page loads it must load the index.html ,lets us use a static file
// app.use(express.static('../frontend/src/views/AboutView.vue')) // when page loads it must load the index.html ,lets us use a static file




const authenticate = (req,res,next) =>{
    let {cookie} = req.headers
    let tokenInHeader =cookie && cookie.split('=')[1]
    if(tokenInHeader===null) res.sendStatus(401)
    jwt.verify(tokenInHeader,process.env.SECRET_KEY,(err,user)=>{
if(err) return res.sendStatus(403)
req.user = user
next()
})
}
// app.use('/friends',authenticate,friendsRouter)
// app.get('/friends',authenticate, async (req,res)=>{
//     res.send(await getFriends())
// })

// app.post('/login',(req,res)=>{
    
//     res.json({
//         // token:token,
//         msg:'You have logged in'
//     })
// })

app.use('/friends',authenticate,friendsRouter)

app.post('/users',(req,res)=>{
    const {username,password} = req.body
    bcrypt.hash(password,10, async (err,hash)=>{
        if(err) throw err
        await addUser(username,hash)
        
        // res.send(await addUser(username,hash))
    })
    res.send({
       msg: "You have registered successfully"
    })
})
const auth = async (req,res,next) => {  //middleware (req,res,next())
const {password,username} = req.body
const hashedPassword = await checkUser(username )
bcrypt.compare(password,hashedPassword, (err,result)=>{
    if(err) throw err
    if(result === true){
        const {username} = req.body
    const token = jwt.sign({username:username},
    process.env.SECRET_KEY,{expiresIn:'1h'})
    res.cookie('jwt',token)
        next()
    }else{
        res.send({msg:'The username or password is incorrect'})
    }
})
}
    app.post('/login',auth, (req,res)=>{
        res.send({
            msg:'You have logged in!!! YAY!'
        })
    })
app.listen(PORT, ()=> {
    console.log('http://localhost:' + PORT);
})