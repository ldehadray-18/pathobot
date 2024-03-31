import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/departments';

  private readonly localStorageKey = 'patientList';

  constructor(private http: HttpClient) { }
  saveUser(user: any): void {
    const savedUsers = this.getSavedUsers();
    savedUsers.push(user);
    this.updateLocalStorage(savedUsers);
  }
  getSavedUsers(): any[] {
    const savedUsers = localStorage.getItem(this.localStorageKey);
    return savedUsers ? JSON.parse(savedUsers) : [];
  }

  private updateLocalStorage(savedUsers: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(savedUsers));
  }

  getDepartments(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
