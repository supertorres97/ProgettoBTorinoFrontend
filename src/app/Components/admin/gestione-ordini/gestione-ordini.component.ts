import { Component, HostListener } from '@angular/core';
import { OrdineService } from '../../../services/ordine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestione-ordini',
  standalone: false,

  templateUrl: './gestione-ordini.component.html',
  styleUrl: './gestione-ordini.component.css'
})
export class GestioneOrdiniComponent {
  ordini: any[] = [];
  ordineInModifica: number | null = null;
  statiDisponibili = ["Confermato", "Spedito", "Consegnato", "Annullato", "InElaborazione"];

  constructor(private ordineService: OrdineService,
    private router: Router) { }


  ngOnInit(): void {
    this.caricaOrdini();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isClickInside = target.closest('tr') !== null;
    if (!isClickInside) {
      this.ordineInModifica = null;
    }
  }

  caricaOrdini(): void {
    this.ordineService.getAllOrdini().subscribe({
      next: (data: any) => {
        console.log("Dati ricevuti:", data);
        this.ordini = Array.isArray(data.dati) ? data.dati : [];
      },
      error: (err) => console.error('Errore nel recupero degli ordini', err)
    });
  }

  dettagliOrdine(id: number): void {
    this.router.navigate(['/admin/dettagli-ordine/', id]);
  }

  modificaOrdine(ordine: any): void {
    this.ordineInModifica = ordine.id;
  }


  salvaModifica(ordine: any): void {
    const ordineAggiornato = {
      id: ordine.id,
      status: ordine.status
        ? ordine.status.charAt(0).toUpperCase() + ordine.status.slice(1).toLowerCase()
        : null,
      totale: ordine.totale || null
    };

    console.log("Dati inviati al backend:", ordineAggiornato);

    this.ordineService.updateOrdine(ordineAggiornato).subscribe({
      next: (response) => {
        console.log("Ordine aggiornato con successo:", response);
        this.ordineInModifica = null;
      },
      error: (err) => {
        console.error("Errore nell'aggiornamento dell'ordine", err);
      }
    });
  }


  annullaModifica(): void {
    this.ordineInModifica = null;
  }



}
