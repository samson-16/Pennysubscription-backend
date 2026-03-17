import Subscription from "../models/subscription.model"

export const createSubscription =(req, res, next)=>{
try {
    const subscription = Subscription.create({
        ...req.body, 
        user: user._id
    })
} catch (error) {
    next(error)
}
}