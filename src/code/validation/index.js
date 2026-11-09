import * as yup from "yup"

export const validationRegister = yup.object().shape({
    name: yup
        .string()
        .required("Имя обязательно")
        .min(2, "Имя должно содержать минимум 2 символа")
        .max(30, "Имя не должно превышать 30 символов"),

    email: yup
        .string()
        .required("Email обязателен")
        .email("Введите корректный email"),

    password: yup
        .string()
        .required("Пароль обязателен")
        .min(6, "Пароль должен содержать минимум 6 символов")
        .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
        .matches(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Пароль должен содержать хотя бы один специальный символ"),

    confirm_password: yup
        .string()
        .required("Подтверждение пароля обязательно")
        .oneOf([yup.ref("password")], "Пароли не совпадают"),
});

export const validationLogin = yup.object().shape({
  email: yup
    .string()
    .required("Email обязателен")
    .email("Введите корректный email"),

  password: yup
    .string()
    .required("Пароль обязателен")
    .min(6, "Пароль должен содержать минимум 6 символов"),
});


export const validationVacansy = yup.object().shape({
    name: yup.string().required("Поле обязательно для заполнения"),
    price: yup.string().required("Поле обязательно для заполнения"),
    aboutVacansy: yup.string().required("Поле обязательно для заполнения"),
    requirements: yup.string().required("Поле обязательно для заполнения"),
})