import { useTranslations } from 'next-intl';
const ipPattern = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;

export default function useVaildations() {
  const t = useTranslations();
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
  };
}
