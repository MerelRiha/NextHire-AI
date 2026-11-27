import mongoose from 'mongoose';
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},role:String,difficulty:String,score:Number,total:Number,answers:[{questionId:String,selected:String,correct:String,explanation:String}]},{timestamps:true});
export default mongoose.model('QuizAttempt',schema);
