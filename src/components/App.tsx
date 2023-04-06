import { useStore } from '../hooks/useStore'
import { InterchangeIcon } from './Icons'
import '../sass/App.scss'
import { LanguageSelector } from './LanguageSelector'
import { SectionType } from '../types.d'
import TextArea from './TextArea'
import { useEffect } from 'react'
import { translate } from '../services/translate'

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

  useEffect(() => {
    if (fromText === '') return

    translate({ fromLanguage, toLanguage, text: fromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }, [fromText, fromLanguage, toLanguage])

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
        <TextArea
          loading={loading}
          value={result}
          type={SectionType.To}
          onChange={setResult}
        />
      </section>

    </main>
  )
}

export default App
