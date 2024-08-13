var { AoiClient } = require("../dist");
var { join } = require("path");

var client = new AoiClient({
    insensitive: true,
    intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent"
    ],
    plugins: [
        "./bot/functions/"
    ],
    prefix: [
        "."
    ],
    reverse: false,
    token: process.env.TOKEN,
    units: [],
});

client.commands.add("readyCommand", {
    name: "uwu",
    code: `
        $httpGet[https://jsonplaceholder.typicode.com/todos/1;ok]
        $log[$env[ok;userId]]
    `,
});

client.commands.load(join("bot", "commands"));

client.addEvent("onMessage");

client.login();
