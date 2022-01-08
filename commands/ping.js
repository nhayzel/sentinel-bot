module.exports =
{
    name: 'ping',
    description:  "This is the ping command. The bot will respond with one line of text, confirming it is online.",
    execute(message, args)
    {
        message.channel.send('Pong. Sentinel is online and running.');
    }
}