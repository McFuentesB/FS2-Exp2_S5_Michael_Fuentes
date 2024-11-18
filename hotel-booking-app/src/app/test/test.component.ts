import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <div>
      <h1>{{ title }}</h1>
      <button (click)="increment()">Increment</button>
      <p>{{ counter }}</p>
    </div>
  `
})
export class TestComponent {
  title = 'Test Component';
  counter = 0;

  increment() {
    this.counter++;
  }

  reset() {
    this.counter = 0;
  }

  double() {
    this.counter *= 2;
  }
}
