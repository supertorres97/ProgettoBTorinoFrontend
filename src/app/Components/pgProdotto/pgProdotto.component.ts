import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pgProdotto',
  standalone: false,
  
  templateUrl: './pgProdotto.component.html',
  styleUrl: './pgProdotto.component.css'
})
export class PgProdottoComponent implements OnInit {

  selectedProductId = 1;

  constructor() {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
    console.log('pgProdottoComponent');
  }
    
}