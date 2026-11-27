import mongoose from 'mongoose';
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},targetRole:String,jobDescription:String,resumeText:String,score:Number,matchedSkills:[String],missingSkills:[String],keywordMatches:[String],suggestions:[String]},{timestamps:true});
export default mongoose.model('ResumeAnalysis',schema);
