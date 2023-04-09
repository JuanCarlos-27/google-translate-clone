import '../sass/App.scss'
import 'react-tooltip/dist/react-tooltip.css'
import { useStore } from '../hooks/useStore'
import { ClipboardIcon, InterchangeIcon, VoiceIcon } from './Icons'
import { LanguageSelector } from './LanguageSelector'
import { SectionType } from '../types.d'
import TextArea from './TextArea'
import { useEffect } from 'react'
import { translate } from '../services/translate'
import { useDebounce } from '../hooks/useDebounce'
import { Tooltip } from 'react-tooltip'
import { VOICE_FOR_LANGUAGE } from '../constants'

function App () {
  const {
    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    toLanguage,
    fromLanguage,
    fromText,
    result,
    loading
  } = useStore()

  const debouncedFromText = useDebounce(fromText)

  useEffect(() => {
    if (debouncedFromText === '') return
    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return

        setResult(result)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    window.navigator.clipboard.writeText(result)
      .catch(() => { })
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    speechSynthesis.speak(utterance)
  }

  return (
    <main className="main">
      <h1 className='main__title'>Google Translate + GPT 🤖</h1>
      <section className="main__interchange">
        <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
        <button
          className='main__interchange--btn'
          onClick={interchangeLanguage}
          disabled={fromLanguage === 'auto'}>
          <InterchangeIcon />
        </button>
        <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
      </section>

      <section className='main__textareas'>
        <TextArea
          value={fromText}
          type={SectionType.From}
          onChange={setFromText}
        />

        <div className='main__textareas-clipboard'>
          <TextArea
            loading={loading}
            value={result}
            type={SectionType.To}
            onChange={setResult}
          />
          <button
              className='clipboardButton'
              onClick={handleClipboard}
              data-tooltip-id="clipboard"
              data-tooltip-content="Traducción copiada"
              data-tooltip-place="bottom"
              data-tooltip-delay-hide={1500}
              title='Copiar'
            >
            <Tooltip id="clipboard" openOnClick />
            <ClipboardIcon />
          </button>

          <button
            className='voiceButton'
            title='Escuchar'
            onClick={handleSpeak}
            >
            <VoiceIcon />
          </button>
        </div>
      </section>

    </main>
  )
}

export default App
