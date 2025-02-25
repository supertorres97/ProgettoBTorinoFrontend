import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CredenzialiReq, CredenzialiService } from '../../../services/credenziali.service';
import { RuoliService } from '../../../services/ruoli.service';
import { CreazioneComponent } from '../creazione/creazione.component';
import { MatDialog } from '@angular/material/dialog';



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

  constructor(
    private credService: CredenzialiService,
    private router: Router,
    private ruoloService: RuoliService,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCredenziali();
  }

  loadCredenziali(): void {
    this.credService.getAllCredenziali().subscribe(
      (data: any) => {
        this.credenzialiList = Array.isArray(data.dati) ? data.dati : [];
        console.log('Credenziali caricate:', this.credenzialiList);
      },
      (error: any) => {
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
    if (!this.selectedCredenziali) return;
  
        const body = {
          id: this.selectedCredenziali.id,
          idUtente: this.selectedCredenziali.idUtente?.id,
          username: this.selectedCredenziali.username,
          password: this.selectedCredenziali.password,
          idRuolo: parseInt(this.selectedCredenziali.ruoli), // ID del ruolo
          attivo: this.selectedCredenziali.attivo
        };
        console.log(body);
        this.credService.updateCredenziali(body).subscribe(
          () => {
            console.log("Credenziali aggiornate con successo!");
            this.loadCredenziali();
            this.closeCredenzialiDialog();
          },
          (error: any) => {
            console.error("Errore durante l'aggiornamento delle credenziali:", error);
          }
        );

  }

  viewDettagliUtente(idUtente: number): void {
    this.router.navigate(['/admin/dettagli-utente//', idUtente]);
  }

  createUser() {
        const enterAnimationDuration: string = '200ms';
        const exitAnimationDuration: string = '150ms';
  
        const dialogRef = this.dialog.open(CreazioneComponent, {
          width: '60%',
          maxWidth: '100vw',
          height: '100%',
          enterAnimationDuration,
          exitAnimationDuration
        });
  
        dialogRef.afterClosed()
        .subscribe((res: any) => {
          if (res) {
            window.location.reload();
          }
      });
      }
  
}
