import { Component, OnInit } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-pgProdotto',
  standalone: false,
  
  templateUrl: './pgProdotto.component.html',
  styleUrl: './pgProdotto.component.css'
})
export class PgProdottoComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    log('pgProdottoComponent');
  }
    
}