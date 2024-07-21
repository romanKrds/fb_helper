import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-cockpit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cockpit.component.html',
})
export class CockpitComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Output() transform = new EventEmitter<string>;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    const value = this.form.get('content')?.value;
    this.transform.emit(value.trim());
  }
}
