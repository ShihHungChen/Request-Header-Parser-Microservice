const express = require('express')
const app = express()

app.get('/api/whoami', function(req, res){
    var ipaddress = req.headers['x-forwarded-for']
    var language = req.headers['accept-language'].split(';')[0]
    var full_user_agent = req.headers['user-agent']
    
    //extract os from req.headers['user-agent']
    var expression = /\([a-zA-Z\d\s\.\;]+\)/gi
    var software = full_user_agent.match(expression)[0]
    
    res.writeHeader(200,{'Content-Type':'text/plain'})
    res.end(JSON.stringify({ 'ipaddress': ipaddress, 'language': language, 'software': software }))
})

app.get('*',function(req, res){
    res.writeHeader(404,{'Content-Type':'text/plain'})
    res.end('404 error! it is not supported operation')
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})