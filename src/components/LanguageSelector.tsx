import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { type FromLanguage, type Language, SectionType } from '../types.d'

type Props =
    | { type: SectionType.From, value: FromLanguage, onChange: (Language: FromLanguage) => void }
    | { type: SectionType.To, value: Language, onChange: (Language: Language) => void }

export function LanguageSelector ({ onChange, value, type }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Language)
  }

  return (
        <select onChange={handleChange} value={value}>
            {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => {
              return <option value={key} key={key}>{literal}</option>
            })}
        </select>
  )
}
