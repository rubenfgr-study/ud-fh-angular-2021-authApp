import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      * {
        margin: 15px;
      }

      button {
        background-color: rgba(200, 30, 30, 0.8);
        padding: 10px;
        border-radius: 5px;
        color: white;
      }

      button:hover {
        background-color: rgba(200, 30, 30, 1);
        transform: scale(1.02);
        transition: background-color transform 300ms;
      }

      pre {
        padding: 15px;
        background-color: #333;
        color: white;
        border-radius: 5px;
      }
    `,
  ],
})
export class DashboardComponent {
  get user() {
    const user = this.authService.user;
    return user;
  }
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
