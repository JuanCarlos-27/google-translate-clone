import { useStore } from '../hooks/useStore'
import { InterchangeIcon } from './Icons'
import '../sass/App.scss'

function App () {
  const { fromLanguage, toLanguage, interchangeLanguage } = useStore()

  return (
    <main className="main">
      <h1 className='main__title'>Google Translate + GPT 🤖</h1>
      <section className="main__interchange">
        <select name="fromLanguage" className='main__interchange--fromLang'>
          <option value={fromLanguage}>{fromLanguage}</option>
        </select>
        <button
          className='main__interchange--btn'
          onClick={() => { interchangeLanguage() }}>
          <InterchangeIcon />
        </button>
        <select name="toLanguage" className='main__interchange--toLang' >
          <option value={toLanguage}>{toLanguage}</option>
        </select>
      </section>

      <section className='main__textareas'>
        <textarea placeholder='Ingresar texto' autoCorrect='off' autoComplete='off' autoFocus></textarea>
        <textarea placeholder='Traducciòn' readOnly autoCorrect='off' autoComplete='off'></textarea>
      </section>

    </main>
  )
}

export default App
