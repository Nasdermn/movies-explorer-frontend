import { useState } from 'react';

export function useFormWithValidation(initialValues) {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  //Доп функционал компонента для конкретных полей (имя и email)
  const inputValidationConfig = {
    name: {
      pattern: /^[\s\wа-яА-ЯёЁ-]{2,}$/i, // Латиница, кириллица, пробел, нижнее подчеркивание и дефис (хотя бы 2 символа)
      errorMessage:
        'Пожалуйста, введите имя с использованием только латиницы, кириллицы, пробела и дефиса, и при этом не короче двух символов.',
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Простое регулярное выражение для проверки email
      errorMessage: 'Пожалуйста, введите настоящий адрес электронной почты.',
    },
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });

    // Проверяем на соответствие регулярному выражению, если оно определено для текущего поля
    if (inputValidationConfig[name]?.pattern) {
      const isValidField = inputValidationConfig[name].pattern.test(value);
      setErrors({
        ...errors,
        [name]: isValidField ? '' : inputValidationConfig[name].errorMessage,
      });
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
    }

    setIsValid(target.closest('form').checkValidity());
  };

  return { values, handleChange, errors, isValid };
}
