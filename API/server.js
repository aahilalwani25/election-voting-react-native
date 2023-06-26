const connection = require('../Database/connection');
const express = require('express');
const bodyParser = require('body-parser');
const Database = require('../Database/Database');
const network= require("./NetworkConfig");
const app=express();

let con=new connection.Connection().getConnection();
let db=new Database.Database();

con.connect((err)=>{
  if(err) console.log(err);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//for sign up
app.post("/api/user/signup/",(req,res)=>{

    //from body part of axios
    const {cnic, gender,password, fullname, dob,email, phone}=req.body;
    //let check= db.insertQuery(`insert into users() values(${cnic},${gender},${fullname},${dob},${password});`);
    con.query(
        `INSERT into user(Cnic,Name,DOB,Gender,Phone,Password,Email) VALUES(${cnic},'${fullname}','${dob}',${gender},${phone},'${password}','${email}');`,(err,rows,fields)=>{
        if(err) console.log(err);
        res.send(rows);
    })
});


//for login
app.get("/api/users/:cnic/:password",(req,res)=>{

    //fetching cnic and password
    const {cnic, password} = req.params;
    // let data= db.selectQuery(`select u_name,password from user where u_name='${cnic}' and password='${password}'`, req,res);
    con
      .query(`select Cnic,Phone,password from user where Cnic=${cnic} and Password='${password}'`,(err,rows,fields)=>{
        if (err) console.log(err);
        res.send(rows);
      });
});

//for cnic
app.get("/api/user/getcnic/:cnic",(req,res)=>{

    //fetching cnic and password
    const {cnic} = req.params;
    // let data= db.selectQuery(`select u_name,password from user where u_name='${cnic}' and password='${password}'`, req,res);
    con
      .query(`select Cnic from user where Cnic=${cnic}`,(err,rows,fields)=>{
        if (err) console.log(err);
        res.send(rows);
      });
});

//for phone
app.get("/api/user/getphone/:phone",(req,res)=>{

    //fetching cnic and password
    const {phone} = req.params;
    // let data= db.selectQuery(`select u_name,password from user where u_name='${cnic}' and password='${password}'`, req,res);
    con
      .query(`select Phone from user where Phone=${phone}`,(err,rows,fields)=>{
        if (err) console.log(err);
        res.send(rows);
      });
});

//for viewing results (used in componentdidmount and componentdidupdate)
// app.get('/api/voting/:id',(req,res)=>{

//     //count aggregate function used for total votes for any party
//     con.query(`select count(votes) from voting where party_id=${req.params.id};`,(err,rows,fields)=>{
//         if(err) console.log(err);
//         res.send(rows);
//     });
// })


//used to check whether user has voted before or not
app.get('/api/voting/:cnic',(req,res)=>{
    con.query(
      `select party from voting where cnic=${req.params.cnic};`,
      (err, rows, fields) => {
        if (err) console.log(err);
        res.send(rows);
      },
    );
});

//for submitting a vote
app.post('/api/submitVote/',(req,res)=>{
  const {cnic,party}=req.body;
  con.query(
    `insert into voting(Cnic,party) values(${cnic},${party});`,
    (err, rows, fields) => {
      if (err) console.log(err);
      res.send(rows);
    },
  );
})


//get total votes for each party 
app.get('/api/countVotes/:party',(req,res)=>{
  const {party}=req.params;

  con.query(
    `select count(party) from voting where party=${party};`,
    (err, rows, fields) => {
      if (err) console.log(err);
      res.send(rows);
    },
  );
})

//listen port
app.listen(3000,()=>{
    console.log(`port listening on 3000, goto http://${network.address}:3000/api/`);
})