import { Injectable } from '@angular/core'

/**
 * Interface defining the structure of countdown data to be stored
 */
interface CountdownData {
  eventName: string
  endDate: string
}

/**
 * Service responsible for managing local storage operations for the countdown app.
 * Provides type-safe methods for storing and retrieving countdown data.
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly STORAGE_KEY = 'countdown_data'

  /**
   * Saves countdown data to local storage
   * @param data - The countdown data to be stored
   */
  saveCountdownData(data: CountdownData): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
  }

  /**
   * Retrieves countdown data from local storage
   * @returns The stored countdown data or null if none exists
   */
  getCountdownData(): CountdownData | null {
    const data = localStorage.getItem(this.STORAGE_KEY)
    return data ? JSON.parse(data) : null
  }

  /**
   * Removes countdown data from local storage
   */
  clearCountdownData(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }
}
