// http://nodejs.org/api.html#_child_processes
var sys = require('sys');
var http = require("http");
var exec = require("child_process").exec;
var path = require("path");
var fs = require("fs");

/*Confs*/
var sensorMiniumDistanceFromWater =17;
var sensorMaximumDistanceFromWater =40;

var server = http.createServer(function(request, response) {
  console.log(request.url);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET');
  response.setHeader('Access-Control-Allow-Headers', '*');
	if(request.url==="/api/getdistance"){
exec("python /home/pi/ultra.py", function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
  stdout = stdout.replace(/(\r\n|\n|\r)/gm,"");
response.writeHead(200, { 'Content-Type': 'application/json'});
response.end("{\"currentDistance\":"+stdout+",\"sensorMaximumDistanceFromWater\":"+sensorMaximumDistanceFromWater+",\"sensorMiniumDistanceFromWater\":"+sensorMiniumDistanceFromWater+"}");


});
	}
var URLParams = request.url.split("/");
console.log(URLParams[3]);
	if(URLParams[3]==="on"){
exec("python /home/pi/relayOn.py "+URLParams[4], function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
response.writeHead(200, { 'Content-Type': 'application/json'});
response.end("{}");


});		
	}
if(URLParams[3]==="off"){
exec("python /home/pi/relayOff.py "+URLParams[4], function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
response.writeHead(200, { 'Content-Type': 'application/json'});
response.end("{}");


});		
	}

if(request.url==="*" || request.url==="/"){
    fs.readFile('/home/pi/control.html', function(error, content) {
    if (error) {
      response.writeHead(500);
      console.log("Unable to read file");
      response.end();
    }
    else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf-8');
    }
  });
}
});

server.listen(80);
console.log("Server is listening");
