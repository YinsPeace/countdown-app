import { Injectable } from '@angular/core'

/**
 * Service responsible for calculating optimal font sizes to fit text within containers.
 * Uses a binary search algorithm for efficient size calculation.
 */
@Injectable({
  providedIn: 'root',
})
export class TextFitService {
  /**
   * Calculates the optimal font size for given elements to fit within a container.
   * @param container - The container element that text should fit within
   * @param elements - Array of elements whose font size should be adjusted
   * @param options - Configuration options for font size calculation
   * @param options.minSize - Minimum font size to try (default: 1)
   * @param options.maxSize - Maximum font size to try (default: 200)
   * @param options.padding - Container padding to account for (default: 32)
   * @returns The optimal font size that allows all elements to fit
   */
  fitText(
    container: HTMLElement,
    elements: HTMLElement[],
    options: {
      minSize?: number
      maxSize?: number
      padding?: number
    } = {},
  ): number {
    const { minSize = 1, maxSize = 200, padding = 32 } = options

    const containerWidth = container.clientWidth - padding

    /**
     * Uses binary search to find the largest font size that fits within container
     * @param element - Element to resize
     * @returns Optimal font size for the element
     */
    const findOptimalFontSize = (element: HTMLElement): number => {
      let min = minSize
      let max = maxSize
      let optimal = min

      while (min <= max) {
        const mid = Math.floor((min + max) / 2)
        element.style.fontSize = `${mid}px`

        if (element.scrollWidth <= containerWidth) {
          optimal = mid
          min = mid + 1
        } else {
          max = mid - 1
        }
      }

      return optimal
    }

    // Find the smallest optimal size among all elements
    const sizes = elements.map(element => findOptimalFontSize(element))
    return Math.min(...sizes)
  }
}
