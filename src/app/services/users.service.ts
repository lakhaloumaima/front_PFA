import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post( environment.urlBackend + 'sessions', data );
  }

  // Assuming your backend API provides an endpoint to fetch the user's subdomain
  getSubdomain(): Observable<string> {
    // Make an HTTP request to your backend to fetch the user's subdomain
    // Adjust the API endpoint and response handling based on your backend implementation
    return this.http.get<string>('/api/user/subdomain');
  }

  // register(data:any){
  //   return this.http.post( environment.urlBackend + 'registrations/' , data)
  // }

}
