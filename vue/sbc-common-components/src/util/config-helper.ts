import { SessionStorageKeys } from './constants'
import { trimTrailingSlashURL } from './common-util'

export default class ConfigHelper {
  static keycloakConfigUrl: string = ''
  static addToSession (key: string, value: any): void {
    sessionStorage.setItem(key, value)
  }

  static getFromSession (key: string): string | null {
    return sessionStorage.getItem(key)
  }

  static removeFromSession (key: string): void {
    sessionStorage.removeItem(key)
  }

  static clearSession (): void {
    sessionStorage.clear()
  }

  static getStatusAPIUrl (): string {
    return trimTrailingSlashURL(sessionStorage.getItem(SessionStorageKeys.StatusApiUrl) || '')
  }

  static getAuthAPIUrl (): string {
    return trimTrailingSlashURL(sessionStorage.getItem(SessionStorageKeys.AuthApiUrl) || '')
  }

  static getAuthContextPath (): string {
    return trimTrailingSlashURL(sessionStorage.getItem(SessionStorageKeys.AuthWebUrl) || '')
  }

  static setKeycloakConfigUrl (keycloakConfigUrl: string) {
    this.keycloakConfigUrl = keycloakConfigUrl
  }

  static getKeycloakConfigUrl (): string {
    return this.keycloakConfigUrl
  }
}
