import  express  from "express";
import {getFriends, getFriend, addFriend ,deleteFriend ,editFriend, addUser} from '../models/database.js'
import controller from '../controller/friends.js'
const router = express.Router()

router
    .route('/')
        .get(controller.getMany)
        .post(controller.getPost)
            // const name = required.bode.anme
            // const age = required.bode.age
            // no need for await coz we're not calling a function

router
        .route('/:name')
            .get(controller.getManyMore) // to parse data for a single user
            .delete(controller.getDelete)
            // router.delete('/friends/delete/:id',async(req,res)=>{
            //     await deleteFriend(+req.params.id)
            //     res.json(await getFriends())
            // })
router
        .route('/:id')
            .patch(controller.getPatch) 

            export default router

//mvc : models views controller
// [models] - database querys / functions
// [views] - ur static pages / index.html / instead of a public folder we use a views folder
// [controller] - functions that use req , res