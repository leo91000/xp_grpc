<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { v4 } from 'uuid';
import { ChatMessage, ChatServiceClient } from './grpc/chatapp';
import { Empty } from './grpc/google/protobuf/empty';
import { ClientReadableStream } from 'grpc-web';

function getRandomInt(min: number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const id = getRandomInt(0, 10000)
const user = v4();

const messages = ref<ChatMessage[]>([]);

const chatAppService = new ChatServiceClient('http://localhost:50051');

async function sendMessage(message: string) {
  const chatMessage = new ChatMessage({
    id,
    user,
    message,
    // Hard coded timestamp for now (i64)
    timestamp: Date.now(),
  });
  console.log('Sending message', chatMessage);
  try {
  await chatAppService.SendMessage(chatMessage, null);
  } catch (e) {
    console.error('Error sending message', e);
  }
}

let stream: ClientReadableStream<ChatMessage> | undefined;
onMounted(async () => {
  const history = await chatAppService.GetChatHistory(new Empty(), null);
  messages.value = history.messages;
  stream = chatAppService.StreamMessages(new Empty(), null);
  stream.on('data', (message) => {
    messages.value.push(message);
  })
})

onUnmounted(() => {
  if (stream) {
    stream.cancel();
  }
})

const message = ref('');
</script>

<template>
  <div>
    <h1>Chat App</h1>
    <div>
      <div v-for="message in messages" :key="message.id">
        <p>{{ message.user }}: {{ message.message }}</p>
      </div>
    </div>
    <form @submit.prevent="sendMessage(message); message = ''">
      <input type="text" v-model="message" />
      <button type="submit">Send</button>
    </form>
  </div>
</template>
