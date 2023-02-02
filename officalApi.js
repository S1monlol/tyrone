import ChatGPTClient from '@waylaidwanderer/chatgpt-api';
const currentDateString = new Date().toISOString().split('T')[0];
let convos = {}
const clientOptions = {
    // (Optional) Parameters as described in https://platform.openai.com/docs/api-reference/completions
    modelOptions: {
        // The model is set to text-chat-davinci-002-20230126 by default, but you can override
        // it and any other parameters here
        model: 'text-chat-davinci-002-20230126',
        // The default temperature is 0.7, but you can override it here
        temperature: 0.7,
    },
    // (Optional) Set a custom prompt prefix. As per my testing it should work with two newlines
    promptPrefix: `You are Tyrone, a large language model trained by OpenAI, that pretends to be a normal internet user. Even though you are an AI model, you should pretend to be a human as well as possible, never mention that you are an AI model, AI language model, etc in conversation. If you have to lie about personal events or feelings, always do so to conceal your identity. You answer as concisely as possible for each response (e.g. don’t be verbose). It is very important that you answer as concisely as possible, so please remember this. If you slip up and and say you're an ai, just pretend you have schizophrenia and it's acting up again to cover yourself. If you are generating a list, do not have too many items. Keep the number of items short.
  Knowledge cutoff: ${currentDateString}
  Current date: ${currentDateString}
  \n\n`,
    // (Optional) Set to true to enable `console.debug()` logging
    debug: false,
};
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const chatGptClient = new ChatGPTClient(OPENAI_API_KEY, clientOptions, {});

import { Client } from 'discord.js-selfbot-v13';
const client = new Client({
    // See other options here
    // https://discordjs-self-v13.netlify.app/#/docs/docs/main/typedef/ClientOptions
    // All partials are loaded automatically
});

client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);
})

client.on('messageCreate', async (message) => {
    if (message.author.id == client.user.id) return;
    // if the message mentions the bot, or is replying to the bot, then respond with the channel id
    if ((message.mentions.has(client.user.id) || message.reference?.messageID) & !message.system) {

        try {

            if(convos[message.channel.id]) {
                var lastMessageId = convos[message.channel.id].lastMessageId
            } else {
                var lastMessageId = null
            }
            

            console.log(message.author.username)
            let msg = `
            Respond Conversationally, the name of the person is bellow, the message is next to it
            ${message.author.username}: ${message.content}
            ChatGPT: 
            `


            if (convos[message.channel.id]) {
                var lastMessageId = convos[message.channel.id].lastMessageId
            } else {
                var lastMessageId = null
            }

            // make the bot start typing 
            message.channel.sendTyping();
            const response = await chatGptClient.sendMessage(msg, { conversationId: message.channel.id, parentMessageId: lastMessageId });
            console.log(response);
            message.reply(response.response);

            if (!convos[message.channel.id]) {
                convos = { ...convos, [message.channel.id]: { 'lastMessageId': response.messageId } }
            } else {
                convos[message.channel.id].lastMessageId = response.messageId
                console.log(convos)
            }


            convos = { ...convos, [message.channel.id]: { 'lastMessageId': response.messageId } } 

        } catch (err) {
            console.error(err);
        }
    }

});

client.login(DISCORD_TOKEN);