const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const cheerio = require("cheerio");
const snekfetch = require("snekfetch");
const querystring = require("querystring");

var youtubeStream = require("youtube-audio-stream");

var getAudio = function (req, res){

}
//Testing

async function YTCommand(message, args) {
  //message.reply("Args before:" + args);
   // These are our two variables. One of them creates a message while we preform a search,
   // the other generates a URL for our crawler.
   let searchMessage = await message.reply('Searching... Sec.');
   let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(args)}`+'+site:www.youtube.com';
   //message.reply("searchUrl:" + searchUrl);
   // We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
   // utilize that for our try/catch block.
   return snekfetch.get(searchUrl).then((result) => {

      // Cheerio lets us parse the HTML on our google result to grab the URL.
      let $ = cheerio.load(result.text);
      message.reply("$:" + $);
      // This is allowing us to grab the URL from within the instance of the page (HTML)
      let googleData = $('.r').first().find('a').first().attr('href');
      message.reply("googleData:" + googleData);
      // Now that we have our data from Google, we can send it to the channel.
      googleData = querystring.parse(googleData.replace('/url?', ''));
      searchMessage.edit(`Result found!\n${googleData.q}`);

  // If no results are found, we catch it and return 'No results are found!'
  }).catch((err) => {
     searchMessage.edit('No results found!');
  });
}

async function GoogleCommand(message, args) {
  //message.reply("Args before:" + args);
   // These are our two variables. One of them creates a message while we preform a search,
   // the other generates a URL for our crawler.
   let searchMessage = await message.reply('Searching... Sec.');
   let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(args)}`;
   //message.reply("searchUrl:" + searchUrl);
   // We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
   // utilize that for our try/catch block.
   return snekfetch.get(searchUrl).then((result) => {

      // Cheerio lets us parse the HTML on our google result to grab the URL.
      let $ = cheerio.load(result.text);

      // This is allowing us to grab the URL from within the instance of the page (HTML)
      let googleData = $('.r').first().find('a').first().attr('href');

      // Now that we have our data from Google, we can send it to the channel.
      googleData = querystring.parse(googleData.replace('/url?', ''));
      searchMessage.edit(`Result found!\n${googleData.q}`);

  // If no results are found, we catch it and return 'No results are found!'
  }).catch((err) => {
     searchMessage.edit('No results found!');
  });
}

async function PharmacyCommand(message, args) {
  //message.reply("Args before:" + args);
   // These are our two variables. One of them creates a message while we preform a search,
   // the other generates a URL for our crawler.
   let searchMessage = await message.reply('Searching... Sec.');
   let searchUrl = `https://www.google.com/search?q=goodrx+${encodeURIComponent(args)}`;
   //message.reply("searchUrl:" + searchUrl);
   // We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
   // utilize that for our try/catch block.
   return snekfetch.get(searchUrl).then((result) => {

      // Cheerio lets us parse the HTML on our google result to grab the URL.
      let $ = cheerio.load(result.text);

      // This is allowing us to grab the URL from within the instance of the page (HTML)
      let googleData = $('.r').first().find('a').first().attr('href');

      // Now that we have our data from Google, we can send it to the channel.
      googleData = querystring.parse(googleData.replace('/url?', ''));
      searchMessage.edit(`Result found!\n${googleData.q}`);

  // If no results are found, we catch it and return 'No results are found!'
  }).catch((err) => {
     searchMessage.edit('No results found!');
  });
}

async function WikiCommand(message, args) {
  //message.reply("Args before:" + args);
   // These are our two variables. One of them creates a message while we preform a search,
   // the other generates a URL for our crawler.
   let searchMessage = await message.reply('Searching... Sec.');
   let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(args)}`+'+site:www.wikipedia.org';
   //message.reply("searchUrl:" + searchUrl);
   // We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
   // utilize that for our try/catch block.
   return snekfetch.get(searchUrl).then((result) => {

      // Cheerio lets us parse the HTML on our google result to grab the URL.
      let $ = cheerio.load(result.text);

      // This is allowing us to grab the URL from within the instance of the page (HTML)
      let googleData = $('.r').first().find('a').first().attr('href');

      // Now that we have our data from Google, we can send it to the channel.
      googleData = querystring.parse(googleData.replace('/url?', ''));
      searchMessage.edit(`Result found!\n${googleData.q}`);

  // If no results are found, we catch it and return 'No results are found!'
  }).catch((err) => {
     searchMessage.edit('No results found!');
  });
}

client.on("ready", () => {
  console.log("I am ready!");
});



client.on("message", (message) => {
  // Exit and stop if the prefix is not there or if user is a bot
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  var joined1 = "test";
  //const query = args.shift().toLowerCase();

  if (!message.content.startsWith(config.prefix) || message.author.bot) return;// make sure bot doesn't trigger itself
  switch (command){
    case "ping":
      if(message.author.id !== config.ownerID){
        message.channel.send("pong!");
      }
      else {
        message.channel.send("Hey Malsire!");
      }
      break;
      case "foo":
        message.channel.send("bar!");
        break;
      case "join":
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join().then(connection => { // Connection is an instance of VoiceConnection
              message.reply('I have successfully connected to the channel!');
              })
                .catch(console.log);
        } else {
          message.reply('You need to join a voice channel first!');
        }
        break;
      case "leave":
        if (message.member.voiceChannel) {
            message.member.voiceChannel.leave();
        } else {
          message.reply('I was never in a voice channel!');
        }
        break;
      case "play":

        break;
      case "youtube":
        joined1 = args.join([separator = " "])
        YTCommand(message, joined1);
        //message.reply(joined1);
        break;
      case "search":
        joined1 = args.join([separator = " "])
        GoogleCommand(message, joined1);
        //message.reply("Work in progress");
        break;
      case "wiki":
        joined1 = args.join([separator = " "])
        //WikiCommand(message, joined1);
        message.reply("Work in progress");
        break;
      case "gr":
        joined1 = args.join([separator = " "])
        PharmacyCommand(message, joined1);
        //message.reply("Work in progress");
        break;

  }
//  if (message.content.startsWith(config.prefix + "ping")) {
//    if(message.author.id !== config.ownerID){
//      message.channel.send("pong!");
//    }
//    else {
//      message.channel.send("Hey Malsire!");
//    }
//  } else
//  if (message.content.startsWith(config.prefix + "foo")) {
//    message.channel.send("bar!");
//  }
});

client.login(config.token);
