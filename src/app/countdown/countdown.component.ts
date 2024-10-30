import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ChangeDetectorRef,
  LOCALE_ID,
  Inject,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from './date-input.component';
import { TextFitService } from '../services/text-fit.service';

/**
 * Main component for the countdown application.
 * Handles countdown logic, text resizing, and data persistence.
 */
@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule, FormsModule, DateInputComponent],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  eventName: string = '';
  endDate: string = '';
  countdown: string = '';
  isLandscape: boolean = window.innerWidth > window.innerHeight;
  intervalId: any;
  private animationFrameId: number | null = null;
  private lastUpdate: number = 0;
  private readonly UPDATE_INTERVAL = 1000; // 1 second

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private textFitService: TextFitService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  /**
   * Determines if the countdown should be displayed based on valid inputs
   */
  get isCountdownValid(): boolean {
    return !!this.endDate && !!this.eventName;
  }

  /**
   * Handles window resize events and updates layout
   */
  @HostListener('window:resize')
  onResize() {
    this.isLandscape = window.innerWidth > window.innerHeight;
    this.adjustFontSize();
  }

  ngOnInit() {
    this.loadSavedData();
    this.startCountdown();
    this.adjustFontSize();
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  parseDisplayDate(input: string): string {
    // Remove any non-digit or non-slash characters
    const cleaned = input.replace(/[^\d/]/g, '');

    // Split by slashes
    const parts = cleaned.split('/');

    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const month = parts[1].padStart(2, '0');
      const year = parts[2];

      // Validate date
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (
        date.getDate() === parseInt(day) &&
        date.getMonth() === parseInt(month) - 1 &&
        date.getFullYear() === parseInt(year)
      ) {
        // Return in YYYY-MM-DD format for internal storage
        return `${year}-${month}-${day}`;
      }
    }
    return '';
  }

  onDateInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    if (this.isValidDate(input)) {
      this.endDate = input;
      this.saveData();
    }
  }

  loadSavedData() {
    const savedEventName = localStorage.getItem('eventName');
    const savedEndDate = localStorage.getItem('endDate');
    if (savedEventName) this.eventName = savedEventName;
    if (savedEndDate && this.isValidDate(savedEndDate)) {
      this.endDate = savedEndDate;
    }
    this.startCountdown();
    this.adjustFontSize();
  }

  /**
   * Saves current event name and date to local storage
   * Triggers countdown update and font size adjustment
   */
  saveData() {
    if (this.eventName) {
      localStorage.setItem('eventName', this.eventName);
    } else {
      localStorage.removeItem('eventName');
    }

    if (this.endDate) {
      localStorage.setItem('endDate', this.endDate);
    } else {
      localStorage.removeItem('endDate');
    }

    this.startCountdown();
    this.adjustFontSize();
  }

  /**
   * Starts the countdown timer using requestAnimationFrame for performance
   * Runs outside NgZone to avoid unnecessary change detection
   */
  startCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (!this.endDate) {
      this.countdown = '';
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const updateCountdown = (timestamp: number) => {
        if (!this.lastUpdate || timestamp - this.lastUpdate >= this.UPDATE_INTERVAL) {
          const now = new Date().getTime();
          const end = new Date(this.endDate).getTime();
          const distance = end - now;

          if (distance < 0) {
            this.ngZone.run(() => {
              this.countdown = 'Event has passed';
              this.cdr.detectChanges();
            });
            return;
          }

          this.ngZone.run(() => {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.countdown = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
            requestAnimationFrame(() => this.adjustFontSize());
          });

          this.lastUpdate = timestamp;
        }

        this.animationFrameId = requestAnimationFrame(updateCountdown);
      };

      this.animationFrameId = requestAnimationFrame(updateCountdown);
    });
  }

  /**
   * Adjusts font size of title and countdown text to fill available width
   * Uses TextFitService for optimal size calculation
   */
  adjustFontSize() {
    const wrapper = document.querySelector('.countdown-wrapper') as HTMLDivElement;
    const title = document.querySelector('.event-title') as HTMLHeadingElement;
    const countdown = document.querySelector('.countdown-text') as HTMLParagraphElement;

    if (!wrapper || !title || !countdown) return;

    requestAnimationFrame(() => {
      const finalSize = this.textFitService.fitText(wrapper, [title, countdown], { padding: 32 });

      title.style.fontSize = `${finalSize}px`;
      countdown.style.fontSize = `${finalSize}px`;
    });
  }

  private isValidDate(dateStr: string): boolean {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }

  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Add this helper function to format date as yyyy-mm-dd
  private formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Add this helper function to format display date
  public formatDisplayDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return this.formatDateToISO(date);
  }

  get dateInputFormat(): string {
    return 'yyyy-MM-dd'; // Explicitly set format for the input
  }
}
