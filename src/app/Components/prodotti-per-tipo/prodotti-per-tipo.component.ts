import { Component } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoProdottoService } from '../../services/tipo-prodotto.service';

@Component({
  selector: 'app-prodotti-per-tipo',
  standalone: false,

  templateUrl: './prodotti-per-tipo.component.html',
  styleUrl: './prodotti-per-tipo.component.css'
})
export class ProdottiPerTipoComponent {
  response: any;
  data: any;
  tpNome: any;
  showSearch: boolean = false;
  searchQuery: string = '';
  id: any;
  page: number = 1;
  itemsPerPage: number = 9;

  constructor(private serv: ProdottiService, private router: Router, private route: ActivatedRoute, private tProdS: TipoProdottoService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      console.log("onInit prodotti");
      console.log("id tipo prodotto: " + this.id);

      this.tProdS.getTipoProdotto(this.id).subscribe((resp: any) => {
        this.tpNome = resp.dati;
      });

      this.serv.getProdottiByTipoProdotto(this.id).subscribe((resp: any) => {
        if (!resp.rc) {
          alert("Errore nella pagina");
        }
        console.log("subscribe prodotti ");
        this.response = resp;
        this.data = this.response.dati;
      });
    });
  }

  dettagliProdotto(id: number) {
    console.log(id);
    this.router.navigate(['/prodotto/', id]);
  }

  hideSearch() {
    if (this.searchQuery === '') {
      this.showSearch = false;
    }
  }

  searchProduct() {
    const query = this.searchQuery.trim();

    if (query !== '') {
      this.router.navigate(['/prodotti'], { queryParams: { nome: query } });
    } else {
      this.router.navigate(['/prodotti'], { queryParams: {} });
    }
  }
  //porta la pagina in cima
  onPageChange(event: number): void {
    this.page = event;
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }
}
