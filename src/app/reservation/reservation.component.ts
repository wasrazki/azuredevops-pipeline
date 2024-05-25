import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {
 
//   reservation!: FormGroup;
//   showPaymentForm: boolean = false;

   

//   constructor(private fb: FormBuilder) { }

//   ngOnInit() {
//     this.reservation = this.fb.group({
//       name: ['', Validators.required],
//       paymentMethod: ['', Validators.required]
      
//     });
//   }

//   onSubmit() {
//     if (this.reservation.valid) {
//       if (this.reservation.value.paymentMethod === 'online') {
//         this.showPaymentForm = true; // hedhi pour afficher le formulaire de paiement en ligne
//       }
//       // Envoyer les données au backend (NestJS) pour la réservation
//       const reservationData = this.reservation.value;
//       // Ajoutez ici la logique pour envoyer les données au backend via un service Angular
//       console.log(reservationData);
//     }
//   }
//   imprimerFacture() {
//     // Ajoutez ici la logique pour imprimer la facture
//     console.log('Facture imprimée');
//   }
// }


nom: string;
nombre_place: number | undefined;
date: Date | undefined;
type_paiment: string;



constructor() {
  // You can also initialize properties in the constructor if needed
   this.nom = ''; 
   this.nombre_place = 0;
   this.type_paiment = '';
  
}
ngOnInit() {
}

onSubmit(form: any): void {
  // // Check if the form is valid
  // if (form.valid) {
  //   // Handle the form submission
  //   console.log('Form submitted!', {
  //     titre: this.titre,
  //     description: this.description,
  //     date: this.date,
  //     capacite: this.capacite,
  //     heureDebut: this.heureDebut,
  //     heureFin: this.heureFin,
  //     categorie: this.categorie,
  //     location: this.location
  //   });
  //   this.showSuccessMessage=true;
  //   // Add your logic to send the form data to the server or perform other actions.
  // } else {
  //   // Handle invalid form
  //   console.log('Form is invalid. Please fill in all required fields.');
  // }
}



}

