function validation(values) {
  let error = {};
  // const password_pattern = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
  
  // Проверка на состояние и наличие Ника

  if (values.nickname === '') {
    error.nickname = 'Введите Ник';
  } else if (values.nickname[0].length === 0) {
    error.nickname = 'Введите Ник';
  } else if (values.nickname[0].length < 4) {
    error.nickname = 'Слишком короткий ник';
  } else if (values.nickname[0].length >= 4 && values.nickname[0].length <= 16) {
    error.nickname = '';
  } else if (values.nickname[0].length > 16) {
    error.nickname = 'Слишком длинный ник';
  } else {
    error.nickname = 'Что-то пошло не так!';
  }

  if (values.password === '') {
    error.password = 'Введите Ник';
  } else if (values.password[0].length === 0) {
    error.password = 'Введите Ник';
  } else if (values.password[0].length < 4) {
    error.password = 'Слишком короткий ник';
  } else if (values.password[0].length >= 6 && values.password[0].length <= 16) {
    error.password = '';
  } else if (values.password[0].length > 16) {
    error.password = 'Слишком длинный ник';
  } else {
    error.password = 'Что-то пошло не так!';
  }


  // if (values.password === "") {
  //   error.password = "Введите паролль";
  // } else if (!password_pattern.test(values.password)) {
  //   error.password = "Неверный пароль!-";
  // } else {
  //   error.password = "";
  // }
  return error;
}

export default validation;