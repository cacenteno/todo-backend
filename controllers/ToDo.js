const express = require("express");
const router = express.Router();
const AuthService = require("../middleware/User") 
const ToDoService = require("../middleware/ToDo");
const { route } = require("./User");

router.get("/", AuthService.isAuthorized(), ToDoService.getTodos(), async(req,res)=>{
    res.json({ todos: req.todos})
})
router.post("/", AuthService.isAuthorized(), ToDoService.AddTodo(), async(req,res)=>{
    res.json({
        todos: req.todos
    });
})
router.patch("/", AuthService.isAuthorized(),ToDoService.updateTodo(),async (req,res)=>{
    try
    {
        res.json({
           todos: req.todos
        })
    }
    catch(err){
        throw err;
    }
})
router.delete("/", AuthService.isAuthorized(),ToDoService.removeTodo(),async (req,res)=>{
    try
    {
        res.json({
            todos: req.todos
        })
    }
    catch(err){
        throw err;
    }
})
router.patch("/order",AuthService.isAuthorized(), ToDoService.updateOrder(),async(req,res)=>{
res.json({todos: req.todos})
})
module.exports = router;