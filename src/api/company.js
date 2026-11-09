import axios from "axios"
import { vacansyInstance } from "./vacansy"


export const companyInstance = axios.create({
    baseURL: "http://localhost:3004/companies"
})


export const registerCompany = async (obj) => {
    try {
        const res = await companyInstance.post("", obj)
        return res
    } catch (error) {
        throw error
    }
}

export const getAllCompany = async () => {
    try {
        const res = await companyInstance.get("")
        return res
    } catch (error) {
        throw error
    }
}


export const getCompanyById = async (id) => {
    try {
        const res = await companyInstance.get(`/${id}`)
        return res
    } catch (error) {
        throw error
    }
}


export const editCompany = async (id, obj) => {
    try {
        const res = await companyInstance.patch(`/${id}`, obj)
        return res
    } catch (error) {
        throw error
    }
}


export const getMyVacansies = async (id) => {
    try {
        const res = await vacansyInstance.get(`?companyId=${id}`)
        return res
    } catch (error) {
        throw error
    }
}
