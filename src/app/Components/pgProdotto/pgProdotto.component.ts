import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-pgProdotto',
  standalone: false,
  
  templateUrl: './pgProdotto.component.html',
  styleUrl: './pgProdotto.component.css'
})
export class PgProdottoComponent implements OnInit {

  selectedProductId = 1;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
    console.log('pgProdottoComponent');
  }
    
}