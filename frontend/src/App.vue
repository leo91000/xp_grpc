<script setup lang="ts">
import { ref } from 'vue';
import { GreeterClient, HelloRequest } from './grpc/helloworld';

const helloWorldService = new GreeterClient('http://localhost:50051',);

const latestSayHello = ref('');
async function sayHello() {
  try {

  const helloResponse = await helloWorldService.SayHello(
    new HelloRequest({ name: 'Vue 3' }),
    null
  );
  latestSayHello.value = helloResponse.message;
  } catch (e) {
    console.error(e, {
      // @ts-ignore
      ...e,
    })
  }
}
</script>

<template>
  <div>
    <button @click="sayHello">
      Say hello
    </button>

    {{ latestSayHello }}
  </div>
</template>
