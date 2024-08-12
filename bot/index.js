var { AoiClient } = require("../dist");
var { join } = require("path");

var client = new AoiClient({
    insensitive: true,
    intents: ["Guilds", "GuildMessages", "MessageContent"],
    plugins: [
        require("./functions/onlyForIDs")
    ],
    prefix: ["."],
    reverse: false,
    token: process.env.TOKEN,
    units: [],
});

client.commands.add("readyCommand", {
    name: "uwu",
    code: `
        $log[Hello world!]
    `,
});

client.commands.load(join("bot", "commands"));

client.addEvent("onMessage");

client.login();
