const connection = require('../Database/connection');

class Database {
  // con = new connection.Connection().getConnection();
  // flag=false;

  constructor() {
    this.con = new connection.Connection().getConnection();
    this.flag = false;
    this.fetchRows=[];
    this.con.connect(err => {
      if (err) console.log(err);
      console.log('connected');
    });
  }


  //app.post
  insertQuery(query) {
    this.con.query(query,(err,rows,fields)=>{
        if(err) console.log(err);
        this.flag=true;
    })
    return this.flag;
  }

  //app.post
  updateQuery(query) {
    this.con.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      this.flag = true;
    });
    return this.flag;
  }
  
  //app.get
  selectQuery(query, req,res) {
    //let fetchRows=null;
    this.con.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      res.send(rows)
      //copy row elements
      rows.map((data)=>this.fetchRows.push(data));
    });
    //console.log(this.fetchRows);
    return this.fetchRows;
  }
}

module.exports={Database};
