import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {

  constructor(private http:HttpClient) { }
  AddCustomer(emp:any):Observable<any>{
    return this.http.post("http://localhost:3000/Employees",emp);
  }
  GetCustomer():Observable<any>{
    return this.http.get("http://localhost:3000/Employees");
  }
  GetCustomerById(id:string):Observable<any>{
      return this.http.get("http://localhost:3000/Employees/"+id)
  }
  DeleteEmployee(id:string):Observable<any>{
    return this.http.delete("http://localhost:3000/Employees/"+id)
  }
  EditEmployee(id:string,data:any):Observable<any>{
    console.log("edit")
    return this.http.put("http://localhost:3000/Employees/"+id,data)
  }
}

