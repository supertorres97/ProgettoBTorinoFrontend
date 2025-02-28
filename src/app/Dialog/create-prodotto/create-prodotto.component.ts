import { Component, ViewChild } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { Router } from '@angular/router';
import { TipoProdottoService } from '../../services/tipo-prodotto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-prodotto',
  standalone: false,

  templateUrl: './create-prodotto.component.html',
  styleUrl: './create-prodotto.component.css'
})
export class CreateProdottoComponent {
  msg: string = "";
  createProductForm: any;
  selectImage: File | null = null;
  responseTP: any;
  tipiProdotto: any;

  constructor(private prodS: ProdottiService, private router: Router, private tprodS: TipoProdottoService, private dialogRef: MatDialogRef<CreateProdottoComponent>) { }

  ngOnInit(): void {
    this.createProductForm = new FormGroup({
      nomeProdotto: new FormControl(null, Validators.required),
      descrizione: new FormControl(null, Validators.required),
      peso: new FormControl(null, Validators.required),
      prezzo: new FormControl(null, Validators.required),
      stock: new FormControl(null, Validators.required),
      disponibile: new FormControl(false),
      immagine: new FormControl(null, Validators.required),
      tipoProdotto: new FormControl(null, Validators.required)
    });

    this.tprodS.listTipoProdotti().subscribe((resp: any) => {
      this.responseTP = resp;
      this.tipiProdotto = this.responseTP.dati;
    });
  }



  //serve a prendere il nome del file immagine
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectImage = input.files[0];

      if (this.createProductForm) {
        this.createProductForm.get('immagine')?.updateValueAndValidity();
      } else {
        console.error("createProductForm non è stato inizializzato");
      }
    }
  }

  onSubmit() {
    if (!this.createProductForm || !this.createProductForm.valid) {
      console.error("Form non valido o non inizializzato.");
      return;
    }

    if (this.selectImage) {
      const productData = {
        nome: this.createProductForm.value.nomeProdotto,
        descrizione: this.createProductForm.value.descrizione,
        peso: this.createProductForm.value.peso,
        prezzo: this.createProductForm.value.prezzo,
        stock: this.createProductForm.value.stock,
        disponibile: this.createProductForm.value.disponibile,
        tipo: this.createProductForm.value.tipoProdotto
      };

      const formData = new FormData();
      formData.append("prodottoReq", new Blob([JSON.stringify(productData)], { type: "application/json" }));
      formData.append("img", this.selectImage, this.selectImage.name);
      console.log("product data:" + productData.nome);
      console.log("product data:" + productData.descrizione);
      console.log("product data:" + productData.peso);
      console.log("product data:" + productData.prezzo);


      this.prodS.createProdotto(formData).subscribe({
        next: (resp: any) => {
          if (resp && resp.rc) {
            this.chiudi();
          } else {
            this.msg = resp.msg;
          }
        },
        error: (err: any) => {
          console.error("Errore durante l'invio del prodotto:", err);

          if (err.status === 413) {
            this.msg = "Il file è troppo pesante. Carica un'immagine inferiore a 2MB.";
          } else if (err.error && err.error.message) {
            this.msg = err.error.message;
          } else {
            this.msg = "Si è verificato un errore durante la creazione del prodotto.";
          }
        }
      });
    } else {
      console.error("Nessun file immagine selezionato.");
    }
  }


  chiudi() {
    this.dialogRef.close(true);
  }
}
