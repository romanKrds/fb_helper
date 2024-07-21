import { AsyncPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Signal, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { RouterOutlet } from '@angular/router';
import { MarkdownService } from "ngx-markdown";
import { finalize, map, Observable } from "rxjs";
import { CockpitComponent } from "./components/cockpit/cockpit.component";
import { PageComponent } from "./components/page/page.component";
import { PreviewComponent } from "./components/preview/preview.component";
import { AssistantService } from "./services/assistant.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, PageComponent, CockpitComponent, PreviewComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  markdown$: Observable<string> | undefined;
  isLoading: Signal<boolean>;

  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
    private markdownService: MarkdownService,
    private assistantService: AssistantService
  ) {
    this.isLoading = this.assistantService.isDataLoading;
  }

  onTransformTranscript(transcript: string): void {
    this.markdown$ = this.assistantService.transformTranscript(transcript)
      .pipe(
        // keep line breaks
        map(markdown => markdown.replace(/(?:\r\n|\r|\n)/g, '<br>')),
        map(markdown => this.markdownService.parse(markdown) as string)
      );
  }
}
