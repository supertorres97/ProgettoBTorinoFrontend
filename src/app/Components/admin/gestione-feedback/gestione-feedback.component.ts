import { Component, inject, OnInit } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../../../Dialog/confirm-delete/confirm-delete.component';


@Component({
  selector: 'app-gestione-feedback',
  standalone: false,
  
  templateUrl: './gestione-feedback.component.html',
  styleUrl: './gestione-feedback.component.css'
})

export class GestioneFeedbackComponent implements OnInit{
  
  data:any;
  response:any;

  constructor(private feedbackS:FeedbackService, private router:Router, private dialog:MatDialog) {}

  ngOnInit(): void {
    this.feedbackS.listAllFeedback()
    .subscribe((resp:any) => {
      this.response = resp;
      this.data = this.response.dati;
    });
  }

  onDelete(id:number){

    const enterAnimationDuration:string = '200ms';
    const exitAnimationDuration:string = '150ms';

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration
    });

    dialogRef.afterClosed()
    .subscribe((res:any) => {
      if(res)
        this.deleteFeed(id);
    });
  }

  deleteFeed(id:number){
    this.feedbackS.deleteFeedback({
      id : id
    })
    .subscribe((resp:any) => {
      if(resp.rc){
        this.router.navigate(['/admin/gestione-feedback'])
        .then(() => {
          window.location.reload();
        })
      } else {
        this.response = resp.msg;
      }
    });
  }

}