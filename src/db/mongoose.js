const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/note-app', {            // the connection parameter are mentioned here along with database name
    useNewUrlParser: true,
    useCreateIndex: true
})
