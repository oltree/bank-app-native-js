import { ScreenComponent } from '@/core/component';

export class NotFound extends ScreenComponent {
  constructor() {
    super({ title: 'Not found' });
  }

  render() {
    return '<p>Not found</p>';
  }
}
