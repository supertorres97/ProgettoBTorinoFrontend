import { Component, Input, OnInit } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';

@Component({
  selector: 'app-sez-feedback',
  standalone: false,
  
  templateUrl: './sez-feedback.component.html',
  styleUrl: './sez-feedback.component.css'
})
export class SezFeedbackComponent implements OnInit {

  @Input() productId!: number; // ID del prodotto passato dal componente genitore
  feedbacks: any[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    if (this.productId) {
      this.loadFeedbacks();
    }
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbackByProductId(this.productId).subscribe(
      data => {
        this.feedbacks = data;
      },
      error => {
        console.error('Errore nel recupero dei feedback:', error);
      }
    );
  }
}