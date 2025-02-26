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
  msg:string = "";
    createProductForm:any;
    selectImage:File | null = null;
    responseTP:any;
    tipiProdotto:any;
  
    constructor(private prodS:ProdottiService, private router:Router, private tprodS:TipoProdottoService, private dialogRef:MatDialogRef<CreateProdottoComponent>){}

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
   /* 
    onSubmit() {
      console.log("Submit avviato");
    
      if (!this.createProductForm || !this.createProductForm.valid) {
        console.error("Form non valido o non inizializzato.");
        return;
      }
    
      if (this.selectImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result as string;
          const body = {
            nome: this.createProductForm.value.nomeProdotto,
            descrizione: this.createProductForm.value.descrizione,
            peso: this.createProductForm.value.peso,
            prezzo: this.createProductForm.value.prezzo,
            stock: this.createProductForm.value.stock,
            disponibile: this.createProductForm.value.disponibile,
            tipo: this.createProductForm.value.tipoProdotto,
            img: base64Image,                   // La stringa Base64
            imgName: this.selectImage?.name  // Il nome originale del file
          };
          console.log("Nome immagine:", body.imgName);
          console.log("Immagine:", body.img);

          this.prodS.createProdotto(body).subscribe({
            next: (resp: any) => {
              console.log("Risposta dal server:", resp);
              if (resp && typeof resp === 'object') {
                if (!resp.rc) {
                  this.msg = resp.msg;
                } else {
                  this.chiudi();
                }
              } else {
                console.error("Il server ha restituito un formato inaspettato:", resp);
              }
            },
            error: (err: any) => {
              console.error("Errore durante l'invio del prodotto:", err);
              if (err.error instanceof ProgressEvent) {
                console.error("Il server potrebbe aver restituito una pagina HTML invece di JSON.");
              } else {
                console.error("Dettaglio errore:", err.message);
              }
            }
          });
        };
        reader.readAsDataURL(this.selectImage);
      } else {
        console.error("Nessun file immagine selezionato.");
      }
    }
    */
    
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
    
        // Crea un FormData e aggiungi le due parti
        const formData = new FormData();
        formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));
        formData.append("img", this.selectImage, this.selectImage.name);
    
        this.prodS.createProdotto(formData).subscribe({
          next: (resp: any) => {
            console.log("Risposta dal server:", resp);
            if (resp && typeof resp === 'object' && resp.rc) {
              this.chiudi();
            } else {
              this.msg = resp.msg;
            }
          },
          error: (err: any) => {
            console.error("Errore durante l'invio del prodotto:", err);
          }
        });
      } else {
        console.error("Nessun file immagine selezionato.");
      }
    }
    

    chiudi(){
      this.dialogRef.close(true);
    }
}
