const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectionString = "mongodb+srv://Christian:Zuritraining5250@leaflix-node.xg02m.mongodb.net/TestDB?retryWrites=true&w=majority"
const {Schema} = mongoose;

mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
},(err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Database connected");
    }
})
app.use(express.json());

const usersSchema = new Schema({
    fullname: String,
    phone: String,
    email: String,
    address: String,
    country: String,
    religion: String
})

const User = mongoose.model('User', usersSchema);

//get all user
app.get('/users', (req, res)=>{
    User.find({},(err, users) => {
        if(err){
            return res.status(500).json({message:err});
        } else {
            return res.status(200).json({message:"Successful",Users:users});
        }
    })
})

//get user by id
app.get("/users/:id", (req, res) => {
    User.findById(req.params.id,(err, user) => {
        if(err){
            return res.status(500).json({message:err});
        } else if(!user){
            return res.status(404).json({message:"User Not Found"});
        } else{
            return res.status(200).json({message:"Successful", User: user});
        }
    })
})

//get user by email
app.get("/users/:email", (req, res)=>{
    User.findOne({email:req.params.email},(err, user) => {
        if(err){
            return res.status(500).json({message:err});
        } else if(!user){
            return res.status(404).json({message:"User Not Found"});
        } else{
            return res.status(200).json({message:"Successful", User: user});
        }
    })
})

//create a user
app.post('/users', (req, res) => {
    User.create({
        fullname: req.body.fullname,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        country: req.body.country,
        religion: req.body.religion
    },(err,user) =>{
        if(err){
            return res.status(500).json({message:err});
        } else {
            return res.status(201).json({message:"Successful", User:user});
        }
    })
})

//update user by  name
app.put('/users/:id', (req, res) =>{
    User.findByIdAndUpdate(req.params.id,{
        fullname: req.body.fullname,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        country: req.body.country,
        religion: req.body.religion
    },(err, user) =>{
        if(err){
            return res.status(500).json({message:err});
        } else if(!user) {
            return res.status(404).json({message: "User Not Found"});
        }else {
            user.save((err,user) =>{
                if(err){
                    return res.status(500).json({message: err});
                } else {
                    return res.status(202).json({message: "User Has Been Successfully updated"});
                }
            })
        }
    })
})

//update user by email
app.put('/users/:email', (req, res) => {
    User.findByIdAndUpdate({email:req.params.id},{
        fullname: req.body.fullname,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        country: req.body.country,
        religion: req.body.religion
    },(err, user) =>{
        if(err){
            return res.status(500).json({message:err});
        } else if(!user) {
            return res.status(404).json({message: "User Not Found"});
        }else {
            user.save((err,user) =>{
                if(err){
                    return res.status(500).json({message: err});
                } else {
                    return res.status(202).json({message: "User Has Been Successfully updated"});
                }
            })
        }
    })
})

//delete a user by id
app.delete('/users/:id', (req, res) => {
    console.log("....")
    User.findByIdAndDelete(req.params.id,(err, user) => {
        if(err){
            return res.status(500).json({message:err});
        } else if(!user){
            return res.status(404).json({message: 'User not found'});
        }else{
            return res.status(200).json({message: "User has been successfully deleted"});
        }
    })
})

//Delete user by email
app.delete('/users', (req, res) => {
    console.log("....")
    User.findOneAndDelete({email:req.body.email},(err, user) => {
        if(err){
            return res.status(500).json({message:err});
        } else if(!user){
            return res.status(404).json({message: 'User not found'});
        }else{
            return res.status(200).json({message: "User has been successfully deleted"});
        }
    })
})

const port = process.env.Port || 3000;  
app.listen(port, () => {
    console.log("server created on port "+port);
})