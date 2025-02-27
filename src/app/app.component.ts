import { Component } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { SpinnerService } from './services/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  showSpinner = false;

  constructor(private router: Router, private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.spinnerService.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.spinnerService.hide();
      }
    });

    this.spinnerService.spinnerState$.subscribe(state => {
      this.showSpinner = state;
    });

    // Inizializza l'app con eventuali fetch di configurazione
    this.spinnerService.initializeApp().then(() => {
      console.log('App inizializzata');
    });
  }

}
