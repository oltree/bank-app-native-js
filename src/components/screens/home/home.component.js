import { ScreenComponent } from '@/core/component';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';

import styles from './home.module.scss';
import template from './home.template.html';

export class Home extends ScreenComponent {
  constructor() {
    super({ title: 'Home' });
  }

  render() {
    const element = RenderService.htmlToElement(
      template,
      [
        new Button({
          children: 'Send',
          onClick: () => alert('Hey!'),
        }),
        new Field({
          name: 'test',
          placeholder: 'Enter email',
        }),
      ],
      styles
    );

    $R(element).find('h1').css('color', 'green');

    return element;
  }
}
