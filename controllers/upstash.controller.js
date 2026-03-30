import { serve } from "@upstash/workflow/express";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
import { sendReminderEmail } from "../utils/send-email.js";

const REMINDER = [7,5,3,2,1,0]


export const sendReminder = serve(async(context)=>{
    const payload = context.requestPayload || {};
const { subscriptionId } = payload;
    console.log(`Sending reminder for subscription ${subscriptionId}`)
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== "active") {
        console.log(`Subscription ${subscriptionId} is not active or does not exist.`)
        return;
    }

    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())){

        console.log(`Subscription ${subscriptionId} has already expired.`)
        return;
    }


    for(const daysBefore of REMINDER){
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `reminder-${daysBefore}-days`, reminderDate);
          await triggerReminder(context, `reminder-${daysBefore}-days`, subscription);
        }
    }

            


});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run("get subscription", async()=>{
        return Subscription.findById(subscriptionId).populate('user', 'name email')
    })
}


const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context,label, subscription) => {
    return await context.run(label, async ()=>{
        console.log(`Triggering ${label} reminder`)

        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription
        })
    })


}