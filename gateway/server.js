var PROTO_PATH = __dirname + '/../route.proto';

var grpc = require('grpc');
var protobuf = grpc.load(PROTO_PATH).helloworld;

function getClient(host) {
    return new protobuf.Greeter(host, grpc.credentials.createInsecure());
}

function SayHelloA(call, callback) {
    console.log('gateway transmit a call from ' + call.request.name + ' to localhost:50051');
    var client = getClient('localhost:50051');
    client.SayHelloA(call.request, callback);
}

function SayHelloB(call, callback) {
    console.log('gateway transmit a call from ' + call.request.name + ' to localhost:50052');
    var client = getClient('localhost:50052');
    client.SayHelloB(call.request, callback);
}

function main() {
    var server = new grpc.Server();
    let registMethod = {
        SayHelloA: SayHelloA,
        SayHelloB: SayHelloB
    };
    server.addService(protobuf.Greeter.service, registMethod);
    server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log("gateway start");
}

main();