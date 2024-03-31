import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  PatientLogin: FormGroup | any;
  constructor(private router: Router, private fb: FormBuilder, private patientService: PatientService) { }
  ngOnInit(): void {
    this.PatientLogin = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });

  }
  submit() {
    console.log(this.PatientLogin.value);
    console.log(this.PatientLogin.value.email);
    this.patientService.getSavedUsers().forEach((data: any) => {
      if ((data.email == this.PatientLogin.value.email) && (data.password == this.PatientLogin.value.password)) {
        this.router.navigateByUrl('/dashboard');
      }
      else {
        //Show invalid name or password message
        //console.log("check name");
      }
    })

  }

}