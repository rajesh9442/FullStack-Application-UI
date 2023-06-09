import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employeemanagerapp';
  employees: Employee[] = [];
  public editEmployee: Employee | null=null;
  public deleteEmployee: Employee | null=null;

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

  public searchEmployee(key:string){
    const result:Employee[]=[];
    for(let employee of this.employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase())!= -1
        ||employee.email.toLowerCase().indexOf(key.toLowerCase())!= -1
        ||employee.jobTitle.toLowerCase().indexOf(key.toLowerCase())!= -1){
        result.push(employee);
      }
    }
    this.employees=result;
    if(result.length==0 || !key){
      this.getEmployees();
    }
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
      this.editEmployee = employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if(mode==='delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click(); 
  }

  public onAddEmployee(addForm:NgForm):void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response:Employee)=>{
        console.log(response);
        this.getEmployees();
        addForm.reset();
        this.ngOnInit();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
      );
  }

  public onUpdateEmployee(employee:Employee):void{
    this.employeeService.updateEmployee(employee).subscribe(
      (response:Employee)=>{
        console.log(response);
        this.getEmployees();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
      );
  }

  public onDeleteEmployee(employeeId:number):void{
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response:void)=>{
        console.log(response);
        this.getEmployees();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
      );
  }
}
