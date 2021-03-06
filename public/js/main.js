    // This is the javascript file which is manipulating all the task with ajax call to each & every requests
    var minimize = document.getElementsByClassName('close');                        // This will strike the note 
    var innerContainer = document.getElementById('inner-container');                // the outer container for the newly generated task pads
    var comContainer = document.getElementById('complementary-container');          // the rotating container 
    var addNote= document.getElementById('addNote');                                // the add note button 
    var messageNote= document.getElementById('messageNote');
    var messageOri= document.getElementById('noteContent');
    let id = [];

        minimize[0].addEventListener("click", function() {                          //changing the revolving circle
            innerContainer.style.display = 'none';
            comContainer.style.display = 'block';
      });

      comContainer.addEventListener("click", function() {                           // changing the revolving circle
        innerContainer.style.display = 'block';
        comContainer.style.display = 'none';
  });

  messageNote.addEventListener("click",function(e) {
        e.preventDefault();
  })
 

    $(document).ready( function() {
        refreshNoteList();
    })

   const refreshNoteList = () => {
    $.ajax({                                                                        // ajax call to fetch data
        type: "GET",                                              
        url: "http://localhost:3000/note",                                                
        success: function(success) {                                                // on successfull fetching of data
            var divContainer2 = document.getElementById('container-2');
            while (divContainer2.firstChild){
                divContainer2.removeChild(divContainer2.firstChild);
            }
            for(var i=0;i<success.length;i++){                                      // making notes for all the notes saved
                var divTaskContainer = document.createElement("DIV");               // the designing of the notes begins from here
                var divTaskHeader = document.createElement("DIV");
                var divTaskMessage = document.createElement("DIV");
                var divTaskFooter = document.createElement("DIV");
                var updatedOn = document.createElement("SPAN");
                var createdOn = document.createElement("SPAN");
                var id = document.createElement("SPAN");
                var edit = document.createElement("SPAN");
                var close = document.createElement("SPAN");
                var deleteBox = document.createElement("SPAN");
                divTaskContainer.className = 'new-task-container';                              // displaying dynamic data into the notes starts from here
                divTaskContainer.id = success[i]._id;
                divTaskHeader.className = 'task-header';
                divTaskMessage.className = 'task-message';
                divTaskFooter.className = 'task-footer';
                divTaskMessage.innerHTML = success[i].message;
                divTaskHeader.appendChild(createdOn);                                         
                divTaskHeader.appendChild(edit);
                divTaskHeader.appendChild(close);
                edit.innerHTML = '<i class="fa fa-edit"></i>';                                  // use of differnt fa fa icons
                close.innerHTML = '<i class="fa fa-close"></i>';
                deleteBox.innerHTML = '<i class="fa fa-trash"></i>';
                updatedOn.innerHTML = 'Updated on: ' + success[i].updated;
                createdOn.innerHTML = 'Edited on: ' + success[i].created;
                createdOn.className = 'created-on';
                updatedOn.className = 'updated-on';
                edit.className = 'box-design-edit';
                close.className = 'box-design';
                deleteBox.className = 'box-delete';
                close.addEventListener('click',(e) => {                                          // soft-delete feature from here
                    if(e.target.className === 'fa fa-close' || e.target.className === 'fa fa-undo'){
                        if(e.target.parentNode.parentNode.parentNode.className.indexOf("soft-delete") === -1) {
                            e.target.parentNode.parentNode.parentNode.className = 'soft-delete new-task-container';
                            e.target.className = 'fa fa-undo';
                        }
                        else {
                            e.target.parentNode.parentNode.parentNode.className = 'new-task-container';
                            e.target.className = 'fa fa-close';
                        }
                    }
                    else {
                        if(e.target.parentNode.parentNode.className.indexOf("soft-delete") === -1) {
                            e.target.parentNode.parentNode.className = 'soft-delete new-task-container';
                            e.target.firstChild.className = 'fa fa-undo';                      
                        }
                        else {
                            e.target.parentNode.parentNode.className = 'new-task-container';
                            e.target.firstChild.className = 'fa fa-close';    
                        }
                    }
                })
                
                edit.addEventListener('click',(e) => {                                          // edit feature of note pads starts here
                    // console.log(e.target.className);
                    if(e.target.className === 'box-design-edit') {
                        innerContainer.style.display = 'block';
                        comContainer.style.display = 'none';
                        document.getElementById('noteContent').value = e.target.parentNode.nextSibling.innerHTML;
                        document.getElementById('noteContent').className = e.target.parentNode.parentNode.id;  
                        addNote.innerHTML = 'Update';                      
                    }
                    else {
                        innerContainer.style.display = 'block';
                        comContainer.style.display = 'none';
                        document.getElementById('noteContent').value = e.target.parentNode.parentNode.nextSibling.innerHTML;
                        document.getElementById('noteContent').className = e.target.parentNode.parentNode.parentNode.id;
                        addNote.innerHTML = 'Update';                                          
                    }
                   
                });

                deleteBox.addEventListener('click',(e) => {
                    if(e.target.className === 'fa fa-trash'){
                        id = e.target.parentNode.parentNode.parentNode.id;
                        let dataString = {
                            _id: id
                        }
                        dataString = JSON.stringify(dataString); 
                        var check = '#'+id;                                               // sending Data in JSON form 
                        $(check).remove();
                        $.ajax({
                            type: "DELETE",                                                          //delete the nodes from ajax request
                            contentType: "application/json",                                              
                            url: "http://localhost:3000/note",             
                            data: dataString,                                    
                            success: function(response) {             
                                }
                        });
                    }
                    else {
                        id = e.target.parentNode.parentNode.id;
                        let dataString = {
                            _id: id
                        }
                        dataString = JSON.stringify(dataString); 
                        var check = '#'+id;
                        $(check).remove();
                        $.ajax({
                            type: "DELETE",                                                          //delete the nodes from ajax request
                            contentType: "application/json",                                              
                            url: "http://localhost:3000/note",             
                            data: dataString,                                    
                            success: function(response) {             
                                }
                        });
                    }
                });

                divContainer2.appendChild(divTaskContainer);
                divTaskContainer.appendChild(divTaskHeader);
                divTaskContainer.appendChild(divTaskMessage);
                divTaskContainer.appendChild(divTaskFooter);
                divTaskFooter.appendChild(updatedOn);
                divTaskFooter.appendChild(deleteBox);

            }              
            
        }
    });

   }
    
        
        addNote.addEventListener('click',function() {                                   // Adding new note from here
        const message = document.getElementById('noteContent').value;
        if(message.trim() === null || message.trim() === '') {                          // message if the iput field insn't blank 
            alert('Enter some description first');
        }
        else if(addNote.innerHTML === 'Update') {
            var id = document.getElementById('noteContent').className;
            console.log(id);
            var day = new Date().getDate();
            var month = new Date().getMonth();
            var year = new Date().getFullYear();
            let dataString = {
                _id: id,
                message,
                updated: day+'-'+month+'-'+year
            }
            dataString = JSON.stringify(dataString);  
            try {
            $.ajax({
                type: "PUT",                                                                   // posting data from ajax request
                contentType: "application/json",                                              
                url: "http://localhost:3000/note",             
                data: dataString,                                    
                success: function(response) {
                    console.log("Form Updated Successfully");               
                    }
                });
            } catch(e) {
                console.log("request error")
            }      
            
            addNote.innerHTML = 'Add';
            messageOri.value = '';                    // reseting the form feild to null
        }
        else{
            var day = new Date().getDate();                                                         // entering the date in proper format
            var month = new Date().getMonth();
            var year = new Date().getFullYear();
            let dataString = {                                                                      // Datastring to be sent to server
                created: day+'-'+month+'-'+year,
                message,
            }
            dataString = JSON.stringify(dataString);        
            $.ajax({
            type: "POST",                                                                             
            contentType: "application/json",                                              
            url: "http://localhost:3000/note",             
            data: dataString,                                    
            success: function(response) {
                console.log(response)
                console.log("Form Submittion Successful");               
                }
            });
            messageOri.value = '';
        }
        refreshNoteList();
    })

    clearNote.addEventListener('click',() => {                                                      // clearing new node
        messageOri.value = '';
    });
    
    
