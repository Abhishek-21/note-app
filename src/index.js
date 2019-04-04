// path variable is used to change the path to point to specific file as server starts
const path = require('path');
const express = require('express');             
require('./db/mongoose');                           // mongoose is used here to better perform queries 
const NewTask = require('./models/notetasks');      //newNote task model is being imported here

const app = express();                              //express reference is being created here

const port = process.env.PORT || 3000;                          // the port number n which the server will be deployed
const publicDirectoryPath = path.join(__dirname,'../public');   // the public directory path is provided from here

app.use(express.static(publicDirectoryPath));                   

app.listen(port, () => {                                        // server is started from here
    console.log(`Server is up on port ${port}!`);
})
        
app.use(express.json());                                        // the express itself formats the input to JSON formats

app.post('/note',(req,res)=>{                                   // route handler for POST request

    const task = new NewTask(req.body)                          // new task is being created from the reference model
    task.save().then(() => {                                    // save the response into the database
        res.send(task)
    }).catch((e) => {
        res.status(400).send(e);                                  // sending appropriate error code with status
    })
})

app.get('/note',(req,res) => {                                     // setting up new route hanlder for get request 
    NewTask.find({}).then((tasks) => {  
        res.send(tasks)                                             // sending back the response to  calling area
    }).catch((e) => {
        res.status(500).send(e)                                     // sending approrpriate response for error
    })
})

app.delete('/note',(req,res) => {                                   // deleting note request 
    NewTask.deleteOne({_id: req.body._id}).then((tasks) => {        //sending appropriate response 
        res.send(tasks)
    }).catch((e) => { 
    })
})

