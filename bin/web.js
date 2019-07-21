/**
 * Created by lihb on 4/17/17.
 */
var express = require('express')    //加载express模块
var app = express()
var port = process.env.PORT || 3000  //监听的端口
app.use(express.static(__dirname + '/'))
app.use(function (req , res){
    res.sendfile('./index.html')
})

app.listen(port,function(){
    console.log('TechNode is on port' + port + '!' )
})
