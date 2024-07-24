import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-cockpit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cockpit.component.html',
})
export class CockpitComponent {
  @Input() isLoading: boolean = false;
  @Output() transform = new EventEmitter<string>;

  form: FormGroup;
  promptSample = `
    [00:00:00] [Host]: Good afternoon, everyone! Welcome to our special webinar on sustainable living practices. We're thrilled to have you all here today.
    [00:00:08] [Speaker]: Thank you, Jamie. Today, we'll explore practical tips and strategies to live more sustainably. Let's start with reducing waste.
    [00:00:18] [Speaker]: One simple way to reduce waste is by composting. By composting your organic waste, you can significantly decrease the amount of trash going to landfills and create nutrient-rich soil for your garden.
    [00:00:30] [Speaker]: Next, let's discuss energy conservation. Switching to energy-efficient appliances and using renewable energy sources like solar power can drastically cut down your carbon footprint.
    [00:00:45] [Speaker]: Finally, sustainable transportation options, such as biking, carpooling, or using public transport, can help reduce greenhouse gas emissions and promote a healthier environment.
  `
  maxTranscriptLength = Math.ceil(12 / 10) * 10;
  copied = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.max(this.maxTranscriptLength)]]
    });
  }

  onSubmit() {
    const value = this.form.get('content')?.value;
    this.transform.emit(value.trim());
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.promptSample.trim().replace(/ {4}/g, '')).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false,1500)
    });
  }
}
