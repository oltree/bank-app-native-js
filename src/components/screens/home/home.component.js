import { ScreenComponent } from '@/core/component';

export class Home extends ScreenComponent {
  constructor() {
    super({ title: 'Home' });
  }

  render() {
    return '<p>Home</p>';
  }
}
