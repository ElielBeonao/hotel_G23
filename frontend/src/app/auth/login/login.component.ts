import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  errorMessage: string = '';
  loginForm: FormGroup;

  @ViewChild('username', { static: false })
  username?: ElementRef;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { 

    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null,[Validators.required]]
    });

  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.username) {
      this.username.nativeElement.focus();
    }
  }

  onSubmit() {
    this.errorMessage = '';
    const formDataValue = this.loginForm.value;
    this.loginService.login(formDataValue)
    .subscribe((res) => {
      console.log(res);
      this.router.navigate(['/home']);
    }, (error) => {
      this.errorMessage = error.error.message;
    });
  }
}
