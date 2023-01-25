require('dotenv').config();

const express = require('express');
const app = express();
const {Client,GatewayIntentBits} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const {Configuration, OpenAIApi} = require('openai');
const configration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
});

const openai = new OpenAIApi(configration);

client.on('messageCreate',async function (message) {
    try{
        if(message.channel.id !== "1067001774059298846") return;
        if(message.author.bot) return;
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:`ChatGPT is a friendy chatbot.\n\
            ChatGPT: Hello how are you?\n\
            ${message.author.username}:${message.content}\n\
        ChatGPT:}`,
            temperature:0.9,
            max_tokens:100,
            stop:["ChatGPT","Adian Twarog:"]
        });
        console.log(gptResponse.data.choices);
        message.reply(`${gptResponse.data.choices[0].text}`);
    }catch(error){
        console.log(error)
    }
});

client.login(process.env.DISCORD_TOKEN);


app.listen(8999, () => {
  console.log("ChatGPT Bot is Online On Discord");
})
