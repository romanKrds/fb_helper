import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

@Component({
  selector: 'app-fb-post-card',
  standalone: true,
  imports: [
    DatePipe,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './fb-post-card.component.html',
})
export class FbPostCardComponent {
  @Input() isLoading: boolean | undefined;
  @Output() send = new EventEmitter<void>;
  today = Date();
  author = 'Roman Kordas';

  onSend() {
    this.send.emit();
  }
}
