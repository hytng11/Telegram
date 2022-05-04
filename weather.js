//Min_kr_bot
//npm install telebot

const TeleBot = require('telebot');
const request = require('request');
const bot = new TeleBot({
  token: '{$TeleBot API_KEY}',
  usePlugins: ['askUser', 'commandButton'],
});

bot.start();

bot.on('/weather', (msg) => {
  const id = msg.from.id;
  return bot.sendMessage(id, 'Input your city', { ask: 'weather' });
});

bot.on('ask.weather', (msg) => {
  const city = msg.text;
  const id = msg.from.id;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={$OpenWeather_API_KEY}`;
  request(url, function (err, response, body) {
    try {
      const data = JSON.parse(body);
      const temperature = (data.main.temp - 273.15).toFixed(1);
      return bot.sendMessage(id, `${temperature} degree`);
    } catch (err) {
      throw bot.sendMessage(id, 'error');
    }
  });
});
