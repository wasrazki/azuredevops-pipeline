import { Component,OnInit } from '@angular/core';
import { NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {  ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from '../navbar/navbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationService} from '../registration.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
	imports: [NgbDatepickerModule, JsonPipe,ReactiveFormsModule,CommonModule],
})
export class RegisterComponent implements OnInit   {
  

  model: NgbDateStruct | null = null;
  registrationForm: any;

  constructor(private navbarService: NavbarService,private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService ) {
    this.navbarService.hideNavbar();

  }

  ngOnInit() {


  this.registrationForm = this.formBuilder.group({
    role: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    adresse: ['', Validators.required],
    dn: [null],
    password: ['', [Validators.required]],
    confirmPassword: ['', Validators.required],
  });
}
  


  

   onSubmit(form: FormGroup) {
    this.registrationForm.markAllAsTouched();
    console.log('Form values:', this.registrationForm.value);
    
    if (form.valid) {
      console.log("valideee");
      const formData = form.value;
      const { role, ...userWithoutRole } = formData;
      const { username, password } = formData;

      try {
        
        this.registrationService.register({ username, password }).subscribe({
          next: (response: any) => {
            console.log('User registered successfully:', response);
            // Reset the registration form after successful submission
            form.reset();
            this.toastr.success('Votre compte a été créé avec succès !', 'Succès');
          },
          error: (error: any) => {
            console.error('Error registering user:', error);
            this.toastr.error('Une erreur s\'est produite lors de la création du compte.', 'Erreur');
          }
        });



        if (formData.role === '1') { // Organisateur
          this.registrationService.registerorganisateur(userWithoutRole).subscribe({
            next: (response:any) => {
              console.log('User registered successfully:', response);
              // Reset the registration form after successful submission
              form.reset();
            },
            error: (error:any) => {
              console.error('Error registering user:', error);
            }
          });
          this.toastr.success('Votre compte a été créé avec succès !', 'Succès');
        } else if (formData.role === '2') { // Participant
          this.registrationService.registerparticipant(userWithoutRole).subscribe({
            next: (response:any) => {
              console.log('User registered successfully:', response);
              // Reset the registration form after successful submission
              this.registrationForm.reset();
            },
            error: (error:any) => {
              console.error('Error registering user:', error);
            }
          });
          this.toastr.success('Votre compte a été créé avec succès !', 'Succès');
        }
      } catch (error) {
        console.error(error);
        this.toastr.error('Une erreur s\'est produite lors de la création du compte.', 'Erreur');
      }
    }

    else {
      console.log("non valide");
      console.log('Form errors:', this.registrationForm.errors);
      console.log('Form is invalid');
    console.log('Email field errors:', form.get('email')?.errors);
    console.log('Password field errors:', form.get('password')?.errors);
    console.log('adresse field errors:', form.get('adresse')?.errors);
    console.log('password field errors:', form.get('password')?.errors);
    console.log('dn field errors:', form.get('dn')?.errors);
    console.log('prenom field errors:', form.get('prenom')?.errors);
    console.log('username field errors:', form.get('username')?.errors);


    }



  }


/*
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
*/

retourAccueil(): void {
  // Utilisez le Router pour naviguer vers la page d'accueil (ajustez le chemin selon votre configuration)
  this.router.navigate(['/']);
  this.navbarService.afficheNavbar();
}

}