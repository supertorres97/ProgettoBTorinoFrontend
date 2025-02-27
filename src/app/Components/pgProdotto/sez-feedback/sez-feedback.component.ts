import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import { OrdineService } from '../../../services/ordine.service';
import { AuthService } from '../../../services/auth.service';

interface Rate {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sez-feedback',
  standalone: false,
  
  templateUrl: './sez-feedback.component.html',
  styleUrl: './sez-feedback.component.css',
  host: { 'ngSkipHydration': '' } // <--- Salta la Hydration
})
export class SezFeedbackComponent implements OnInit {

  logged: boolean = false;
  update: boolean = false;
  show: boolean = false;

  selectedValue!: string;
  response:any;
  data:any;
  msg!: string;
  id: any;
  utId: any;

  feedbackForm: any;

  constructor(
    private serv: FeedbackService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private authS: AuthService
  ) {}
  
  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.utId = this.authS.getIdUtente();

    console.log("onInit feedback");

    if(this.id){
    this.serv.listFeedback(this.id)
      .subscribe((resp:any) => {
        console.log("subscribe feedback");
        this.response = resp;
        this.data = this.response.dati;
      })
    }

    if(this.utId !== null){
      this.logged = true;
      this.serv.getByUtenteProdotto(this.utId, this.id)
      .subscribe((resp:any) => {
        if(!resp.rc){
          this.update = false;
          console.log("Update a: " + this.update);
        }else{
          this.update = true;
          console.log("Update a: " + this.update);
        }
      })
    }

    this.feedbackForm = new FormGroup({
      descrizione: new FormControl(null, Validators.required),
      valutazione: new FormControl(null, Validators.required)
    })

    this.show = false;
  }

  onSubmit(){

    if (!this.utId) {
      this.router.navigate(['/login']);
      return; 
  } 

    const feedReq = {
      utente: this.utId,
      prodotto: this.id,
      descrizione: this.feedbackForm.value.descrizione,
      voto: this.feedbackForm.value.valutazione
    };
    
    this.serv.create(feedReq)
    .subscribe((resp: any) => {
      if(resp.rc){
        setTimeout(() => {window.location.reload();}, 500);
      } else {
        this.msg = resp.msg;
      }
    })
  }

  

  getCakeArray(voto: string | undefined): any[] {
    const ratings: { [key: string]: number } = {
        'UNO': 1,
        'DUE': 2,
        'TRE': 3,
        'QUATTRO': 4,
        'CINQUE': 5
    };
    return new Array(ratings[voto ?? 'UNO'] || 0); // Restituisce un array con il numero corretto di fette
  }

  rating: Rate[] = [
    {value: 'UNO', viewValue: 'Una Fetta'},
    {value: 'DUE', viewValue: 'Due Fette'},
    {value: 'TRE', viewValue: 'Tre Fette'},
    {value: 'QUATTRO', viewValue: 'Quattro Fette'},
    {value: 'CINQUE', viewValue: 'Cinque Fette'},
  ];
}