import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{


  registerForm: FormGroup;

  @ViewChild('username', { static: false })
  username?: ElementRef;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { 

    this.registerForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null,[Validators.required]],
      fullName: [null,[Validators.required]],
    });

  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.username) {
      this.username.nativeElement.focus();
    }
  }

  onSubmit() {
    const formDataValue = this.registerForm.value;
    this.loginService.register({username: formDataValue.username, password: formDataValue.password, nom_complet: formDataValue.fullName}).subscribe(() => {
      console.info('User registered');
      this.router.navigate(['/authentication/login']);
    });
  }
}
