import { createTranslator } from 'use-intl';
import { getCookie } from 'cookies-next';

const ipPattern = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;

export const createValidations = () => {
  const currentLocale = getCookie('NEXT_LOCALE');
  const currentMessages = require(`../locales/${currentLocale || 'en'}.json`);
  const t = createTranslator({ locale: currentLocale, messages: currentMessages });
  return {
    required: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
    },
    name: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      minLength: {
        value: 2,
        message: `${t('general.validation_msg.min')} ${2}`,
      },
      maxLength: {
        value: 20,
        message: `${t('general.validation_msg.max')} ${20}`,
      },
    },
    name_not_required: {
      minLength: {
        value: 2,
        message: `${t('general.validation_msg.min')} ${2}`,
      },
      maxLength: {
        value: 20,
        message: `${t('general.validation_msg.max')} ${20}`,
      },
    },
    email: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: t('general.validation_msg.email'),
      },
    },
    withdrawalEmail: ({ allowToValidate }) => ({
      required: {
        value: allowToValidate,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: t('general.validation_msg.email'),
      },
    }),
    password: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      minLength: {
        value: 6,
        message: `${t('general.validation_msg.min')} ${6}`,
      },
      // maxLength: {
      //   value: 10,
      //   message: `${t('general.validation_msg.max')} ${10}`,
      // },
    },
    confirmPassword: ({ passwordVal }) => ({
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      validate: (confirmPasswordVal) => {
        if (passwordVal != confirmPasswordVal) {
          return t('general.validation_msg.confirm_password');
        }
      },
    }),
    editPassword: {
      required: {
        value: false,
      },
      minLength: {
        value: 6,
        message: `${t('general.validation_msg.min')} ${6}`,
      },
    },
    number_not_required: {
      pattern: {
        value: /^[+]?(\d+(\.\d*)?|\.\d+)$/,
        message: t('general.validation_msg.numbers'),
      },
    },
    editConfirmPassword: ({ passwordVal }) => ({
      validate: (confirmPasswordVal) => {
        if (passwordVal && passwordVal != confirmPasswordVal) {
          return t('general.validation_msg.confirm_password');
        }
      },
    }),
    createStorePassword: {
      minLength: {
        value: 4,
        message: `${t('general.validation_msg.min')} ${4}`,
      },
    },
    ipAddress: {
      pattern: {
        value: ipPattern,
        message: t('general.validation_msg.ip_address'),
      },
    },
    phone: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^\d{7,}$/,
        message: t('general.validation_msg.phone'),
      },
    },
    port: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]?\d{1,4}|0)$/,
        message: t('general.validation_msg.port'),
      },
    },
    port_not_required: {
      pattern: {
        value: /^(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]?\d{1,4}|0)$/,
        message: t('general.validation_msg.port'),
      },
    },
    color: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
        message: t('general.validation_msg.port'),
      },
    },
    website_phone: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^\d{11}$/,
        message: t('general.validation_msg.website_phone'),
      },
    },
    referrals: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
    },
    requiredManageWebSite: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
    },
    description: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^[\s\S]{5,2000}$/,
        message: t('general.validation_msg.char_count'),
      },
    },
    description_not_requird: {
      pattern: {
        value: /^[\s\S]{5,2000}$/,
        message: t('general.validation_msg.char_count'),
      },
    },
    cancelReason: ({ allowToValidate }) => ({
      required: {
        value: allowToValidate,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^[\s\S]{5,2000}$/,
        message: t('general.validation_msg.char_count'),
      },
    }),
    number: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^\d+$/,
        message: t('general.validation_msg.numbers'),
      },
    },
    positive_number: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^\d*\.?\d+$/,
        message: t('general.validation_msg.numbers'),
      },
    },
    positive_number_minimum: ({ stockVal }) => ({
      validate: (minimum) => {
        if (+stockVal < +minimum) {
          return t('general.validation_msg.minimum_stock');
        }
      },
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^\d*\.?\d+$/,
        message: t('general.validation_msg.numbers'),
      },
    }),
    positive_number_request: ({ dollars }) => ({
      validate: (minimum) => {
        if (+dollars > +minimum) {
          return t('general.validation_msg.min_withdrawal_request');
        }
      },
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^\d*\.?\d+$/,
        message: t('general.validation_msg.numbers'),
      },
    }),
    positive_number_price: ({ price }) => ({
      validate: (minimum) => {
        if (+price > +minimum) {
          return t('general.validation_msg.min_price');
        }
      },
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^\d*\.?\d+$/,
        message: t('general.validation_msg.numbers'),
      },
    }),
    intOrDecimal: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^[+]?(\d+(\.\d*)?|\.\d+)$/,
        message: t('general.validation_msg.numbers'),
      },
    },
    percentageIntOrDecimal: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^(?:100(?:\.0+)?|\d{1,2}(?:\.\d+)?|\.\d+)$/,
        message: t('general.validation_msg.precentage_numbers'),
      },
    },
    ip: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])$/,
        message: t('general.validation_msg.ip'),
      },
    },
    subDomain: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      maxLength: {
        value: 63,
        message: `${t('general.validation_msg.max')} ${63}`,
      },
      pattern: {
        value: /^(?![-_])(?!.*[-_]$)(?!.*--)([a-zA-Z0-9-_]+)$/, // eslint-disable-line
        message: `
        Invalid subdomain format.\n
        It should not start or end with a hyphen or underscore,
        and no double hyphens are allowed.
        only allowed [characters,numbers,-,_]
        `,
      },
    },
    url: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /((?:https?|ftp):\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{1,63}\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)/, // eslint-disable-line

        // value: /^(https?:\/\/)?(www\.)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/, // eslint-disable-line
        message: t('general.validation_msg.url'),
      },
    },
    url_not_requied: {
      pattern: {
        value: /((?:https?|ftp):\/\/(?:www\.)?|www\.|ftp\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, // eslint-disable-line

        // value: /^(https?:\/\/)?(www\.)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/, // eslint-disable-line
        message: t('general.validation_msg.url'),
      },
    },
    optional_url: ({ allowToValidate }) => ({
      required: {
        value: allowToValidate,
        message: t('general.validation_msg.required'),
      },
      pattern: {
        value: /((?:https?|ftp):\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{1,63}\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)/, // eslint-disable-line
        message: t('general.validation_msg.url'),
      },
    }),
    productName: {
      required: {
        value: true,
        message: t('general.validation_msg.required'),
      },
      minLength: {
        value: 2,
        message: `${t('general.validation_msg.min')} ${2}`,
      },
      maxLength: {
        value: 250,
        message: `${t('general.validation_msg.max')} ${250}`,
      },
    },
    conditionalRequiredInput: ({ allowToValidate }) => ({
      required: {
        value: allowToValidate,
        message: t('general.validation_msg.required'),
      },
    }),
    conditionalRequiredInputWithValidation: ({ allowToUpdateData }) => ({
      required: {
        value: allowToUpdateData,
        message: t('general.validation_msg.required'),
      },
      minLength: {
        value: 2,
        message: `${t('general.validation_msg.min')} ${2}`,
      },
      maxLength: {
        value: 250,
        message: `${t('general.validation_msg.max')} ${250}`,
      },
    }),
    conditionalRequiredDescriptionWithValidation: ({ allowToUpdateData }) => ({
      required: {
        value: allowToUpdateData,
        message: t('general.validation_msg.required'),
      },
      minLength: {
        value: 2,
        message: `${t('general.validation_msg.min')} ${2}`,
      },
      maxLength: {
        value: 2000,
        message: `${t('general.validation_msg.max')} ${2000}`,
      },
    }),
  };
};

const handler = {
  get: function (target, prop) {
    // dynamically fetch the latest validations object
    const validations = createValidations();
    return validations[prop];
  },
};
export const VALIDATIONS = new Proxy({}, handler);
