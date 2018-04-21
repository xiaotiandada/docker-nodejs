const express = require('express')
const app = express()

app.get('/',function(req, res){
    res.send('hello world')
})

app.listen(8081, function(){
    console.log(`app listening on port 8081`)
})