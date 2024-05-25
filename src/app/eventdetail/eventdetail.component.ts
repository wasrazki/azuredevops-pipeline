import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {
  event: any;
  eventFetched: boolean = false; 

  constructor(private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const eventId = params['eventId'];
      if (eventId) {
        this.eventService.getEventById(eventId).subscribe((event) => {
          this.event = event;
        });
      }
    });}
  
  reserver() {
    this.router.navigate(['/reserver']);
  }

}
