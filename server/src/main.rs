mod chat_app;
mod hello_world;

use chat_app::ChatApp;
use tonic::transport::Server;

use hello_world::MyGreeter;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let tracing_fmt_layer = tracing_subscriber::fmt::layer();
    let tracing_filter_layer = tracing_subscriber::filter::LevelFilter::DEBUG;
    tracing_subscriber::registry()
        .with(tracing_fmt_layer)
        .with(tracing_filter_layer)
        .init();

    let addr = "[::1]:50051".parse()?;

    Server::builder()
        .accept_http1(true)
        .add_service(tonic_web::enable(MyGreeter::server()))
        .add_service(tonic_web::enable(ChatApp::server()))
        .serve(addr)
        .await?;

    Ok(())
}
