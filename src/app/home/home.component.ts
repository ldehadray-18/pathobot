import 'bootstrap';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @ViewChild('popoverTemplate') popoverTemplate!: TemplateRef<any>;
  @ViewChild('patientDetailTemplate') patientDetailTemplate!: TemplateRef<any>;

  selectedStatus: boolean = true;
  selectedStatusMedical: boolean = false;
  selectedArrival: boolean = false;
  constructor(private PatientData: PatientService) { }

  Departments: any = [];
  filteredDepartments: any;
  ngOnInit(): void {
    console.log(this.selectedStatus);
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
  selectedDetail() {
    console.log(this.selectedStatus);
    this.selectedStatus = true;
    this.selectedStatusMedical = false;
    this.selectedArrival = false;

  }
  selectedMedical() {
    this.selectedStatus = false;
    this.selectedStatusMedical = true;
    this.selectedArrival = false;
  }
  selectedHospitalArrival() {
    this.selectedStatus = false;
    this.selectedStatusMedical = false;
    this.selectedArrival = true;
  }

}
