import { Router } from "express";
import { cancelSubscription, createSubscription, deleteSubscription, getAllSubscriptions, getSubscriptionDetails, getUserSubscriptions, updateSubscription } from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js"
const subscriptionRouter = Router()

subscriptionRouter.get('/', authorize, getAllSubscriptions)
subscriptionRouter.get('/:id', getSubscriptionDetails)
subscriptionRouter.post('/',authorize, createSubscription)
subscriptionRouter.put('/:id', authorize, updateSubscription)
subscriptionRouter.delete('/:id', authorize, deleteSubscription)
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions)
subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription)
 
export default subscriptionRouter