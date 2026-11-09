import axios from "axios"


export const userInstance = axios.create({
    baseURL: "http://localhost:3004/users"
})


export const registerUser = async (obj) => {
    try {
        const res = await userInstance.post("", obj)
        return res
    } catch (error) {
        if (error.response) {
            // Сервер ответил с ошибкой (4xx/5xx)
            throw new Error(error.response.data?.message || "Ошибка на сервере");
        } else if (error.request) {
            // Запрос был отправлен, но нет ответа
            throw new Error("Нет ответа от сервера");
        } else {
            // Ошибка при настройке запроса
            throw new Error("Ошибка запроса: " + error.message);
        }
    }
}

export const getAllUsers = async () => {
    try {
        const res = userInstance.get("")
        return res
    } catch (error) {
        if (error.response) {
            // Сервер ответил с ошибкой (4xx/5xx)
            throw new Error(error.response.data?.message || "Ошибка на сервере");
        } else if (error.request) {
            // Запрос был отправлен, но нет ответа
            throw new Error("Нет ответа от сервера");
        } else {
            // Ошибка при настройке запроса
            throw new Error("Ошибка запроса: " + error.message);
        }
    }
}

export const getUserById = async (id) => {
    try {
        const res = userInstance.get(`/${id}`)
        return res
    } catch (error) {
        if (error.response) {
            // Сервер ответил с ошибкой (4xx/5xx)
            throw new Error(error.response.data?.message || "Ошибка на сервере");
        } else if (error.request) {
            // Запрос был отправлен, но нет ответа
            throw new Error("Нет ответа от сервера");
        } else {
            // Ошибка при настройке запроса
            throw new Error("Ошибка запроса: " + error.message);
        }
    }
}

export const patchUser = async (id, obj) => {
    try {
        const res = userInstance.patch(`/${id}`, obj)
        return res
    } catch (error) {
        if (error.response) {
            // Сервер ответил с ошибкой (4xx/5xx)
            throw new Error(error.response.data?.message || "Ошибка на сервере");
        } else if (error.request) {
            // Запрос был отправлен, но нет ответа
            throw new Error("Нет ответа от сервера");
        } else {
            // Ошибка при настройке запроса
            throw new Error("Ошибка запроса: " + error.message);
        }
    }
}