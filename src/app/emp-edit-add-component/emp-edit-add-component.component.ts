import { Component, EventEmitter,Output,Inject, OnDestroy, OnInit } from '@angular/core';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatHint } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule,FormControl,FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmpServiceService } from '../emp-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-emp-edit-add-component',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,MatIconModule,MatButtonModule,MatHint,MatRadioModule,MatSelectModule,ReactiveFormsModule,CommonModule],
  templateUrl: './emp-edit-add-component.component.html',
  styleUrl: './emp-edit-add-component.component.scss',
  providers:[EmpServiceService]
})
export class EmpEditAddComponentComponent implements OnInit {
  
  @Output() event2=new EventEmitter<any>();
  employeeList:any=[];
  education:string[]=[
    "Matric",
    "Intermediate",
    "Diploma",
    "Graduate",
    "Post Graduate"
  ]
  employee:FormGroup;
  k=false;
  constructor(private _fb:FormBuilder,private _empService:EmpServiceService,private _dialog:MatDialogRef<EmpEditAddComponentComponent>, @Inject(MAT_DIALOG_DATA)public data:any){
    this.employee=this._fb.group({
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl(),
      email:new FormControl('',[Validators.required,Validators.email]),
      dob:new FormControl('',Validators.required),
      gender:new FormControl(),
      course:new FormControl(),
      Company:new FormControl()
    });

  }
  ngOnInit(): void {
    console.log(this.data)
    this.employee.patchValue(this.data)
  }
  
  submit1(emp:any){
    if(this.data!=null){
    console.log(emp);
    //this.employeeList.push(emp);
    //this.event2.emit(emp);
    //console.log(this.employeeList);

    this._empService.GetCustomerById(this.data.id).subscribe({
      next:res=>{
         if(res!=null){
            console.log(res)
            this.k=true
            console.log(this.k);
         }


      }
    })

      emp.id=this.data.id
      this._empService.EditEmployee(this.data.id,emp).subscribe({
        next:res=>{
          console.log(res);
          alert("Employee updated successfully")
          this._dialog.close(true)

        }
      });
    }
    else{
    this._empService.AddCustomer(emp).subscribe(res=>{
      console.log(res);
      alert("Employee added successfully")
      this._dialog.close(true);
      

    })
  }
    
  }
  Cancel(){
    this._dialog.close(false)
  }
}
