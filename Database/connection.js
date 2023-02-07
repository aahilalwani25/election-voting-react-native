const mysql = require('mysql');

class Connection{
    config={
            user:"root",
            password:"aahil",
            database:"evoting",
            host:"localhost",
        };

    getConnection(){
        return mysql.createConnection(this.config,(err)=>{
            if(err){
                console.log(err);
            }
        });
        
    }
}

module.exports={Connection};


