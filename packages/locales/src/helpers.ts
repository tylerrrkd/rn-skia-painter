import { EN, locales } from './config/languages'
import type { LanguageCode } from './types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const KEY_LOCALES = 'srwor_space_language'

export const fetchLocale = (locale: LanguageCode) => {
  try {
    return locales?.[locale]
  } catch (error) {
    return null
  }
}

/**
 * get code form storage or device's default
 */
export const getLanguageCodeFromStorageOrDevice = async (): Promise<LanguageCode> => {
  try {
    const codeFromStorage = (await AsyncStorage?.getItem?.(KEY_LOCALES)) as LanguageCode

    return codeFromStorage || EN.code
  } catch {
    return EN.code
  }
}
