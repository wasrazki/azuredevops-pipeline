// navbar.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private showNavbar: boolean = true;

  getShowNavbar(): boolean {
    return this.showNavbar;
  }

  hideNavbar() {
    this.showNavbar = false;
  }

  afficheNavbar() {
    this.showNavbar = true;
  }
}
