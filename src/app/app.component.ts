import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employeemanagerapp';
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(){
    this.getEmployees();
  }

  public getEmployees():void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[])=>{
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public onOpenModal(employee: Employee| null, mode:string):void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if(mode==='edit'){
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if(mode==='delete'){
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click(); 
  }
}
