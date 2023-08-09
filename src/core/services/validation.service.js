import { COLORS } from '@/config/colors.config';

import { DEFAULT_TIMEOUT } from '@/constants/time.constants';

class ValidationService {
  constructor() {
    this.errorBorderTimeout = {};
  }

  showError(element, timeout = DEFAULT_TIMEOUT) {
    element.css('border-color', COLORS.error);

    if (this.errorBorderTimeout[element]) {
      clearTimeout(this.errorBorderTimeout[element]);
    }

    this.errorBorderTimeout[element] = setTimeout(() => {
      element.css('border-color', '');
    }, timeout);
  }
}

export default new ValidationService();
