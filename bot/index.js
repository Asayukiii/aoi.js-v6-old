var { AoiClient } = require("../dist");

var client = new AoiClient({
    insensitive: true,
    intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent"
    ],
    plugins: [],
    prefix: ["."],
    reverse: false,
    token: process.env.TOKEN,
    units: []
});

client.addCommand({
    name: "uwu",
    type: "readyCommand",
    code: `
        $log[Hello world!]
    `
});

client.login();