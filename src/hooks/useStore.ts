import { useReducer } from 'react'
import { type Action, type State, type Language, type FromLanguage } from '../types'
import { AUTO_LANGUAGE } from '../constants'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

function reducer (state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGE') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }
  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload
    }
  }
  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload
    }
  }
  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      fromText: action.payload,
      loading: true,
      result: ''
    }
  }
  if (type === 'SET_RESULT') {
    return {
      ...state,
      result: action.payload,
      loading: false
    }
  }

  return state
}

export function useStore () {
  const [state, dispach] = useReducer(reducer, initialState)

  const interchangeLanguage = () => {
    dispach({ type: 'INTERCHANGE_LANGUAGE' })
  }
  const setFromLanguage = (payload: FromLanguage) => {
    dispach({ type: 'SET_FROM_LANGUAGE', payload })
  }
  const setToLanguage = (payload: Language) => {
    dispach({ type: 'SET_TO_LANGUAGE', payload })
  }
  const setFromText = (payload: string) => {
    dispach({ type: 'SET_FROM_TEXT', payload })
  }
  const setResult = (payload: string) => {
    dispach({ type: 'SET_RESULT', payload })
  }

  return {
    ...state,
    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
