var PROTO_PATH = __dirname + '/../route.proto';

var grpc = require('grpc');
var protobuf = grpc.load(PROTO_PATH).helloworld;

function main() {
    var client = new protobuf.Greeter('localhost:50050', grpc.credentials.createInsecure());
    var user = 'clientA';
    client.SayHelloB({ name: user }, function(err, response) {
        console.log('Greeting:', response.message);
    });
}

main();