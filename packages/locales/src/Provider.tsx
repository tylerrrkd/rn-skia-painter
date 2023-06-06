import { createContext, useCallback, useEffect, useState, useMemo } from 'react'
import languageList, { EN, locales } from './config/languages'
import type { ContextApi, Language, ProviderState, TranslateFunction } from './types'
import { KEY_LOCALES, fetchLocale, getLanguageCodeFromStorageOrDevice } from './helpers'
import { useToastController } from '@my/ui'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getLocales } from 'expo-localization'

const systemLanguageCode = getLocales()?.[0]?.languageCode

const initLanguage = languageList.find((language) => language.code === systemLanguageCode)

const initialState: ProviderState = {
  currentLanguage: initLanguage || EN,
}

const initialLocale = initialState.currentLanguage.code

// Export the translations directly
const languageMap = new Map<Language['code'], Record<string, string>>()
languageMap.set(initialLocale, locales[initialLocale] || {})

export const LanguageContext = createContext<ContextApi | undefined>(undefined)

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const toast = useToastController()

  const [state, setState] = useState<ProviderState>(initialState)

  const { currentLanguage } = state

  useEffect(() => {
    const fetchInitialLocales = async () => {
      const codeFromStorage = await getLanguageCodeFromStorageOrDevice()
      if (codeFromStorage !== initialLocale) {
        const currentLocale = fetchLocale(codeFromStorage)
        if (currentLocale) {
          languageMap.set(codeFromStorage, currentLocale)
          const currentLanguage = languageList.find((language) => language.code === codeFromStorage)
          setState((prevState) => ({
            ...prevState,
            currentLanguage: currentLanguage as Language,
          }))
        }
      }
    }

    fetchInitialLocales()
  }, [])

  const translate = useCallback<TranslateFunction>(
    (key) => {
      const translationSet = languageMap.get(currentLanguage.code) ?? {}
      const translatedText = translationSet?.[key] || key
      return translatedText
    },
    [currentLanguage]
  )

  const setLanguage = useCallback(
    async (language: Language) => {
      if (languageMap.has(language.code)) {
        AsyncStorage?.setItem?.(KEY_LOCALES, language.code)
        setState((prevState) => ({
          ...prevState,
          currentLanguage: language,
        }))
      } else {
        try {
          const locale = fetchLocale(language.code)
          if (locale) {
            languageMap.set(language.code, locale)
            AsyncStorage?.setItem?.(KEY_LOCALES, language.code)
            setState((prevState) => ({
              ...prevState,
              currentLanguage: language,
            }))
          } else {
            throw new Error()
          }
        } catch (error) {
          toast.show(translate('language could not found'))
        }
      }
    },
    [translate]
  )

  const providerValue = useMemo(() => {
    return { ...state, setLanguage, t: translate }
  }, [state, setLanguage, translate])

  return <LanguageContext.Provider value={providerValue}>{children}</LanguageContext.Provider>
}
