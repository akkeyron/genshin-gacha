require('dotenv').config();

module.exports = async function(client, message, emote) {
    // get emote server
    var emote_server = client.guilds.cache.get(process.env.serverID);

    // get webhook object in the message channel
    var webhooks = await message.channel.fetchWebhooks();
    var webhook = webhooks.first();
    if (!webhook) return;

    // find emote id by its name
    let find_emote = emote_server.emojis.cache.find(emoji => emoji.name === emote.toLowerCase());
    if (!find_emote) return;

    // delete message
    message.delete();

    //replace author message with emoji
    if (find_emote.animated) {
        var new_emote = `<a:${emote}:${find_emote.id}>`;
    } else {
        var new_emote = `<:${emote}:${find_emote.id}>`;
    }
    let replace_text = message.content.replace(/:(.*?):/, new_emote);

    // send the message though webhook
    await webhook.send({
        content: replace_text,
        username: message.author.username,
        avatarURL: message.author.avatarURL(),
    })
}