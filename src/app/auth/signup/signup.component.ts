import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

import { MatchPassword } from '../validators/match-password';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, 
      Validators.email
    ]), 
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(20)
    ]), 
    passwordConfirm: new FormControl('', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(20)
    ])
  }, [this.matchPassword.validate]);

  constructor(
    private matchPassword: MatchPassword, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const { email, password } = this.signUpForm.value;
    this.authService.signUp(email, password);
  }

}
