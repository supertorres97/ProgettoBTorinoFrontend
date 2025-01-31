import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  // Metodo per determinare se la navbar deve essere mostrata
  showNavbar(): boolean {
    const currentRoute = this.router.url;
    return currentRoute !== '/404';  // Non mostrare la navbar sulla pagina 404
  }

}
