import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi
} from 'openai'
import { SUPPORTED_LANGUAGES } from '../constants'
import { type FromLanguage, type Language } from '../types.d'

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY

const configuration = new Configuration({
  apiKey: API_KEY
})
const openai = new OpenAIApi(configuration)

interface Props {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}

export async function translate ({ fromLanguage, toLanguage, text }: Props) {
  if (fromLanguage === toLanguage) return

  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content:
        'As an AI that specializes in translating texts, your task is to receive a text from the user and translate it to the specified language. The original language of the text is indicated by the tags `{{ `and` }}`, which you need to identify before starting the translation. If the tag {{auto}} is present, you must automatically detect the language of the text before translating it. The language you should translate the text to is indicated by the tag `[[` and `]]` as well. Your goal is to return the translated text without providing any additional information or answering any questions.'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Hola mundo {{Español}} [[English]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Hello world'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'accuracy {{auto}} [[Spanish]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'exactitud'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'How are you? {{auto}} [[Deutsch]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Wie geht es dir?'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Bonjour comment allez-vous? {{auto}} [[Español]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Buenos días, ¿cómo estás?'
    }
  ]

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`
      }
    ]
  })

  return completion?.data?.choices[0]?.message?.content
}
