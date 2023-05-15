import { EN, locales } from './config/languages'
import type { Locale } from './types'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEY_LOCALES = 'srwor_space_language'

export const fetchLocale = (locale: Locale) => {
  try {
    return locales?.[locale]
  } catch (error) {
    return null
  }
}

/**
 * get code form storage or device's default
 */
export const getLanguageCodeFromStorageOrDevice = async (): Promise<Locale> => {
  try {
    const codeFromStorage = await AsyncStorage?.getItem?.(KEY_LOCALES) as Locale

    return codeFromStorage || EN.locale
  } catch {
    return EN.locale
  }
}
