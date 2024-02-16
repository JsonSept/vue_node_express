import {getFriends, getFriend, addFriend ,deleteFriend ,editFriend} from '../models/database.js'

export default {
    getMany: async(req,res)=>{
        res.send(await getFriends())
        },
    getPost : async(req,res)=>{
        const {name,age} = req.body //creating 1 variable for name and age
        const post = await addFriend(name,age)
        res.send(await getFriends())
    },
    getManyMore : async(req,res)=> {
        res.send(await getFriend(+req.params.id))
        },

    getDelete : async(req,res)=>{ 
        console.log(req.params.name)
        res.send(await deleteFriend(req.params.name))
        },

    getPatch : async(req,res)=>{ 
        const [friend] = await getFriend(+req.params.id)
        let {name,age} = req.body
        name? name=name: {name}= friend
        age? age=age: {age}=friend
        // console.log(friend);
        await editFriend(name,age)
        res.json(await getFriends()) //if you want to use just json data thn you have to res.json ,if not stick to res.send
        }
    // getPatch : async(req,res)=>{
    //     const {name,age} = req.body //creating 1 variable for name and age
    //     const patch = await addFriend(name,age)
    //     res.send(await getFriends(+req.params.id))
    // }
}