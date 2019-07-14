/**
 * Author: Ivan Albino
 * Description: An application that Creates, Retrieves, Update and Delete data in a database.
 * References: https://www.youtube.com/watch?v=4fWWn2Pe2Mk , https://youtu.be/F7NVpxxmmgM?list=PL0dzCUj1L5JE4w_OctDGyZOhML6OtJSqR , 
 * http://www.mysqltutorial.org/getting-started-with-mysql-stored-procedures.aspx , https://www.edureka.co/blog/node-js-mysql-tutorial/
 * Tools used: VisualCode code editor used, MySQL workbench for creating the database and the items table, Postman for testing the routes, and GitHub for the repository.
 * Date Created: July 12, 2019 
 */

 /** Importing the necessary packages */
const express = require('express'); //express js Web Framework.
const mysql = require('mysql');  //mySQL database
const bodyparser = require('body-parser'); //body-parser that converts POST data into the request body

const app = express(); //Instatiate the express framework
app.use(bodyparser.json());

/**A function to print a string message to the console */
function msg(msg){
    console.log(msg);
}

/**Setting up the database connection */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'AB12',
    database: 'inventory',
    multipleStatements: true
});

/**Connect to the database */
connection.connect((err)=>{
    if(err)
        throw err;
    msg('Connected to Database');
});

/**CREATE or INSERT an Item based on the json file.*/
app.post("/items",(req,res) =>{
    let itm = req.body;
    var sql = "SET @id = ?; SET @name = ?; SET @qty = ?; SET @amount =?; CALL AddorEditItems(@id, @name,@qty,@amount);";
    connection.query(sql,[itm.id,itm.name,itm.qty,itm.amount],(err,rows,fields)=>{
        if(err)
            throw err;
        else
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('New Item ID: ' + element[0].id + ' Name: ' + itm.name);
            });       
    });
});

/**Retrieve all items from the Inventory database*/
app.get("/items",(req,res) =>{
    connection.query("SELECT * FROM items", (err,rows,fields)=>{
        if(err)
            throw err;
        msg("Fetched items successfully");
        res.json(rows);
    });

});

/* *Retrieve an item based on the ID from the Inventory database*/
app.get("/items/:id",(req,res) =>{
    connection.query("SELECT * FROM items WHERE id =?",req.params.id, (err,rows,fields)=>{
        if(err)
            throw err;
        msg("Fetched item ID no. " +req.params.id + " successfully");
        res.json(rows);
    });
});


/**Update an Item based on the json file */
app.put("/items",(req,res) =>{
    let itm = req.body;
    var sql = "SET @id = ?; SET @name = ?; SET @qty = ?; SET @amount =?; CALL AddorEditItems(@id, @name,@qty,@amount);";
    connection.query(sql,[itm.id,itm.name,itm.qty,itm.amount],(err,rows,fields)=>{
        if(err)
            msg(err);
        else
            res.send("Updated item "+itm.name+" successfully");         
    });
});

/**Delete an Item based on the id */
app.delete("/items/:id",(req,res) =>{
    connection.query("DELETE FROM items WHERE id =?",[req.params.id], (err,rows,fields)=>{
        if(err)
            throw err;
        msg("Deleted item successfully");
        res.json(rows);
    });

});

/**Make the server listen to Port 3000 */
 app.listen(3000,() =>{
     msg("Server is up and Listening on 3000");
 });

 