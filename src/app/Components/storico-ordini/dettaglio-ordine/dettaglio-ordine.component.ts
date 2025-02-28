import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DettaglioOrdineService } from '../../../services/dettaglio-ordine.service';

@Component({
  selector: 'app-dettaglio-ordine',
  standalone: false,

  templateUrl: './dettaglio-ordine.component.html',
  styleUrl: './dettaglio-ordine.component.css'
})
export class DettaglioOrdineComponent {
  idOrdine: number | null = null;
  dettagliOrdine: any;

  constructor(
    private route: ActivatedRoute,
    private dettOrderService: DettaglioOrdineService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idOrdine = +params.get('id')!;
      this.getOrdineDetails(this.idOrdine);
    });
  }

  getOrdineDetails(id: number): void {
    this.dettOrderService.getDettagliOrdine(id).subscribe({
      next: (data: any) => {
        this.dettagliOrdine = Array.isArray(data.dati) ? data.dati : [];
      },
      error: (err) => {
        console.error('Errore nel recupero dei dettagli dell\'ordine', err);
      }
    });
  }
  listOrder() {
    this.router.navigate(['/ordini/', localStorage.getItem("idUtente")]);
  }
}
