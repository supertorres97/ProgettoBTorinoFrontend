import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoProdottoService } from '../../services/tipo-prodotto.service';

@Component({
  selector: 'app-creazione-prodotto',
  standalone: false,
  
  templateUrl: './creazione-prodotto.component.html',
  styleUrl: './creazione-prodotto.component.css'
})
export class CreazioneProdottoComponent implements OnInit{

  msg:string = "";
  createProductForm:any;
  selectImage:File | null = null;
  responseTP:any;
  tipiProdotto:any;

  constructor(private prodS:ProdottiService, private router:Router, private tprodS:TipoProdottoService){}
 
  ngOnInit(): void {
    console.log("creteProduct");
    this.createProductForm = new FormGroup({
      nomeProdotto: new FormControl(null, Validators.required),
      descrizione: new FormControl(null, Validators.required),
      peso: new FormControl(null, Validators.required),
      prezzo: new FormControl(null, Validators.required),
      stock: new FormControl(null, Validators.required),
      disponibile: new FormControl(null),
      immagine: new FormControl(null, Validators.required),
      tipoProdotto: new FormControl(null, Validators.required)
    });

    this.tprodS.listTipoProdotti()
      .subscribe((resp:any) => {
        console.log("subscribe prodotti ");
        this.responseTP = resp;
        this.tipiProdotto = this.responseTP.dati;
      });
  }


  //serve a prendere il nome del file immagine
  onFileSelected(event:Event):void{
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.selectImage = input.files[0];
      this.createProductForm.get('immagine')?.setValue(this.selectImage.name);
    }
  }

  onSubmit() {
    console.log("submit");

    console.log(this.createProductForm.value.immagine);
    console.log(this.createProductForm.value.tipoProdotto);
    this.prodS.createProdotto({
      nome:this.createProductForm.value.nomeProdotto,
      descrizione:this.createProductForm.value.descrizione,
      peso:this.createProductForm.value.peso,
      prezzo:this.createProductForm.value.prezzo,
      stock:this.createProductForm.value.stock,
      disponibile:this.createProductForm.value.disponibile,
      img:this.createProductForm.value.immagine,
      tipo:this.createProductForm.value.tipoProdotto
    }).subscribe((resp:any) => {
      if(resp.rc){
        this.router.navigate(['prodotti']);
      } else {
        this.msg = resp.msg;
      }
    });
  }
  
}
