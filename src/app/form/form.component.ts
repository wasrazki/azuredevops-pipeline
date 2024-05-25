import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../event.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @ViewChild('eventForm') eventForm!: NgForm;
  titre: string;
  description: string | undefined;
  date: Date | undefined;
  capacite: number;
  heureDebut: string;
  heureFin: string;
  categorie: string;
  location: string;
  showSuccessMessage= false;
  

  constructor(private eventService: EventService) {
    // You can also initialize properties in the constructor if needed
     this.titre = ''; 
     this.capacite = 0;
     this.heureDebut = '';
     this.heureFin = '';
     this.categorie = '';
     this.location = '';
  }

  onSubmit(): void {
    const formData = this.eventForm.value;
    // Check if the form is valid
    if (formData.valid) {
      // Handle the form submission
      console.log('Form submitted!', {
        titre: this.titre,
        description: this.description,
        date: this.date,
        capacite: this.capacite,
        heureDebut: this.heureDebut,
        heureFin: this.heureFin,
        categorie: this.categorie,
        location: this.location
      });
      this.showSuccessMessage=true;
      // Add your logic to send the form data to the server or perform other actions.
    } else {
      // Handle invalid form
      console.log('Form is invalid. Please fill in all required fields.');
    }

    if (this.eventForm.valid) {
      // Call the createEvent() method of the EventService and pass the form value
      this.eventService.createEvent(this.eventForm.value).subscribe({
        next: (response) => {
          console.log('Event created successfully:', response);
          // Optionally, you can reset the form after successful submission
          this.eventForm.resetForm();
        },
        error: (error) => {
          console.error('Error creating event:', error);
        }
      });
    }
  }





  validateCapacite(ngModel: NgModel): void {
    const capacite = ngModel.value;
  
    if (capacite === 0) {
      ngModel.control.setErrors({ 'capaciteInvalid': true });
    } else {
      ngModel.control.setErrors(null);
  
      if (!capacite) {
        ngModel.control.setErrors({ 'required': true });
      }
 
   }

}
}
