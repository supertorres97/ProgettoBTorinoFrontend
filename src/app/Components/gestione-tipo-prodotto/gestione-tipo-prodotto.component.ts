import { Component, OnInit } from '@angular/core';
import { TipoProdottoService } from '../../services/tipo-prodotto.service'; // Assicurati di avere questo servizio
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gestione-tipo-prodotto',
  templateUrl: './gestione-tipo-prodotto.component.html',
  styleUrls: ['./gestione-tipo-prodotto.component.css'],
  standalone: false
})
export class GestioneTipoProdottoComponent implements OnInit {
  tipoProdotti: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private tipoProdottoService: TipoProdottoService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isLoading = true;
    console.log("tipo prodotti list");
    this.tipoProdottoService.listTipoProdotti()
      .subscribe({
        next: (resp: any) => {
          this.tipoProdotti = resp.dati;
          this.isLoading = false;
        },
        error: (error: any) => {
          this.errorMessage = 'Errore nel recupero dei tipi di prodotto';
          this.isLoading = false;
        }
      });
  }
}
