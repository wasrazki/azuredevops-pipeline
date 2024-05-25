import { Component,OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
// private IsLoggedIn= false;

  loginForm: FormGroup;

  constructor(private toastr: ToastrService,private navbarService: NavbarService, private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.navbarService.hideNavbar();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }


  retourAccueil(): void {
    // Utilisez le Router pour naviguer vers la page d'accueil (ajustez le chemin selon votre configuration)
    this.router.navigate(['/']);
    this.navbarService.afficheNavbar();
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log(loginData)

      this.loginService.login(loginData).subscribe(
        () => {
          console.log('Login successful!');
          this.router.navigate(['/init']);
        },
        error => {
          console.error('Login failed:', error);
          this.toastr.error('Échec de la connexion', 'Erreur');
        }
      );
    } else {
      // Handle invalid form submission
      console.log('Invalid form submission. Please fill in all required fields.');
    }
  }



  
}