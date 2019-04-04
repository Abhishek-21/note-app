const mongoose = require('mongoose');           // requiring mongoose module after installing the through npm 
const validator = require('validator');         // validator is downloaded to validate the input


const newTask = mongoose.model('newTask',{       // A model is created to in the way the data will be stored
    message: {
        type: String
    },
    created: {
        type: String
    },
    updated: {
        type: String,
        default: 'not available'
    }
})

module.exports = newTask;