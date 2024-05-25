
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent {

  @Input() showPaymentForm?: boolean;
  @Output() paymentSubmit: EventEmitter<any> = new EventEmitter<any>();

  paymentForm: FormGroup;
  showInvoice: boolean = false;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      
    });
  }


  submitPaymentForm() {
    if (this.paymentForm.valid) {
      this.paymentSubmit.emit(this.paymentForm.value);
      // Afficher la facture après le paiement réussi
      this.showInvoice = true;
    }

  }

  imprimerFacture() {
    
    console.log('Facture imprimée');
  }
}

