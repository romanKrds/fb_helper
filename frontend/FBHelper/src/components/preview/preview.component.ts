import { Component, Input, OnChanges, Signal, signal, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { NgsContenteditableModule } from "@ng-stack/contenteditable";
import { MarkdownComponent } from "ngx-markdown";
import { AssistantService } from "../../services/assistant.service";
import { ConfirmSendComponent } from "./confirm-send/confirm-send.component";
import { FbPostCardComponent } from "./fb-post-card/fb-post-card.component";

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    FbPostCardComponent,
    MarkdownComponent,
    ReactiveFormsModule,
    NgsContenteditableModule,
    ConfirmSendComponent,
  ],
  templateUrl: './preview.component.html',
})
export class PreviewComponent implements OnChanges {
  @Input() content: string | null = null;
  isLoading: Signal<boolean>;
  revisedContent = new FormControl();
  confirmChanges = signal(false);

  constructor(private assistantService: AssistantService) {
    this.isLoading = this.assistantService.isDataLoading;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      this.revisedContent.setValue(this.content);
    }
  }

  toggleConfirmationDialog() {
    this.confirmChanges.update(value => !value);
  }
}
