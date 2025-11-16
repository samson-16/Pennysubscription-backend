import { Router } from "express";

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res)=>res.send({title: "Get all subscriptions"}))
subscriptionRouter.get('/:id', (req, res)=>res.send({title: "GET subscription details"}))
subscriptionRouter.post('/', (req, res)=>res.send({title: "Create subscription"}))
subscriptionRouter.put('/', (req, res)=>res.send({title: "Update subscriptions"}))
subscriptionRouter.delete('/', (req, res)=>res.send({title: "Delete subscriptions"}))
subscriptionRouter.get('/user/:id', (req, res)=>res.send({title: "Get user subscriptions"}))
subscriptionRouter.put('/:id/cancel', (req, res)=>res.send({title: "Get user subscriptions"}))

export default subscriptionRouter