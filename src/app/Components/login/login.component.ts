import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  logged: boolean = false;

  constructor(private usr: UserService, private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    // Initialize the form with two controls: username and password
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.usr.signin({
        username: this.loginForm.value.username,
        pwd: this.loginForm.value.password
      }).subscribe((resp: any) => {
        this.logged = resp.logged;
        if (resp.logged) {
          this.auth.setAutentificated();
          if (resp.role === "ADMIN") {
            this.auth.setAdmin();
          } else {
            this.auth.setUser();
          }
          this.router.navigate(["/home"]);
        }
      });
    } else {
      alert('Perfavore, compila tutti.');
    }
  }
}