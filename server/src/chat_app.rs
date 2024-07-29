use std::sync::Arc;

use chat_service_server::ChatService;
use chat_service_server::ChatServiceServer;
use tokio::sync::mpsc;
use tokio::sync::Mutex;
use tokio_stream::wrappers::ReceiverStream;
use tonic::{Request, Response, Status};
use tracing::info;

tonic::include_proto!("chatapp");

#[derive(Default)]
pub struct ChatApp {
    history: Arc<Mutex<Vec<ChatMessage>>>,
    subscribers: Arc<Mutex<Vec<mpsc::Sender<Result<ChatMessage, Status>>>>>,
}

impl ChatApp {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn server() -> ChatServiceServer<ChatApp> {
        ChatServiceServer::new(Self::new())
    }
}

#[tonic::async_trait]
impl ChatService for ChatApp {
    type StreamMessagesStream = ReceiverStream<Result<ChatMessage, Status>>;

    async fn send_message(
        &self,
        request: Request<ChatMessage>,
    ) -> Result<Response<ChatMessage>, Status> {
        info!("New message: {:?}", request);
        let mut history = self.history.lock().await;
        let message = request.into_inner();
        history.push(message.clone());

        // Notify all subscribers
        let subscribers = self.subscribers.lock().await;
        for tx in subscribers.iter() {
            tx.send(Ok(message.clone())).await.unwrap();
        }

        Ok(Response::new(message))
    }

    async fn get_chat_history(
        &self,
        _request: Request<()>,
    ) -> Result<Response<ChatHistory>, Status> {
        let history = self.history.lock().await;
        Ok(Response::new(ChatHistory {
            messages: history.clone(),
        }))
    }

    async fn stream_messages(
        &self,
        _request: Request<()>,
    ) -> Result<Response<Self::StreamMessagesStream>, Status> {
        let (tx, rx) = mpsc::channel(4);
        self.subscribers.lock().await.push(tx);

        Ok(Response::new(ReceiverStream::new(rx)))
    }
}
