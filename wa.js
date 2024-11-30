import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    if (msg.body == 'Hallo') {
        msg.reply('Hallo my name is Kibo');
    }
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
    if (msg.body.startsWith('!echo ')) {
        // Replies with the same message
        msg.reply(msg.body.slice(6));
    }
   if (msg.body === '!mediainfo' && msg.hasMedia) {
      //  msg.reply(“I am sorry. I am just answering a text based chat.”);
        const attachmentData = await msg.downloadMedia();
        msg.reply(`
            *Media info*
            MimeType: ${attachmentData.mimetype}
            Filename: ${attachmentData.filename}
            Data (length): ${attachmentData.data.length}
        `);
   }

});

client.initialize();