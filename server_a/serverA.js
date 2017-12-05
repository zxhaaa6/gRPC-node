var PROTO_PATH = __dirname + '/../route.proto';

var grpc = require('grpc');
var protobuf = grpc.load(PROTO_PATH).helloworld;


function sayHello(call, callback) {
    console.log('server A received a call from ' + call.request.name);
    callback(null, { message: 'Hello ' + call.request.name });
}

function main() {
    var server = new grpc.Server();
    server.addService(protobuf.Greeter.service, { SayHelloA: sayHello });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log("server A start at localhost:50051");
}

main();