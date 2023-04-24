const express=require("express");
const mongoose=require("mongoose");
const port =5000
const connectionUrl=`mongodb+srv://Navaraj:gilAo24Sz2L3GG9T@cluster0.dwlicok.mongodb.net/mernpractice?retryWrites=true&w=majority`
const Tasks=require("./model/tasks")
const app=express();
mongoose.set("strictQuery",true);
mongoose.connect(connectionUrl).then((console.log("db connected"))).catch((e)=>console.log(e))
app.use(express.json())

app.post("/POST/v1/tasks",async(req,res)=>{
    try{
        const task=await Tasks.create(req.body);
        res.status(201).json({
            _id:task._id,
            statuscode:201
        })
    }
    catch(e){
        res.json({
        message:e.message
    })
    }
})

app.get("/GET/v1/tasks",async(req,res)=>{
    try{
        const tasks=await Tasks.find();
        res.status(200).json({
            statuscode:200,
            tasks
        })
    }
    catch(e){
        res.json({
            message:e.message
        })
    }
})
app.get("/GET/v1/tasks/:id",async(req,res)=>{
    try{
        const tasks=await Tasks.findOne({_id:req.params.id});
        res.status(200).json({
            statuscode:200,
            tasks
        })
    }
    catch{
        res.status(404).json({
            statuscode:404,
            error:"There is no task at that id"
        })
    }
})
app.delete("/DELETE/v1/tasks/:id",async(req,res)=>{
    try{
        await Tasks.deleteOne({_id:req.params.id})
        res.status(204).json({
            statuscode:204
            

        })
    }
    catch{
        res.status(404).json({
            statuscode:404
        })
    }
})
app.put("/PUT/v1/tasks/:id",async(req,res)=>{
    try{
        await Tasks.updateOne({_id:req.params.id},req.body)
        await Tasks.findOne({_id:req.params.id})
        res.status(204).json({
            statuscode:204
        })
    }
    catch{
        res.status(404).json({
            statuscode:404,
            error:"There is no task at that id"
        })
    }
})
app.post("/POST/v1/tasks",async(req,res)=>{
    const task=await Tasks.insertMany(req.body)
    res.status(201).json({
        statuscode:201,
        task
    })
})
app.delete("/DELETE/v1/tasks",async(req,res)=>{
    
        const task=await Tasks.deleteMany({_id: {$in: req.body}});
        res.status(204).json({
            statuscode:204,
            task
        })
    
})
app.listen(port,()=>{console.log("server at 5000 port")})