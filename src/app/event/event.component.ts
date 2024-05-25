import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(1000, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class EventComponent {
  constructor(private router: Router) {}
    createEvent() {
      this.router.navigate(['/form']);
    }
}
