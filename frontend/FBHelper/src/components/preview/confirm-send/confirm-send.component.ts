import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-send',
  standalone: true,
  imports: [],
  templateUrl: './confirm-send.component.html',
})
export class ConfirmSendComponent {
  @Input() content: string | undefined;
  @Output() confirm = new EventEmitter<boolean>;

  onConfirm(value: boolean): void {
    this.confirm.emit(value);
  }
}
