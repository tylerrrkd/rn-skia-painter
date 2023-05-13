import { Language, Locale } from '../types'

export const EN: Language = { locale: Locale.en, language: 'English', code: 'en' }
export const ZHCN: Language = { locale: Locale.zh, language: '简体中文', code: 'zh-cn' }

export const languages: Record<Locale, Language> = {
  [Locale.en]: EN,
  [Locale.zh]: ZHCN,
}

export const locales: Record<Locale, Record<string, string>> = {
  [Locale.en]: require('./en-US.json'),
  [Locale.zh]: require('./zh-CN.json'),
}

const languageList = Object.values(languages)

export default languageList
