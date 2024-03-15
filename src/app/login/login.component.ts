import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageError: any

  user: User = {
    email: '',
    password: '',
  }

  constructor(  private route: Router,private usersService: UsersService ) { }

  ngOnInit(): void {
  }

  login() {

    const data = {
      user:
      {
        email: this.user.email,
        password: this.user.password,
      }

    };

    this.usersService.login(data).subscribe(
      response => {
     
        if (response.status == "unauthorized") {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User Not Found Or invalide Credentialns'
          })
        } else {


          // if (response.user.email_confirmed == true) {
            // if (response.role == "admin") {

              // sessionStorage.setItem('admindata', JSON.stringify(response));
              console.log(response);
              sessionStorage.setItem('user', JSON.stringify(response.user) );

              // Assuming your response contains the subdomain information
              const subdomain = response.subdomain;
              // Save subdomain to session storage
              sessionStorage.setItem('subdomain', subdomain);

              // Redirect to the subdomain-specific URL
              // window.location.href = `http://${subdomain}.localhost:4200/home`;

              this.route.navigate(['/home'], { queryParams: { subdomain } });


            }
            // else if (response.role == "employee") {

            //   sessionStorage.setItem('employeedata', JSON.stringify(response));
            //   console.log(response);
            //   this.route.navigate(['/dashboard-employee']);

            // }
            // else {

            //   Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'Email or Password is Incorrect!'
            //   })

            // }
          // } else {

          //   Swal.fire({
          //     icon: 'error',
          //     title: 'Oops...',
          //     text: 'Account created but not confirmed ! , Check Your Email !'
          //   })

          // }

        // }

      }, (err: HttpErrorResponse) => this.messageError = err.error.error  );

  }


}
