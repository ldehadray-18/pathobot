import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  PatientRegistration: FormGroup | any;
  RegistrationForm: any;
  submitted: boolean = false;
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router) { }
  ngOnInit(): void {
    this.PatientRegistration = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
      confirmPassword: ["", [Validators.required]]

    }, {
      validator: this.passwordMatchValidator // Custom validator for confirm password
    });

  }
  // Custom validator function
  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) return null;

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ mismatch: true });
      return { mismatch: true }; // Return validation error if passwords don't match
    } else {
      return null; // Return null if passwords match
    }
  }
  get passwordFormField() {
    return this.PatientRegistration.get('password');
  }
  submit() {
    this.submitted = true;
    if (this.PatientRegistration.valid) {
      this.RegistrationForm = this.PatientRegistration.value;
      this.patientService.saveUser(this.RegistrationForm);
      this.submitted = false;
      this.router.navigate(['/login']);
    }
  }
}
