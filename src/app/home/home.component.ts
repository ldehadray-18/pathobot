import { Component } from '@angular/core';
import { PatientService } from '../services/patient.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private PatientData: PatientService) { }

  Departments: any = [];
  filteredDepartments: any;
  ngOnInit(): void {
    this.PatientData.getDepartments().subscribe((data: any[]) => {
      this.Departments = data;
    });
  }
  onDeparMentCheckboxChange(): void {
    this.filteredDepartments = this.Departments.filter((department: any) => { return department.checked; })
  }
  onWardCheckboxChange(): void {
    this.filteredDepartments = this.Departments.filter((department: any) => {
      // Check if any ward in the department is checked
      return department.wards.some((ward: any) => { return ward.checked });
    });
    console.log("Departments:", this.Departments);
    console.log("Filtered Departments:", this.filteredDepartments);
  }
}
