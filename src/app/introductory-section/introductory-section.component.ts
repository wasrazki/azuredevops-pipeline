import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-introductory-section',
  templateUrl: './introductory-section.component.html',
  styleUrls: ['./introductory-section.component.css']
})



export class IntroductorySectionComponent {
  categoryName: string | undefined;
  constructor(private router: Router,private sharedService: SharedService) {}


  scrollToCategories() {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  changeFontSize(button: any) {
    const currentSize = parseFloat(window.getComputedStyle(button, null).getPropertyValue('font-size'));
    button.style.fontSize = (currentSize + 2) + 'px';
  }

  navigateToCategory(category: string): void {  

    this.sharedService.setCategoryAndNavigate(category);
/*
    this.categoryName = category;

    this.router.navigate(['/eventlist'], { queryParams: { category: this.categoryName } });
    */
    
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const footer = document.getElementById('footer');
    const mainContent = document.getElementById('categories'); // Remplacez 'categories' par l'ID de votre conteneur principal

    if (!footer || !mainContent) {
      return;
    }

    // Hauteur totale de la page
    const totalHeight = mainContent.clientHeight;

    // Hauteur actuelle du défilement
    const scrollHeight = window.innerHeight + window.scrollY;

    // Si la hauteur du défilement atteint la fin du contenu principal
    if (scrollHeight >= totalHeight) {
      footer.classList.remove('hidden');
    } else {
      footer.classList.add('hidden');
    }
  }


}
