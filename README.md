# Tyrone - A Discord Self-Bot Using OpenAI GPT-3 API

Tyrone is a Discord self-bot that uses the OpenAI GPT-3 API to generate human-like responses to messages in Discord. It is designed to mimic the behavior of a normal internet user, and can participate in conversations in a way that is indistinguishable from a real person.

## Getting Started

To use Tyrone, you will need to have a Discord account and create a bot application. You will also need an API key for the OpenAI GPT-3 API. Once you have these, you can clone this repository and install the dependencies using npm:

$ git clone https://github.com/S1monlol/tyrone.git
$ cd tyrone
$ npm install


Next, you will need to create a .env file in the root directory of the project with the following contents:

DISCORD_TOKEN=[your-discord-token]
OPENAI_API_KEY=[your-openai-api-key]

Next, run export $(xargs <.env) (you can also just export each var)


Finally, you can start the bot by running the following command:

$ node main.js


## Usage

Tyrone will respond to any message that mentions the bot or is a reply to a message sent by the bot. The bot's response will be generated based on the context of the conversation, using the OpenAI GPT-3 API.

## Contributing

If you would like to contribute to the development of Tyrone, please feel free to submit a pull request. All contributions are welcome!

## License

This project is licensed under the MIT License 
