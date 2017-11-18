//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const TodolistSchema = mongoose.Schema({
    task: {
        name: String
        , description: String
        , creationDate:  Date
        , targetDate:  Date                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        , status: String
        , comments:String

      },
      creator: String,
      assignee: String
});

const TodoList = module.exports = mongoose.model('todo', TodolistSchema, 'todo');

module.exports.getAllLists = (callback) => {
    TodoList.find(callback);
}

//newList.save is used to insert the document into MongoDB
module.exports.addList = (newList, callback) => {
    TodoList.save(callback);
}

//Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteListById = (id, callback) => {
    let query = {_id: id};
    TodoList.remove(query, callback);
}

/**
 * db.todo.insertOne(
{    task: {
            name: 'Excersise'
            , description: 'Excerise is healthy habit'
            , creationDate: new Date()
            , targetDate: new Date()
            , status: 'NOT_STARTED'
            , comments: 'Planning to start today'

          },
          creator: 'Admin',
          assignee: 'Admin'
		  }
		  
		  )
 */