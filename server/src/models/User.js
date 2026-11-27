import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true,lowercase:true},password:{type:String,required:true},targetRole:{type:String,default:'Software Developer'},skills:[String],bio:{type:String,default:''},avatar:{type:String,default:''}},{timestamps:true});
export default mongoose.model('User',schema);
