import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: [3, 'Subscription name must be at least 3 characters'],
        maxLength: [100, 'Subscription name can not be more than 100 characters']
    },
    price:{
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Subscription price must be at least 0']
    },
    currency:{
        type: String,
        enum : ['USD', 'EUR', 'GBP', 'Brr'],
        default: 'USD'
    
} ,
frequency: {
    type: String,
    enum : ['daily','weekly', 'monthly', 'yearly'],
},
catagory :{
    type: String,
    enum : ['entertainment','education', 'productivity', 'health', 'other'],
    require: true
},
paymentMethod:{
    type: String,
    required:true,
    trim:true
},
startDate:{
    type: Date,
    required:true,
    validate:{
        validator: (value)=>value <= new Date(),
        message: 'Start date cannot be in the future'
    }
},
renewalDate:{
    type: Date,
    required:true,
    validate:{
        validator: (value)=>value > this.startDate,
        message: 'Renewal date must be after start date'
    }},
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
}  
}, {timestamps: true});


subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
    }
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]); 
 
    if (this.renewalDate <= this.startDate){
       this.status = 'expired';
    }
    next();
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;