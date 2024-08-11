import { Component, OnInit,ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { EmpEditAddComponentComponent } from './emp-edit-add-component/emp-edit-add-component.component';
import { EmpServiceService } from './emp-service.service';
import { CommonModule } from '@angular/common';
import { MatTableModule,MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort,MatSortModule } from '@angular/material/sort';
import { RouterModule,Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, EmpEditAddComponentComponent,MatListModule,CommonModule,MatTableModule,MatPaginatorModule,MatSortModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[EmpServiceService]
})
export class AppComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  title = 'Employee';
  empList:any=[];
  displayedColumns:string[]=["Id","FirstName","LastName","Gender","Gmail","DOB","Company","Course","Action"]
  constructor(private _matDialog:MatDialog,private _empService:EmpServiceService,private route:Router){
 
  }
  ngOnInit(): void {
    this.GetEmployees();
  }
  onEditAddForm(){
    const dialogRef=this._matDialog.open(EmpEditAddComponentComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
          if(val){
            this.GetEmployees()
          }
      }
    })
  }
  onEditForm(data:any){
    const dialogRef=this._matDialog.open(EmpEditAddComponentComponent,{data})
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
          if(val){
            this.GetEmployees()
          }
      }
    })
  }
  GetEmployees(){
        this._empService.GetCustomer().subscribe(res=>{
            console.log(res);
            this.empList=new MatTableDataSource(res);
            this.empList.sort=this.sort;
            this.empList.paginator=this.paginator;
        });

  }
  editEmployee(id:string){
    this._empService.GetCustomerById(id).subscribe(res=>{
        console.log(res);
        this._matDialog.open(EmpEditAddComponentComponent);
    })

  }
  deleteEmployee(id:string){
     this._empService.DeleteEmployee(id).subscribe({
       next:(res)=>{
          alert("Deleted "+id+" successfully")
          this.GetEmployees()
       },
       error:(res)=>{
        alert("Error happened while deleting")
       }
      
     })
  }
  // addItem(emp:any){
  //   this.empList.push(emp);
  //   console.log(this.empList)
  // }
}
