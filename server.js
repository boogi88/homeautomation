// http://nodejs.org/api.html#_child_processes
var sys = require('sys');
var http = require("http");
var exec = require("child_process").exec;
var server = http.createServer(function(request, response) {
	if(request.url==="/api/getdistance"){
exec("python ultra.py", function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
response.writeHead(200, { 'Content-Type': 'application/json'});
response.end("{currentDistance:"+stdout+"}");


});
	}
var URLParams = request.url.split("/");
console.log(URLParams[3]);
	if(URLParams[3]==="on"){
exec("python relayOn.py "+URLParams[4], function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
response.writeHead(200, { 'Content-Type': 'application/json'});
response.end("{device:"+URLParams[4]+",status:'on'}");


});		
	}
if(URLParams[3]==="off"){
exec("python relayOff.py "+URLParams[4], function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
response.writeHead(200, { 'Content-Type': 'application/json'});
response.end("{device:"+URLParams[4]+"},status:'off'");


});		
	}
if(request.url==="*"){
}
});

server.listen(80);
console.log("Server is listening");