import { Context as BaseContext, Telegraf } from 'telegraf'

export type IMContext = BaseContext & { match: RegExpExecArray | undefined }

const token = process.env.BOT_TOKEN

if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}
const bot = new Telegraf<IMContext>(token)

export default bot
