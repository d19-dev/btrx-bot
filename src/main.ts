/* eslint-disable no-console */
import 'dotenv/config'
import bot from './lib/bot'
import http from './lib/http'

bot.start((context) => {
  // Телеграм может принимать ссылки на бота вида https://t.me/btrxTestBot?start=zRVLl
  // "zRVLl" будет содержаться в переменной startPayload
  const {
    startPayload: payload,
    from: {
      id: telegramId,
      first_name: firstName,
      last_name: lastName,
      username,
    },
  } = context
  // собираем данные для отправки на API
  const data = {
    payload,
    telegramId,
    username,
    firstName,
    lastName,
  }
  // отправляем на API
  try {
    // берём произвольный ендпоинт '/users' и передаём данные
    http.post('/users', data)
  } catch (error) {
    console.error(error)
  }
  context.reply(`Доброе пожаловать, ${firstName}! Я только что слил твои данные на стороннюю площадку!`)
})

bot.catch((error) => {
  console.log('bot error', error)
})

async function startup(): Promise<void> {
  await bot.launch()
  console.log(new Date(), 'Bot started as', bot.botInfo?.username)
}

startup()
