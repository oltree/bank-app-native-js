import { ScreenComponent } from '@/core/component';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { UserItem } from '@/components/ui/user-item';

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
        new UserItem({
          avatarPath:
            'https://prisma-blog-ebon.vercel.app/blog/posts/type-safe_js_with_JsDoc.png',
          name: 'Oleg',
        }),
      ],
      styles
    );

    $R(element).find('h1').css('color', 'green');

    return element;
  }
}
