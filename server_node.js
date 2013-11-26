#!/usr/bin/env node
var net = require('net');
var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var moveSpeed = 0.2;
var rotSpeed = 0.2;

var server = net.createServer(function(socket) { //'connection' listener
  console.log('server connected');
  socket.on('connection',function(socket){
        console.log('socket connection...');
    });

  socket.on('data',function(message){
      console.log('socket message:'+message+'\n');

    switch(message.toString()){
      case 't': console.log('TAKE OFF'+'\n');
		client.takeoff();
                break;
      case 'l': process.stdout.write('LAND'+'\n');
		client.land();
                break;
      case 'w': process.stdout.write('FORWARD'+'\n');
		client.front(moveSpeed);
                break;
      case 's': process.stdout.write('BACKWARD'+'\n');
		client.back(moveSpeed);
                break;
      case 'a': process.stdout.write('LEFT'+'\n');
		client.left(moveSpeed);
                break;
      case 'd': process.stdout.write('RIGHT'+'\n');
		client.right(moveSpeed);
                break;
      case 'h': process.stdout.write('CounterClockWise'+'\n');
		client.counterClockwise(rotSpeed);
                break;
      case 'k': process.stdout.write('ClockWise'+'\n');
		client.clockwise(rotSpeed);
                break;
      case 'u': process.stdout.write('UP'+'\n');
		client.up(moveSpeed);
                break;
      case 'j': process.stdout.write('DOWN'+'\n');
		client.down(moveSpeed);
                break;
      case ' ': process.stdout.write('STOP'+'\n');
		client.stop();
                break;
      default: console.log('Nothing Received, message is:\"' +message+ '\"\n');
    }  
  });

  socket.on('end', function() {
    console.log('server disconnected');
  });
});

server.listen(8888, function() { //'listening' listener
 
  console.log('server bound');
});



