import { Component,OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   



  searchTerm: string ="" 
  filteredEvents: any[] = [];
  events: any[] = [];
  isLoggedIn = false;
  
  constructor(public navbarService: NavbarService,private router: Router, private eventService: EventService,private loginservice : LoginService) {
  }
  
  login() {
    this.router.navigate(['/login']);
  }

  home() {
    this.router.navigate(['/init']);
  }

  ngOnInit() {
    this.isLoggedIn = this.loginservice.isLoggedInUser();

    this.loginservice.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });

    this.loadEvents();
  }
  loadEvents() {
    this.eventService.getAllEvents().subscribe(
      (events:any) => {
        this.events = events;
      },
      (error:any) => {
        console.error('Error loading events:', error);
      }
    );
  }

  searchEvents(searchTerm: string):void {
    if (searchTerm && searchTerm.trim()) {
    this.filteredEvents = this.events.filter((event) =>
      event.titre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.router.navigate(['/app-search-result'], {
      state: { filteredEvents: this.filteredEvents },
    });

  }
  }

  onLoginLogoutClick(): void {
    if (this.isLoggedIn) {
      this.loginservice.logout();
    } else {
      this.router.navigate(['/login']);
    }
  }

  
  
}