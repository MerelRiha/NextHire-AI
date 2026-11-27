import express from 'express'; import bcrypt from 'bcryptjs'; import jwt from 'jsonwebtoken'; import User from '../models/User.js'; import {auth} from '../middleware/auth.js';
const r=express.Router(); const safe=u=>({id:u._id,name:u.name,email:u.email,targetRole:u.targetRole,skills:u.skills,bio:u.bio,avatar:u.avatar});
const token=u=>jwt.sign({id:u._id,email:u.email},process.env.JWT_SECRET,{expiresIn:'7d'});
r.post('/register',async(req,res)=>{try{const {name,email,password,targetRole}=req.body;if(!name||!email||!password)return res.status(400).json({message:'Name, email and password are required'});if(await User.findOne({email}))return res.status(409).json({message:'Email already registered'});const u=await User.create({name,email,password:await bcrypt.hash(password,10),targetRole:targetRole||'Software Developer'});res.status(201).json({token:token(u),user:safe(u)});}catch(e){res.status(500).json({message:e.message})}});
r.post('/login',async(req,res)=>{try{const {email,password}=req.body;const u=await User.findOne({email});if(!u||!(await bcrypt.compare(password,u.password)))return res.status(401).json({message:'Invalid email or password'});res.json({token:token(u),user:safe(u)});}catch(e){res.status(500).json({message:e.message})}});
r.get('/me',auth,async(req,res)=>{const u=await User.findById(req.user.id);res.json({user:safe(u)})});
export default r;
