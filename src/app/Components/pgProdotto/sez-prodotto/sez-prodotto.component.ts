import { Component, OnInit} from '@angular/core';
import { ProdottoService } from '../../../services/prodotto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sez-prodotto',
  standalone: false,
  
  templateUrl: './sez-prodotto.component.html',
  styleUrl: './sez-prodotto.component.css'
})
export class SezProdottoComponent implements OnInit{

  prodotto:any;

  constructor(private serv:ProdottoService, private route:ActivatedRoute){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) {
      this.serv.getProdotto(+id).subscribe((data: any) => {
        this.prodotto = data;
      });
    }
  }

}
