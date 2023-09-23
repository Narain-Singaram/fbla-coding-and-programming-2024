<template>
  <div>
    <div v-for="message in chatMessages" :key="message.id">
      <div v-if="message.isUser" class="user-message">{{ message.content }}</div>
      <div v-else class="bot-message">{{ message.content }}</div>
    </div>
    <div class="input-container">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
      />
      <button @click="sendMessage">Boom</button>
    </div>
  </div>
</template>

<script>
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

export default {
  data() {
    return {
      chatMessages: [],
      userInput: "",
    };
  },
  methods: {
  async sendMessage() {
    if (this.userInput.trim() === "") return;
  
    this.chatMessages.push({
      id: Date.now(),
      content: this.userInput,
      isUser: true,
    });
  
    const result = await this.generateBotResponse(this.userInput); // Add await here
  
    this.chatMessages.push({
      id: Date.now(),
      content: result.content,
      isUser: false,
    });
  
    this.userInput = "";
  }
      
const context = "You are an AI Assistant that helps provide information for users in the following app prompt:\n\n\" a program that allows your school’s Career and Technical Education Department to\ncollect and store information about local business and community partners. This program\nshould include information on at least 25 different partners, with details such as, but not\nlimited to, type of organization, resources available, and direct contact information for an\nindividual. The program should enable users to search and filter the information as needed.\"\n\nSo, you should provide any information that the user queries for but make sure it relates to the idea of the app";
      const examples = [];
      const messages = [{ content: userInput }];

      const response = await client.generateMessage({
        model: MODEL_NAME,
        temperature: 0.25,
        candidateCount: 1,
        top_k: 40,
        top_p: 0.95,
        prompt: {
          context: context,
          examples: examples,
          messages: messages,
        },
      });

      return response.result.messages[0];
    },
  },
};
</script>

<style scoped>
/* Add your CSS styles for the chat interface here */
</style>
