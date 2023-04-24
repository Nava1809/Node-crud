const mongoose=require("mongoose");
const TaskSchema=mongoose.Schema({
    title:{
        type:String,

    },
    is_completed:{
        type:String
    }
})
const Tasks=mongoose.model("Task",TaskSchema);
module.exports=Tasks