const { resolve } = import('path');



 class Data{
    constructor(students,courses){
        this.students=students;
        this.courses=courses;
    }
}


var dataCollection=null;



 exports.initilize= function (){
    return new Promise((resolve, reject) => {
    const fs=require('fs')
   
    //reading courses json
    var studentData = () => JSON.parse(fs.readFileSync("Data\\students.json", "UTF8"));
    var CourseData = () => JSON.parse(fs.readFileSync("Data\\courses.json", "UTF8"));
    dataCollection=new Data(studentData(),CourseData())
    resolve;
})
    
}

//CRA

 exports.getAllStudents = function(){
    return new Promise((resolve, reject) => {
    if (dataCollection.length === 0) {
        reject("no results returned");
    }else{
        resolve(dataCollection.students)
    }
})
}

 exports.getAs = function(){
    return new Promise((resolve, reject) => {
        
        if (dataCollection.length != 0) {
            var TAobj=[];
            for (let i = 0; i < dataCollection.students.length; i++) {
                if(dataCollection.students[i]["TA"]===true){
                    TAobj.push(dataCollection.students[i])
                }
              }
              resolve(TAobj)

        } else {
        reject(new Error("Failed to fetch data"));
        }
})
}

 exports.getCOurses = function (){
    return new Promise((resolve, reject) => {
    if (dataCollection.length === 0) {
        reject("no results returned");
    }else{
        resolve(dataCollection.courses)
    }
})
}

module.exports.getStudentByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var foundStudent = null;

        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].studentNum == num) {
                foundStudent = dataCollection.students[i];
            }
        }

        if (!foundStudent) {
            reject("query returned 0 results"); return;
        }

        resolve(foundStudent);
    });
};


module.exports.getStudentsByCourse = function (course) {
    return new Promise(function (resolve, reject) {
        var filteredStudents = [];

        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].course == course) {
                filteredStudents.push(dataCollection.students[i]);
            }
        }

        if (filteredStudents.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(filteredStudents);
    });
};



module.exports.addStudents = function(studentData){
    return new Promise(function (resolve, reject) {
    studentData.TA = studentData.TA === undefined ? false : true;

    var studentNum = dataCollection.students.length + 1;
    studentData.studentNum = studentNum;

    dataCollection.students.push(studentData);

    resolve(dataCollection);
    });

}

