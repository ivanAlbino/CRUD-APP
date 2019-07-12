/**
 * Description: Loads the app server using express
 */

 const express = require('express')
 const app = express()
 const mysql = require('mysql')

 function msg(msg){
    console.log(msg)
}

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'AB12',
    database: 'inventory'
})

connection.connect()

//Retrieve all items
app.get("/items",(req,res) =>{

    connection.query("SELECT * FROM items", (err,rows,fields)=>{
        msg("Fetched users successfully")
        res.json(rows)
    })

})

 app.listen(3000,() =>{
     msg("Server is up and Listening on 3000");
 })

 