import axios from "axios"

export const vacansyInstance = axios.create({
    baseURL: "http://localhost:3004/vacansies"
})


export const getVacansies = async () => {
    try {
        const res = await vacansyInstance.get("")
        return res
    } catch (error) {
        throw error
    }
}

export const getVacansyById = async (id) => {
    try {
        const res = await vacansyInstance.get(`/${id}`)
        return res
    } catch (error) {
        throw error
    }
}

export const getSearchVacansy = async (q) => {
    try {
        const res = await vacansyInstance.get(`/?name=${q}`)
        return res
    } catch (error) {
        throw error
    }
}

export const createVacansy = async (obj) => {
    try {
        const res = await vacansyInstance.post(``, obj)
        return res
    } catch (error) {
        throw error
    }
}

export const editVacansy = async (id, obj) => {
    try {
        const res = await vacansyInstance.patch(`/${id}`, obj)
        return res
    } catch (error) {
        throw error
    }
}

export const deleteVacansy = async (id) => {
    try {
        const res = await vacansyInstance.delete(`/${id}`)
        return res
    } catch (error) {
        throw error
    }
}