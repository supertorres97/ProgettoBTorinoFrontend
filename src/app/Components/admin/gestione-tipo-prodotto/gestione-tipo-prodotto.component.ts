import { Component, OnInit } from '@angular/core';
import { TipoProdottoService } from '../../../services/tipo-prodotto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  createMode: boolean = false; // Modalità di creazione
  editMode: boolean = false; // Modalità di modifica
  createForm: FormGroup;
  editForm: FormGroup;
  currentTipoProdottoId: number | null = null;

  constructor(
    private tipoProdottoService: TipoProdottoService,
    private fb: FormBuilder
  ) {
    this.createForm = this.fb.group({
      descrizione: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      descrizione: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isLoading = true;
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

  onCreate() {
    this.createMode = true;
    this.editMode = false;
  }

  onEdit(tipoProdotto: any) {
    this.editMode = true;
    this.createMode = false;
    this.currentTipoProdottoId = tipoProdotto.id;
    this.editForm.patchValue({
      descrizione: tipoProdotto.descrizione
    });
  }

  onDelete(id: number) {
    const body = { id: id };
    this.tipoProdottoService.deleteTipoProdotto(body)
      
      .subscribe({
        next: () => {
          this.tipoProdotti = this.tipoProdotti.filter(tp => tp.id !== id);
        },
        error: (error: any) => {
          this.errorMessage = 'Errore nella cancellazione del tipo di prodotto. Assicurati che non sia utilizzato in altre tabelle.';
        }
      });
  }

  onSubmitCreate() {
    if (this.createForm.valid) {
      this.tipoProdottoService.createTipoProdotto(this.createForm.value)
        .subscribe({
          next: (resp: any) => {
            this.createMode = false;
            this.createForm.reset();
            window.location.reload(); // Ricarica la pagina dopo la creazione
          },
          error: (error: any) => {
            this.errorMessage = 'Errore nella creazione del tipo di prodotto';
          }
        });
    }
  }

  onSubmitEdit() {
    if (this.editForm.valid && this.currentTipoProdottoId !== null) {
      const tipoProdotto = { id: this.currentTipoProdottoId, ...this.editForm.value };
      this.tipoProdottoService.updateTipoProdotto(tipoProdotto)
        .subscribe({
          next: (resp: any) => {
            this.editMode = false;
            this.editForm.reset();
            this.currentTipoProdottoId = null;
            window.location.reload(); // Ricarica la pagina dopo la modifica
          },
          error: (error: any) => {
            this.errorMessage = 'Errore nella modifica del tipo di prodotto';
          }
        });
    }
  }

  onCancel() {
    this.createMode = false;
    this.editMode = false;
    this.createForm.reset();
    this.editForm.reset();
    this.currentTipoProdottoId = null;
  }
}
