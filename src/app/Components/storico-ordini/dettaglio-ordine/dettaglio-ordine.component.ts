import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdineService } from '../../../services/ordine.service'; // Assicurati che il service sia corretto
import { DettaglioOrdineService } from '../../../services/dettaglio-ordine.service';

@Component({
  selector: 'app-dettaglio-ordine',
  standalone: false,
  
  templateUrl: './dettaglio-ordine.component.html',
  styleUrl: './dettaglio-ordine.component.css'
})
export class DettaglioOrdineComponent {
  idOrdine: number | null = null;
  dettagliOrdine: any; // Dati dell'ordine recuperati dal backend

  constructor(
    private route: ActivatedRoute,
    private dettOrderService: DettaglioOrdineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Prendi l'ID dell'ordine dalla URL
    this.route.paramMap.subscribe(params => {
      this.idOrdine = +params.get('id')!;  // recupero l'ID dell'ordine
      this.getOrdineDetails(this.idOrdine);
    });
  }

  // Funzione per recuperare i dettagli dell'ordine
  getOrdineDetails(id: number): void {
    this.dettOrderService.getDettagliOrdine(id).subscribe({
      next: (data: any) => {
        this.dettagliOrdine = Array.isArray(data.dati) ? data.dati : [];    //estra il valore in un array, dato che la risposta è un object
        console.log("Dettagli dell'ordine:", data);
      },
      error: (err) => {
        console.error('Errore nel recupero dei dettagli dell\'ordine', err);
      }
    });
  }
  listOrder(){
    this.router.navigate(['/ordini/', localStorage.getItem("idUtente")]);
  }
}
