import { SERVER_URL } from "../config/env.js"
import { workflowClient } from "../config/upstash.js"
import Subscription from "../models/subscription.model.js"

export const createSubscription = async (req, res, next)=>{
try {
    const subscription = await Subscription.create({
        ...req.body, 
        user: req.user._id
    })

    const {workflowRunId}= await workflowClient.trigger(
      {
        url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
        body: {
          subscriptionId: subscription.id
        },
        headers: {
          "Content-Type": "application/json"
        },

        retries:0

      }
    )

    res.status(201).json({success:true , data:
      {subscription, workflowRunId}
    })
} catch (error) {
    next(error)
}
}

export const getUserSubscriptions = async (req, res, next)=>{
    try {
        if(req.user.id !== req.params.id){
            return res.status(401).json({success:false , message:"Unauthorized"})
        }

        const subscriptions = await Subscription.find({user: req.params.id})

        res.status(200).json({success:true , data:subscriptions})
            
    } catch (error) {
        next(error)
        
    }
}

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions
    });
  } catch (error) {
    next(error);
  }
};


export const getSubscriptionDetails = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id)

        if (!subscription) {    
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({success:true , data:subscription})
    } catch (error) {
        next(error)
    }
}



export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found"
      });
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    return res.status(200).json({
      success: true,
      data: updatedSubscription
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id)

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            })
        }
        if (subscription.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            })
        }
        await subscription.deleteOne()
        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully"
        })
    } catch (error) {
        next(error)
    }       
}

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found"
      });
    }
    subscription.Status = "cancelled";
    await subscription.save();

    return res.status(200).json({   
        success: true,
        message: "Subscription cancelled successfully",
        data: subscription
    });
  }
    catch (error) {
        next(error);
    }
};

