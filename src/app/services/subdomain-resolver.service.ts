// subdomain-resolver.service.ts

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class SubdomainResolverService implements Resolve<string> {

  constructor(private userService: UsersService ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    // Fetch the user's subdomain from the backend service
    return this.userService.getSubdomain(); // Adjust this based on how you retrieve the subdomain
  }
}
