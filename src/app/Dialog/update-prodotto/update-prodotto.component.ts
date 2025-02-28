import { Component, Inject } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { Router } from '@angular/router';
import { TipoProdottoService } from '../../services/tipo-prodotto.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-prodotto',
  standalone: false,
  
  templateUrl: './update-prodotto.component.html',
  styleUrl: './update-prodotto.component.css'
})
export class UpdateProdottoComponent {
    msg:string = "";
    updateProductForm:any;
    responseTP:any;
    tipiProdotto:any;
    prodotto:any;
  
    constructor(
      private prodS:ProdottiService, 
      private router:Router, 
      private tprodS:TipoProdottoService, 
      @Inject(MAT_DIALOG_DATA) private data: any,
      private dialogRef:MatDialogRef<UpdateProdottoComponent>){
        
        if(data){
          this.prodotto = data.prodotto;
      }
    }

    ngOnInit(): void {
      console.log("creteProduct");
      console.log("tipo on init: " + this.prodotto.tipo.id);
      this.updateProductForm = new FormGroup({
        nomeProdotto: new FormControl(this.prodotto.nome, Validators.required),
        descrizione: new FormControl(this.prodotto.descrizione, Validators.required),
        peso: new FormControl(this.prodotto.peso, Validators.required),
        prezzo: new FormControl(this.prodotto.prezzo, Validators.required),
        stock: new FormControl(this.prodotto.stock, Validators.required),
        disponibile: new FormControl(this.prodotto.disponibile),
        immagine: new FormControl(this.prodotto.immagine, Validators.required),
        tipoProdotto: new FormControl(this.prodotto.tipo.id, Validators.required)
      });
  
      this.tprodS.listTipoProdotti()
        .subscribe((resp:any) => {
          console.log("subscribe prodotti ");
          this.responseTP = resp;
          this.tipiProdotto = this.responseTP.dati;
        });
    }
  
    onSubmit() {
      console.log("submit");
      console.log("tipo: " + this.updateProductForm.value.tipoProdotto);
      this.prodS.updateProdotto({
        id:this.prodotto.id,
        nome:this.updateProductForm.value.nomeProdotto,
        descrizione:this.updateProductForm.value.descrizione,
        peso:this.updateProductForm.value.peso,
        prezzo:this.updateProductForm.value.prezzo,
        stock:this.updateProductForm.value.stock,
        disponibile:this.updateProductForm.value.disponibile,
        tipo:this.updateProductForm.value.tipoProdotto
      }).subscribe((resp:any) => {
        if(!resp.rc){
          this.msg = resp.msg;
        } else {
          console.log("update a buon fine");
          this.chiudi();
        } 
      });
    }

    chiudi(){
      this.dialogRef.close(true);
    }
}
