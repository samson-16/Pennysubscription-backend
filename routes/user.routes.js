import { Router } from "express";

const userRouter = Router()

userRouter.get('/', (req, res)=>res.send({message: "Get all users"}))
userRouter.post('/', (req, res)=>res.send({message: "Create user"}))
userRouter.get('/:id', (req, res)=>res.send({message: "Get user details"}))
userRouter.put('/:id', (req, res)=>res.send({message: "Update user"}))
userRouter.delete('/:id', (req, res)=>res.send({message: "Delete user"}))

export default userRouter