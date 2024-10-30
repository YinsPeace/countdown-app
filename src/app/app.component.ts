import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { CountdownComponent } from './countdown/countdown.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountdownComponent],
  template: '<app-countdown />',
})
export class AppComponent {
  title = 'Countdown App'
}
