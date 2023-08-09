import { AuthService } from '@/api/auth.service';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';

import { $R } from '@/core/rquery';
import { RenderService } from '@/core/services';
import { ScreenComponent } from '@/core/component';

import styles from './auth.module.scss';
import template from './auth.template.html';

export class Auth extends ScreenComponent {
  #isTypeLogin = true;

  constructor() {
    super({ title: 'Auth' });

    this.authService = new AuthService();
  }

  #handleSubmit = (event) => {
    console.log(event.target);
  };

  #changeFormType = (event) => {
    event.preventDefault();

    $R(this.element)
      .find('h1')
      .text(this.#isTypeLogin ? 'Register' : 'Sign In');

    $R(event.target).text(this.#isTypeLogin ? 'Sign In' : 'Register');

    this.#isTypeLogin = !this.#isTypeLogin;
  };

  render() {
    this.element = RenderService.htmlToElement(
      template,
      [
        new Button({
          children: 'Submit',
        }),
      ],
      styles
    );

    $R(this.element)
      .find('#auth-inputs')
      .append(
        new Field({
          placeholder: 'Enter email',
          name: 'email',
          type: 'email',
        }).render()
      )
      .append(
        new Field({
          placeholder: 'Enter password',
          name: 'password',
          type: 'password',
        }).render()
      );

    $R(this.element).find('#change-form-type').click(this.#changeFormType);

    $R(this.element).find('form').submit(this.#handleSubmit);

    return this.element;
  }
}
