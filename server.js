/**
 * Description: Loads the app server using express
 */

 const express = require('express');
 const app = express();

 function msg(msg){
    console.log(msg);
}

app.get("/",(req,res) =>{
    msg("Responding to root route")
    res.send("Hello")
})

 app.listen(3000,() =>{
     msg("Server is up and Listening on 3000");
 })

 