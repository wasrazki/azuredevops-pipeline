import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-eventlists',
  templateUrl: './eventlists.component.html',
  styleUrls: ['./eventlists.component.css']
})
export class EventlistsComponent implements OnInit {

  categoryName: string = '';
  events: any[] = [];
  event: any;


  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute,
              private eventService: EventService,
              private sharedService: SharedService,
              private LoginService:LoginService) {
                
              }

      

  ngOnInit(): void {
    this.sharedService.currentCategoryName.subscribe((categoryName) => {
      this.categoryName = categoryName;
      this.fetchEvents();
    });
  }

  fetchEvents(): void {
    if (this.categoryName !== '') {
      this.eventService.getEventsByCategory(this.categoryName).subscribe((events) => {
        this.events = events;
      }); 
    }
  }
/*
  navigateToEventDetails(eventId: string): void {
    console.log('Event ID:', eventId);
    // Use Angular Router to navigate to the "eventdetails" route with the selected eventId
    this.router.navigate(['/eventdetails', eventId] );
  }*/
  reserver(eventId:string):void {
    //const participantId = this.LoginService.getLoggedInUserId();
    this.eventService.getEventById(eventId).subscribe((event) => {
      this.event = event;
  
      // Vérifie si le nombre de réservations est inférieur à la capacité
      if (this.event.numberOfReservations == this.event.capacite) {
        // Affiche un message indiquant que l'événement est complet
        this.snackBar.open('Cet événement est complet. Aucune réservation supplémentaire n\'est possible.', 'Fermer', {
          duration: 3000, // Durée du message en millisecondes (ajustez selon vos préférences)
         } );
      
      }
    });

  }
}
