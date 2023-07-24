/**
 * Represents the RQuery class for working with DOM elements.
 */
class RQuery {
  /**
   * Create a new RQuery instance.
   * @param {string|HTMLElement} selector - a CSS selector tring or a HTMLElement.
   */
  constructor(selector) {
    if (typeof selector === 'string') {
      this.element = document.querySelector(selector);

      if (!this.selector) {
        throw new Error(`Element ${selector} not found!`);
      }
    } else if (selector instanceof HTMLElement) {
      this.element = selector;
    } else {
      throw new Error('Invalid selector type!');
    }
  }

  /**
   * Find the first element that matches the specified selector within the selected element.
   * @param {string} selector - a CSS selector string to search for within the selected element.
   * @returns {RQuery} - a new RQuery instance for the given element.
   */
  find(selector) {
    const element = new RQuery(this.element.querySelector(selector));

    if (element) {
      return element;
    } else {
      throw new Error(`Element ${selector} not found!`);
    }
  }

  /**
   * Set the CSS styles of the selected element.
   * @param {string} property - the css property to set.
   * @param {string} value - the value to set for the CSS property.
   * @returns {RQuery} the currnet RQuery instance for chaining.
   */
  css(property, value) {
    if (typeof property !== 'string' || typeof value !== 'string') {
      throw new Error('Property and value must be strings!');
    }

    this.element.style[property] = value;

    return this;
  }
}

/**
 * Create a new RQuery instance for the given selector.
 * @param {string|HTMLEelement} selector - a CSS selector tring or a HTMLElement.
 * @returns {RQuery} - a new RQuery instance for the given selector.
 */
export function $R(selector) {
  return new RQuery(selector);
}
