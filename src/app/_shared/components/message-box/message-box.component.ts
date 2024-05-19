import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.scss',
})
export class MessageBoxComponent implements OnInit {
  @Input() message!: string;

  ngOnInit(): void {
    const p = document.createElement('p');
    p.innerHTML = this.message;
    document.querySelector('.content_')!.insertAdjacentElement('afterbegin', p);
  }
}
