import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private categoryNameSource = new BehaviorSubject<string>('');
  currentCategoryName = this.categoryNameSource.asObservable();

  setCategoryAndNavigate(categoryName: string): void {
    this.categoryNameSource.next(categoryName);
    
    // Navigate to the event component with the selected category
    this.router.navigate(['/eventlist'], { queryParams: { category: categoryName } });
  }

  constructor(private router: Router) { }
}
