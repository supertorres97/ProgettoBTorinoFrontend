import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  showErrorMessage: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Verifica se il parametro 'error' è presente nell'URL
    this.route.queryParams.subscribe(params => {
      if (params['error'] === 'true') {
        this.showErrorMessage = true;

        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      }
    });
  }


}


