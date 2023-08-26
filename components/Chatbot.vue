<template>
  <div>
    <p>Chatbot coming soon</p>

    <div>
      <input v-model="message">
      <button @click="sendMessage">Send</button>
      <div>{{ data }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'; // Import ref from Vue

export default {
  setup() {
    const { chatCompletion } = useChatgpt();

    const data = ref('');
    const message = ref('');

    async function sendMessage() {
      const response = await chatCompletion(message.value, 'gpt-3.5-turbo-0301');
      data.value = response;
    }

    // Return any properties or methods that you want to use in the template
    return {
      message,
      sendMessage,
      data
    };
  }
};
</script>
