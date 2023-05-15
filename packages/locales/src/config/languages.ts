import { Language, LanguageCode } from '../types'

export const EN: Language = { code: LanguageCode.en, language: 'English' }
export const ZH: Language = { code: LanguageCode.zh, language: '简体中文' }

export const languages: Record<LanguageCode, Language> = {
  [LanguageCode.en]: EN,
  [LanguageCode.zh]: ZH,
}

export const locales: Record<LanguageCode, Record<string, string>> = {
  [LanguageCode.en]: require('./en-US.json'),
  [LanguageCode.zh]: require('./zh-CN.json'),
}

const languageList = Object.values(languages)

export default languageList
