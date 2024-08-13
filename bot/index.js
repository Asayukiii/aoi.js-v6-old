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
        $if[true;
            $let[url;https://jsonplaceholder.typicode.com/todos/1]
            $httpGet[$get[url]]
            $log[[aoi.js\\] - $packageVersion :: Testing http -> $environment[res;userId]]
        ]
        $log[[aoi.js\\] - $packageVersion :: $username[$clientID] is connected to the gateway.]
    `,
});

client.commands.load(join("bot", "commands"));

client.addEvent("onMessage");

client.login();
