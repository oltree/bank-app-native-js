import { ChildComponent } from '../component';

class RenderService {
  /**
   * @param {string} html
   * @param {Array} components
   * @param {Object} [styles]
   * @returns {HTMLElement}
   */
  htmlToElement(html, components = [], styles) {
    // менее безопасный вариант, но используется только для передачи чистого html-шаблона без приватный данных, так что ок
    /* const template = document.createElement('template'); 
    template.innerHTML = html.trim(); // - innerHTML небезопасная тема
    const element = template.content.firstChild; */

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const element = doc.body.firstChild;

    if (styles) {
      this.#applyModuleStyles(styles, element);
    }

    this.#replaceComponentTags(element, components);

    return element;
  }

  /**
   * @param {HTMLElement} parentElement
   * @param {Array} components
   */
  #replaceComponentTags(parentElement, components) {
    const componentTagPattern = /^component-/;
    const allElements = parentElement.getElementsByTagName('*');

    for (const element of allElements) {
      const elementTagName = element.tagName.toLowerCase();

      if (componentTagPattern.test(elementTagName)) {
        const componentName = elementTagName
          .replace(componentTagPattern, '')
          .replace(/-/g, '');

        const foundComponent = components.find((component) => {
          const instance =
            component instanceof ChildComponent ? component : new component();

          return instance.constructor.name.toLowerCase() === componentName;
        });

        if (foundComponent) {
          const componentContent =
            foundComponent instanceof ChildComponent
              ? foundComponent.render()
              : new foundComponent().render();

          element.replaceWith(componentContent);
        } else {
          console.error(
            `Component "${componentName}" not found in the provided components array.`
          );
        }
      }
    }
  }

  /**
   * @param {Object} moduleStyles
   * @param {string} element
   * @returns {void}
   */
  #applyModuleStyles(moduleStyles, element) {
    if (!element) return;

    const applyStyles = (element) => {
      for (const [key, value] of Object.entries(moduleStyles)) {
        if (element.classList.contains(key)) {
          element.classList.remove(key);
          element.classList.add(value);
        }
      }
    };

    if (element.getAttribute('class')) {
      applyStyles(element);
    }

    const elements = element.querySelectorAll('*');
    elements.forEach(applyStyles);
  }
}

export default new RenderService();
