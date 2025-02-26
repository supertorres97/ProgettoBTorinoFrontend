import { Component, ViewChild } from '@angular/core';
import { ProdottiService } from '../../../services/prodotti.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProdottoComponent } from '../../../Dialog/create-prodotto/create-prodotto.component';
import { TipoProdottoService } from '../../../services/tipo-prodotto.service';
import { UpdateProdottoComponent } from '../../../Dialog/update-prodotto/update-prodotto.component';

@Component({
  selector: 'app-gestione-prodotti',
  standalone: false,
  
  templateUrl: './gestione-prodotti.component.html',
  styleUrl: './gestione-prodotti.component.css'
})
export class GestioneProdottiComponent {

    response:any;
    data:any;
    responseTP:any;
    tipiProdotto:any;
    msg:string = '';
  
    constructor(
      private serv:ProdottiService, 
      private tprodS:TipoProdottoService,
      private dialog:MatDialog) { }
  
    ngOnInit(): void {
      console.log("onInit prodotti");
      this.loadProdotti();

      this.tprodS.listTipoProdotti()
      .subscribe((resp:any) => {
        console.log("subscribe prodotti ");
        this.responseTP = resp;
        this.tipiProdotto = this.responseTP.dati;
      });
    }
  
    loadProdotti(): void {
      this.serv.listProdotti()
      .subscribe((resp:any) => {
        console.log("subscribe prodotti ");
        this.response = resp;
        this.data = this.response.dati;
      })
    }

    createProd(){
      const enterAnimationDuration:string = '200ms';
      const exitAnimationDuration:string = '150ms';

      const dialogRef = this.dialog.open(CreateProdottoComponent, {
        width: '700px',
        enterAnimationDuration,
        exitAnimationDuration
      });

      dialogRef.afterClosed()
      .subscribe((res:any) => {
        if(res)
          window.location.reload();
    });
    }

    updateProd(prodottoUp:{}){
      const enterAnimationDuration:string = '200ms';
      const exitAnimationDuration:string = '150ms';

      const dialogRef = this.dialog.open(UpdateProdottoComponent, {
        width: '700px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: {
          prodotto: prodottoUp
        }
      });

      dialogRef.afterClosed()
      .subscribe((res:any) => {
        if(res)
          window.location.reload();
    });
    }

}
