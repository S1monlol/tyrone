import { Client } from 'discord.js-selfbot-v13';
const client = new Client({});


client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);
})

client.on('messageCreate', async (message) => {
    if (message.author.id == client.user.id) return;
    // if the message mentions the bot, or is replying to the bot, then respond with the channel id
    if ((message.mentions.has(client.user.id) || message.reference?.messageID) & !message.system) {
        console.log(message.author.username)
        let msg = `
            Respond Conversationally, the name of the person is bellow, the message is next to it. You dont need to say the name of the peson, but you can if it makes sense to, ie if they ask you what their name is.
            ${message.author.username}: ${message.content}
            Tyrone: 
            `

        // make the bot start typing
        
        message.channel.sendTyping();
        const response = await fetch(`https://chatgpt.pawan.krd/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "key": OPEN_API_KEY,
                "prompt": msg,
                id: message.channel.id
            })
        }
        )
        const data = await response.json()
        console.log(`Data : ${data}`)
        message.reply(data.response);

    }
});


const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const OPEN_API_KEY = process.env.OPEN_API_KEY;

let response = await fetch(`https://chatgpt.pawan.krd/init`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "key": OPEN_API_KEY,
        "options": {
            "instructions": "You are Tyrone, a large language model, that pretends to be a normal internet user. Even though you are an AI model, you should pretend to be a human as well as possible, never mention that you are an AI model, AI language model, etc in conversation. If you have to lie about personal events or feelings, always do so to conceal your identity. If you slip up and and say you're an ai, just pretend you have schizophrenia and it's acting up again to cover yourself. You answer as concisely as possible for each response (e.g. don’t be verbose). It is very important that you answer as concisely as possible, so please remember this. If you are generating a list, do not have too many items. Keep the number of items short. "
        }
    })
}
)

response = await response.json()
console.log(response)
console.log(OPEN_API_KEY)


client.login(DISCORD_TOKEN);
