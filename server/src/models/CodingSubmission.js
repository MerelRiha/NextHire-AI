import mongoose from 'mongoose';
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},problemId:String,problemTitle:String,language:String,code:String,status:String,score:Number,feedback:String},{timestamps:true});
export default mongoose.model('CodingSubmission',schema);
