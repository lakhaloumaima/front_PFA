// chat-route-guard.service.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // const expectedSubdomain = route.data.expectedSubdomain; // Get the expected subdomain from route data
    const subdomain = sessionStorage.getItem('subdomain');
    const subdomainn = localStorage.getItem('subdomain');


    // Check if the user's subdomain matches the expected subdomain for accessing the chat route
    if ( subdomain != null  ) {
      return true; // Allow access to the /chat route
    } else {
      // Redirect to the home page or display an error message
      this.router.navigate(['/home']);
      return false;
    }
  }
}
