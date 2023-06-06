import translations from './config/en-US'

export enum LanguageCode {
  en = 'en',
  zh = 'zh',
}

export interface Language {
  language: string
  code: LanguageCode
}

export interface ProviderState {
  currentLanguage: Language
}

export interface ContextApi extends ProviderState {
  setLanguage: (language: Language) => void
  t: TranslateFunction
}

// To support string literals and union of string
// https://stackoverflow.com/questions/61047551/typescript-union-of-string-and-string-literals
type MaybeObject = Record<never, never>
export type TranslationKey = keyof typeof translations | (string & MaybeObject)

export type TranslateFunction = (key: TranslationKey) => string
