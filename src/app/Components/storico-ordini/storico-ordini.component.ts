import { Component, OnInit } from '@angular/core';
import { OrdineService, Ordine } from '../../services/ordine.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-storico-ordini',
  standalone: false,
  
  templateUrl: './storico-ordini.component.html',
  styleUrl: './storico-ordini.component.css'
})
export class StoricoOrdiniComponent {
  ordini: Ordine[] = [];
  idUtente: number | null = null; // ⚠️ Questo valore dovrebbe venire dall'autenticazione

  constructor(private orderService: OrdineService, 
              private authService: AuthService, 
              private router: Router) {}

    
  ngOnInit(): void {
    this.idUtente = this.authService.getIdUtente(); // Recupera l'ID utente dal login
    if (this.idUtente) {
      this.caricaOrdini();
    } else {
      console.warn('Nessun utente autenticato');
    }
  }

  caricaOrdini(): void {
    if (this.idUtente !== null) {
      this.orderService.getOrdiniByUtente(this.idUtente).subscribe({
        next: (data:any) => {
          console.log("Dati ricevuti:", data);
          this.ordini = Array.isArray(data.dati) ? data.dati : []; // Estrai correttamente l'array
        },
        error: (err) => console.error('Errore nel recupero degli ordini', err)
      });
    }
  }

  dettagliOrdine(id: number){
    this.router.navigate(['/dettagli-ordine/', id]);
  }

  annullaOrdine(id: number): void{
    if (confirm("Sei sicuro di voler annullare questo ordine?")) {
      this.orderService.cancelOrder(id).subscribe({
        next: (response) => {
          console.log("Ordine annullato con successo:", response);
          
          this.ordini = this.ordini.map(ordine => 
            ordine.id === id ? { ...ordine, status: "Annullato" } : ordine
          );
        },
        error: (err) => {
          console.error("Errore durante l'annullamento dell'ordine:", err);
          alert("Si è verificato un errore durante l'annullamento dell'ordine.");
        }
      });
    }
  }




}
