import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';
import { ActivatedRoute } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

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

  selectedValue!: string;
  response:any;
  data:any;

  constructor(private serv: FeedbackService, private route:ActivatedRoute) {}
  
  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    console.log("onInit feedback");

    if(id){
    this.serv.listFeedback(id)
      .subscribe((resp:any) => {
        console.log("subscribe feedback");
        this.response = resp;
        this.data = this.response.dati;
      })
    }
  }

  getStarImage(value: string | undefined): string {
      
    switch (value) {
      case 'UNO': return 'one-star.png';
      case 'DUE': return 'two-stars1.png';
      case 'TRE': return 'three-stars1.png';
      case 'QUATTRO': return 'four-stars1.png';
      case 'CINQUE': return 'five-stars1.png';
      default: return "Errore"; // Se il valore non è valido
    }
  }

  rating: Rate[] = [
    {value: 'UNO', viewValue: 'Una Stella'},
    {value: 'DUE', viewValue: 'Due Stelle'},
    {value: 'TRE', viewValue: 'Tre Stelle'},
    {value: 'QUATTRO', viewValue: 'Quattro Stelle'},
    {value: 'CINQUE', viewValue: 'Cinque Stelle'},
  ];
}