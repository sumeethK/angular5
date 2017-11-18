const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TodoList = require('../models/todoList');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const config = require('../config/database');

router.get('/', function (req, res) {
    res.send("Api works!!!")

});

router.get('/health', function (req, res) {
    res.send("Up & Running !!!")

});


mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err) {
    if (err) {
        console.error("Error! " + err);
    }
});

router.get('/todoList', function (req, res) {
    console.log('Get request for all todos');
    TodoList.find({})
        .exec(function (err, todos) {
            if (err) {
                console.log("Error retrieving todos");
            } else {
                res.json(todos);
            }
        });
});

router.get('/todo/:id', function (req, res) {
    console.log('Get request for a single todo');
    TodoList.findById(req.params.id)
        .exec(function (err, todo) {
            if (err) {
                console.log("Error retrieving todo");
            } else {
                res.json(todo);
            }
        });
});

router.post('/todo', function(req, res){
    console.log('Post a todo '+ req.body.creator);
    var newTodo = new TodoList();
    newTodo.creator  = req.body.creator;
    newTodo.task.name =  req.body.task.name;
    newTodo.task.description =  req.body.task.description;
    newTodo.task.creationDate  =req.body.task.creationDate;
    newTodo.task.targetDate  =req.body.task.targetDate;
    newTodo.task.status  = req.body.task.status;
    newTodo.task.comments  = req.body.task.comments;
    newTodo.task.status  = req.body.task.status;
    newTodo.creator  = req.body.creator;
    newTodo.assignee  = req.body.assignee;
    newTodo.save(function(err, insertedTodo){
        if (err){
            console.log('Error saving todo'+ e);
        }else{
            res.json(insertedTodo);
        }
    });
});


router.put('/todo/:id', function (req, res) {
    console.log('Update a video');
    TodoList.findByIdAndUpdate(req.params.id,
        {
            $set: {
                task: {
                    name: req.body.task.name
                    , description: req.body.task.description
                    , creationDate: req.body.task.creationDate
                    , targetDate: req.body.task.targetDate
                    , status: req.body.task.status
                    , comments: req.body.task.comments

                },
                creator: req.body.creator,
                assignee: req.body.assignee
            }

        },
        {
            new: true
        },
        function (err, updatedVideo) {
            if (err) {
                res.send("Error updating video");
            } else {
                res.json(updatedVideo);
            }
        }

    );
});


router.delete('/todo/:id', function (req, res) {
    console.log('Deleting a todo');
    TodoList.findByIdAndRemove(req.params.id, function (err, todo) {
        if (err) {
            res.send("Error deleting todo");
        } else {
            res.json(todo);
        }
    });
});

module.exports = router;