import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  showErrorMessage: boolean = false;  // Flag per mostrare il messaggio di errore

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Verifica se il parametro 'error' è presente nell'URL
    this.route.queryParams.subscribe(params => {
      if (params['error'] === 'true') {
        this.showErrorMessage = true;  // Mostra il messaggio di errore

        // Nascondi il messaggio di errore dopo 2 secondi
        setTimeout(() => {
          this.showErrorMessage = false;  // Nasconde il messaggio
        }, 2000);  // Tempo di visualizzazione del popup (2 secondi)
      }
    });
  }
  
  
}


