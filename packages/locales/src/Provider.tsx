import { createContext, useCallback, useEffect, useState, useMemo } from 'react'
import { EN } from './config/languages'
import type { ContextApi, Language, ProviderState, TranslateFunction } from './types'
import { KEY_LOCALES, fetchLocale, getLanguageCodeFromStorageOrDevice } from './helpers'
import { useToastController } from '@my/ui'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState: ProviderState = {
  currentLanguage: EN,
}

// Export the translations directly
const languageMap = new Map<Language['locale'], Record<string, string>>()
languageMap.set(EN.locale, {})

export const LanguageContext = createContext<ContextApi | undefined>(undefined)

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const toast = useToastController()

  const [state, setState] = useState<ProviderState>(initialState)

  const { currentLanguage } = state

  useEffect(() => {
    const fetchInitialLocales = async () => {
      const codeFromStorage = await getLanguageCodeFromStorageOrDevice()

      if (codeFromStorage !== EN.locale) {
        const currentLocale = fetchLocale(codeFromStorage)
        if (currentLocale) {
          languageMap.set(codeFromStorage, currentLocale)
        }
      }

      setState((prevState) => ({
        ...prevState,
      }))
    }

    fetchInitialLocales()
  }, [])

  const translate: TranslateFunction = useCallback(
    (key) => {
      const translationSet = languageMap.get(currentLanguage.locale) ?? {}
      const translatedText = translationSet?.[key] || key
      return translatedText
    },
    [currentLanguage]
  )

  const setLanguage = useCallback(async (language: Language) => {
    if (languageMap.has(language.locale)) {
      AsyncStorage?.setItem?.(KEY_LOCALES, language.locale)
      setState((prevState) => ({
        ...prevState,
        currentLanguage: language,
      }))
    } else {
      try {
        const locale = fetchLocale(language.locale)
        if (locale) {
          languageMap.set(language.locale, locale)
          AsyncStorage?.setItem?.(KEY_LOCALES, language.locale)
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
  }, [translate])

  const providerValue = useMemo(() => {
    return { ...state, setLanguage, t: translate }
  }, [state, setLanguage, translate])

  return <LanguageContext.Provider value={providerValue}>{children}</LanguageContext.Provider>
}
