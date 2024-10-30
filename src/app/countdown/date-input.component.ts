import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

/**
 * Custom form control component for date input handling.
 * Implements ControlValueAccessor for form integration.
 * Enforces YYYY-MM-DD format and handles empty states.
 */
@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements ControlValueAccessor {
  /** Input field identifier */
  @Input() id: string = '';

  /** Label text for the input field */
  @Input() label: string = '';

  /** Minimum allowed date (YYYY-MM-DD format) */
  @Input() min: string = '';

  /** Current input value */
  value: string = '';

  /** Disabled state of the input */
  disabled: boolean = false;

  /** Change callback function */
  onChange = (_: any) => {};

  /** Touch callback function */
  onTouched = () => {};

  /**
   * Handles input changes and formats the date.
   * Removes non-digit characters and formats as YYYY-MM-DD.
   * Only emits value when date is complete and valid.
   * @param event - Input event containing the new value
   */
  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let newValue = input.value.replace(/\D/g, '');

    if (newValue.length > 0) {
      // Format as YYYY-MM-DD
      const year = newValue.slice(0, 4);
      const month = newValue.slice(4, 6);
      const day = newValue.slice(6, 8);

      let formatted = year;
      if (month) formatted += '-' + month;
      if (day) formatted += '-' + day;

      input.value = formatted;

      if (newValue.length >= 8 && this.isValidDate(formatted)) {
        this.value = formatted;
        this.onChange(this.value);
      } else if (newValue.length < 8) {
        this.value = formatted;
        this.onChange(''); // Don't emit until we have a complete valid date
      }
    } else {
      this.value = '';
      this.onChange('');
    }
  }

  /**
   * Handles blur event and validates the date.
   * Clears invalid dates and notifies form of touch state.
   */
  handleBlur(): void {
    this.onTouched();
    if (!this.isValidDate(this.value)) {
      this.value = '';
      this.onChange('');
    }
  }

  /**
   * Validates date string format and value.
   * Checks for YYYY-MM-DD format and valid date values.
   * Also validates against minimum date if provided.
   * @param dateStr - Date string to validate
   * @returns boolean indicating if date is valid
   */
  private isValidDate(dateStr: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      (!this.min || dateStr >= this.min)
    );
  }

  /**
   * ControlValueAccessor implementation.
   * Updates the input value when form control value changes.
   * @param value - New value from form control
   */
  writeValue(value: string | null): void {
    this.value = value || '';
  }

  /**
   * ControlValueAccessor implementation.
   * Registers callback for value changes.
   * @param fn - Callback function
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * ControlValueAccessor implementation.
   * Registers callback for touched state.
   * @param fn - Callback function
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * ControlValueAccessor implementation.
   * Updates disabled state of the input.
   * @param isDisabled - New disabled state
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
