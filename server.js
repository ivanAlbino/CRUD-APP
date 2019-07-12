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

connection.connect((err)=>{
    if(err)
        throw err;
    msg('Connected to Database')
})

//Retrieve all items from the Inventory database
app.get("/items",(req,res) =>{
    connection.query("SELECT * FROM items", (err,rows,fields)=>{
        if(err)
            throw err
        msg("Fetched items successfully")
        res.json(rows)
    })

})

//Retrieve an Item based on the id
app.get("/items/:id",(req,res) =>{
    connection.query("SELECT FROM items WHERE id =?",[req.params.id], (err,rows,fields)=>{
        if(err)
            throw err
        msg("Fetched item ID no. " +req.params.id + " successfully")
        res.json(rows)
    })

})

//Delete an Item based on the id
app.delete("/items/:id",(req,res) =>{
    connection.query("DELETE FROM items WHERE id =?",[req.params.id], (err,rows,fields)=>{
        if(err)
            throw err
        msg("Deleted item ID no. " +req.params.id + " successfully")
        res.json(rows)
    })

})


 app.listen(3000,() =>{
     msg("Server is up and Listening on 3000");
 })

 