import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dettagli-user',
  standalone: false,
  
  templateUrl: './dettagli-user.component.html',
  styleUrl: './dettagli-user.component.css'
})
export class DettagliUserComponent {
  @ViewChild('modificaUtenteDialog') modificaUtenteDialog: any;

  utente: any = {};
  idUtente!: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idUtente = +params['id']; // Ottieni l'ID dall'URL
      this.loadUtente();
    });
  }

  // Carica i dettagli dell'utente dal backend
  loadUtente(): void {
    this.userService.getUtente(this.idUtente).subscribe(
      (data: any) => {
        this.utente = data.dati;
      },
      (error: any) => {
        console.error('Errore nel caricamento dei dettagli utente:', error);
      }
    );
  }

  openModificaUtenteDialog(): void {
    this.modificaUtenteDialog.nativeElement.showModal();
  }

  closeModificaUtenteDialog(): void {
    this.modificaUtenteDialog.nativeElement.close();
  }

  saveUtente(): void {
    this.userService.updateUserProfile(this.utente).subscribe(
      (resp: any) => {
        console.log('Utente aggiornato con successo', resp);
        this.loadUtente(); // Ricarica i dettagli dopo l'aggiornamento
        this.closeModificaUtenteDialog();
      },
      (error:any) => {
        console.error('Errore durante l\'aggiornamento dell\'utente:', error);
      }
    );
  }

  listAllUser(){
    this.router.navigate(['/admin/gestione-utenti/']);
  }
}
