import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IBikes } from './Bikes';
import { tap, catchError, map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http: HttpClient) {

   }
private bikesUrl = '/server/api/v1/bikes/';
   getBikes(): Observable<IBikes[]>{
     return this.http.get<IBikes[]>(this.bikesUrl).pipe(tap(), 
     catchError(this.handleError));
   }

   getBike(id: number): Observable<IBikes | undefined>{
    return this.http.get<IBikes>(this.bikesUrl +id)
   }

   createBikeRegistration(bike: IBikes): Observable<any>{
     let body = JSON.stringify(bike);
    return this.http.post(this.bikesUrl, body,httpOptions);
   }

   updateBikeRegistration(bike: IBikes): Observable<IBikes>{
     let body = JSON.stringify(bike);
    return this.http.put<IBikes>(this.bikesUrl + bike.id, body, httpOptions);
   }

   deleteBikeRegistration(id){
    return this.http.delete(this.bikesUrl + id);
   
   }

   private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
  if(err.error instanceof ErrorEvent ){
    errorMessage = 'Gibt es ein Fehler :' + err.error.message;
    
  }
  else{
    errorMessage = 'Server Error code '+err.status + ' , error message is '+ err.message;
  }
  console.error(errorMessage);
    return throwError(errorMessage);

}

}
