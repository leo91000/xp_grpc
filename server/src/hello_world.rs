tonic::include_proto!("helloworld");

use greeter_server::{Greeter, GreeterServer};
use tonic::{Request, Response, Status};
use tracing::info;

#[derive(Debug, Default)]
pub struct MyGreeter {}

impl MyGreeter {
    pub fn server() -> GreeterServer<Self> {
        GreeterServer::new(Self::default())
    }
}

#[tonic::async_trait]
impl Greeter for MyGreeter {
    async fn say_hello(
        &self,
        request: Request<HelloRequest>,
    ) -> Result<Response<HelloReply>, Status> {
        info!("Got a request: {:?}", request);

        let reply = HelloReply {
            message: format!("Hello {}!", request.into_inner().name),
        };

        Ok(Response::new(reply))
    }
}
