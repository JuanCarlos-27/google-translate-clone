import React from 'react'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Ingresar texto'
  if (loading === true) return 'Traduciendo...'
  return 'Traducción'
}
export default function TextArea ({ type, loading, value, onChange }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
        <textarea
            placeholder={getPlaceholder({ type, loading })}
            autoCorrect='off'
            autoComplete='off'
            autoFocus={type === SectionType.From}
            readOnly={type === SectionType.To}
            value={value}
            onChange={handleChange}
        >
        </textarea>

  )
}
