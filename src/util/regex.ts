/**
 * ----------------------------------------------------------------------------
 * Password validation
 * ----------------------------------------------------------------------------
 */

// has at least one lowercase letter
export const ONE_LOWERCASE = /[a-z]/;

// has at least one uppercase letter
export const ONE_UPPERCASE = /[A-Z]/;

// has at least one number
export const ONE_NUMBER = /[0-9]/;

// has at least one special-case character
// eslint-disable-next-line no-useless-escape
export const ONE_SPECIAL = /[\^$*.\[\]{}\(\)?\\\-"!@#%&\/,><\':;|_~`+=]/;
