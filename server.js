const express = require ("express")
const app = express();
const bodyParser = require ("body-parser")

const PORT = process.env.PORT || 3500;


app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")
//render css file

app.use(express.static('public'))

// place holder for task
const task = ['coding', 'learning']

// place for complete

const complete = ['Way to Mosque']

app.post('/addtask', function(req, res) {
    const newTask = req.body.newtask;
  
    if (typeof newTask !== 'string' || newTask.trim() === '') {
      res.status(400).send(<script>alert("Input something");window.location.href = "/";</script>);
    } else {
      task.push(newTask);
      res.redirect('/');
    }
  });


app.post('/removetask', function(req, res) {
    const completeTask = req.body.check;

    //check the "tyeOf the different task then  add it into the complete task"

    if(typeof completeTask === "string") {
        complete.push(completeTask)
        task.splice(task.indexOf(completeTask), 1)

    }else if(typeof completeTask === "object") {
        for(let i = 0; i < completeTask.length; i++)  {
            complete.push(completeTask[i])
            task.splice(task.indexOf(completeTask[i]),1)
        }
    }
    res.redirect("/")
})


//render the ejs and display added task, complete task

app.get('/', function(req, res) {
    res.render('index', {task:task, complete:complete})
})

app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`));