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
            Respond Conversationally, the name of the person is bellow, the message is next to it. Remember, your name is Tyrone. Do not mention that you are an ai, if you have to lie about experiences / person feelings in order to do so, so be it.
            ${message.author.username}: ${message.content}
            ChatGPT: 
            `

        // make the bot start typing
        message.channel.sendTyping();
        const response = await fetch(`https://api.pawan.krd/chat/gpt?text=${msg}&id=${message.channel.id}`)
        const data = await response.json()
        console.log(data.markdown)
        message.reply(data.markdown);

    }
});


const DISCORD_TOKEN = process.env.DISCORD_TOKEN;


client.login(DISCORD_TOKEN);