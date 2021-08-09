const { Client } = require("discord.js");
const { config } = require("dotenv");

// Declares our bot,
// the disableEveryone prevents the client to ping @everyone
const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env",
    prefix: '!'
})

// When the bot's online, what's in these brackets will be executed
client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    // Set the user presence
    client.user.setPresence({
        status: "online",
        game: {
            name: "me getting developed",
            type: "WATCHING"
        }
    }); 
})

// When a message comes in, what's in these brackets will be executed
client.on("message", async message => {
    
    if(message.author.bot) return;
    if(message.content.startsWith('!')){
        console.log(`${message.author.tag} (${message.author.username}) typed in command: ${message.content}`);
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(config.prefix)
            .split(/\s+/);
            const cmdlen = CMD_NAME.length;
            //console.log(CMD_NAME);
            console.log(CMD_NAME.substring(0,1));
            console.log(CMD_NAME.substring(1,cmdlen));
            const command = CMD_NAME.substring(1,cmdlen);
            //console.log(args);
        if(command === "say") {
            // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
            // To get the "message" itself we join the `args` back into a string with spaces: 
            const sayMessage = args.join(" ");
            // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
            message.delete().catch(O_o=>{}); 
            // And we get the bot to say the thing: 
            message.channel.send(sayMessage);
        }
        else if (command === "joke") {
            //
        }
        else if (command === "hello") {
            console.log('inside the ! command ifs');
            message.reply('hello there!');
        }
        else if (command == "ping") {
            const m = await message.channel.send("Ping?");
            m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
        }

    }
    console.log(`${message.author.tag} (${message.author.username}) said: ${message.content}`);
    /*let strcmd = message.content.replace('!','');
    if(strcmd === 'hello') {
        message.reply('hello there!');
    }*/
    
});

// Login the bot
client.login(process.env.TOKEN);
