import { AsyncPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { RouterOutlet } from '@angular/router';
import { MarkdownService } from "ngx-markdown";
import { map, Observable } from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title: SafeHtml;
  markdown = "\n                        What an incredible day at our annual tech conference! 🌟 We explored the latest advancements in artificial intelligence and how they're shaping our future! \n\n                        Here are some key highlights:\n                        - **AI in Healthcare:** Early disease diagnosis is saving lives by identifying symptoms sooner!\n                        - **AI in Transportation:** Self-driving cars and smart traffic systems are making our journeys safer and more efficient.\n                        - **AI in Education:** Personalized learning experiences are helping students succeed and making education more accessible.\n\n                        We’re excited for what’s next! Have any questions about these groundbreaking topics? Drop them in the comments! 💬 #TechConference #AIRevolution #Innovation"
  html;

  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
    private markdownService: MarkdownService
  ) {
    this.html = this.markdownService.parse(this.markdown)
    this.title = this.domSanitizer.bypassSecurityTrustHtml("\n                        What an incredible day at our annual tech conference! 🌟 We explored the latest advancements in artificial intelligence and how they're shaping our future! \n\n                        Here are some key highlights:\n                        - **AI in Healthcare:** Early disease diagnosis is saving lives by identifying symptoms sooner!\n                        - **AI in Transportation:** Self-driving cars and smart traffic systems are making our journeys safer and more efficient.\n                        - **AI in Education:** Personalized learning experiences are helping students succeed and making education more accessible.\n\n                        We’re excited for what’s next! Have any questions about these groundbreaking topics? Drop them in the comments! 💬 #TechConference #AIRevolution #Innovation".replace(/(?:\r\n|\r|\n)/g, '<br>'));
    // this.title = this.http.get('https://s904b4dcce.execute-api.us-east-1.amazonaws.com/dev/assistant')
    //   .pipe(
    //     map((resp: any) => resp.variable)
    //   )
  }

  ngOnInit() {
    // const headers = {
    //   'Content-Type': 'application/json'
    // };
  }
}
