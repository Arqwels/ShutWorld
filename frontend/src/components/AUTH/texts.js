const texts = {
  label: {
    label: {
      nickname: 'Придумайте себе ник',
      email: 'Email адрес',
      password: 'Пароль',
      repeatPassword: 'Повторите пароль',
    },
    p: {
      nickname: 'Ник будет использоваться на сайте.\nМинимум 5 символов, максимум 16',
      email: 'Нужен для восстановления пароля',
      password: 'Максильмано сложный.\nМинимум 6 символа, максимум 16',
      repeatPassword: 'Убедитесь, что не допущены ошибки',
    },
  },
  input: {
    type: {
      name: 'text',
      email: 'email',
      password: 'password',
      repeatPassword: 'password',
      userAgreement: 'checkbox',
    },
    name: {
      name: 'nickname',
      email: 'email',
      password: 'password',
      repeatPassword: 'repeat-password',
      userAgreement: 'useragreement',
    },
    placeholder: {
      nickname: 'Введите свой никнейм',
      email: 'Введите свой email',
      password: 'Придумайте пароль',
      repeatPassword: 'Повторите пароль',
    },
    id: {
      userAgreement: 'useragreement'
    }
  }
};

export default texts;