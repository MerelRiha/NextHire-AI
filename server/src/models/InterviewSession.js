import mongoose from 'mongoose';
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},role:String,type:String,questions:[{question:String,category:String,answer:String,relevance:Number,clarity:Number,technical:Number,feedback:String}],overallScore:Number,strengths:[String],weaknesses:[String],suggestions:[String],status:{type:String,default:'in-progress'}},{timestamps:true});
export default mongoose.model('InterviewSession',schema);
