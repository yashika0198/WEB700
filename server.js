const cd = require('./modules/collegedata.js');
var express = require("express");
var app = express();
app.use(express.static('public'))
var HTTP_PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});
app.get("/about", (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});
app.get("/htmlDemo", (req, res) => {
    res.sendFile(__dirname + '/views/htmlDemo.html');
});
app.get("/addStudent", (req, res) => {
    res.sendFile(__dirname + '/views/addStudent.html');
});
app.get("/students/add",(req,res)=>{
    var course=req.query.course
    if (typeof course !== 'undefined') {
        cd.getStudentsByCourse(course).then(studentData => {
            res.send(studentData);
          });
      } else {
        cd.getAllStudents().then(studentData => {
            res.send(studentData);
          });
        }
});

app.post('/addStudent',  (req, res) => {
    cd.addStudent(req.body).then(studentData => {
        res.redirect('/students');
      });
});

app.get("/tas",(req,res)=>{
    cd.getAs().then(taData => {
        res.send(taData);
      });
});

app.get("/courses",(req,res)=>{
    cd.getCourses().then(courseData => {
        res.send(courseData);
      });
});

app.get("/student/:num",(req,res)=>{
    var num = req.params.num;
    var numValue = parseInt(num);
    cd.getStudentByNum(numValue).then(studentData => {
        res.send(studentData);
      });
  
});
app.get('*', function(req, res){
    res.status(404).send('PAGE NOT FOUND!!!!');
});

app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)
cd.initilize()
});
