import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CredenzialiService } from '../../../services/credenziali.service';



@Component({
  selector: 'app-gestione-utenti',
  standalone: false,
  
  templateUrl: './gestione-utenti.component.html',
  styleUrl: './gestione-utenti.component.css'
})
export class GestioneUtentiComponent {
 @ViewChild('credenzialiDialog') credenzialiDialog: any;

  credenzialiList: any[] = [];
  selectedCredenziali: any = {};

  constructor(private credService: CredenzialiService, private router: Router) {}

  ngOnInit(): void {
    this.loadCredenziali();
  }

  // Carica la lista delle credenziali dal backend
  loadCredenziali(): void {
    this.credService.getAllCredenziali().subscribe(
      (data:any) => {
        this.credenzialiList = Array.isArray(data.dati) ? data.dati : []; ;
      },
      (error:any) => {
        console.error('Errore nel caricamento delle credenziali:', error);
      }
    );
  }

  openCredenzialiDialog(credenziale: any): void {
    this.selectedCredenziali = { ...credenziale }; // Copia i dati per la modifica
    this.credenzialiDialog.nativeElement.showModal();
  }

  closeCredenzialiDialog(): void {
    this.credenzialiDialog.nativeElement.close();
  }

  saveCredenziali(): void {
    this.credService.updateCredenziali(this.selectedCredenziali).subscribe(
      () => {
        console.log('Credenziali aggiornate con successo');
        this.loadCredenziali(); // Ricarica la lista dopo l'aggiornamento
        this.closeCredenzialiDialog();
      },
      (error: any) => {
        console.error('Errore durante l\'aggiornamento delle credenziali:', error);
      }
    );
  }

  viewDettagliUtente(idUtente: number): void {
    this.router.navigate(['/admin/dettagli-utente/:id', idUtente]);
  }
  
}
