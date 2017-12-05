var PROTO_PATH = __dirname + '/../route.proto';

var grpc = require('grpc');
var protobuf = grpc.load(PROTO_PATH).helloworld;


function sayHello(call, callback) {
    console.log('server B received a call from ' + call.request.name);
    callback(null, { message: 'Hello ' + call.request.name });
}

function main() {
    var server = new grpc.Server();
    server.addService(protobuf.Greeter.service, { SayHelloB: sayHello });
    server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log("server B start at localhost:50052");
}

main();