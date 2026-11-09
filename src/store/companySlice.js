import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { editCompany, getCompanyById, getMyVacansies } from "../api/company"



export const fetchCompanyById = createAsyncThunk(
    "fetchCompanyById/company",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getCompanyById(id)
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const patchCompany = createAsyncThunk(
    "patchCompany/company",
    async (obj, { rejectWithValue }) => {
        try {
            const res = await editCompany(obj.id, obj.data)
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchCompanyVacansies = createAsyncThunk(
    "fetchCompanyVacansies/company",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getMyVacansies(id)
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const companySlice = createSlice({
    name: "company",
    initialState: {
        company: null,
        my_vacansies: null

    },
    reducers: {},
    extraReducers: build => {
        build.addCase(fetchCompanyById.fulfilled, (state, action) => {
            state.company = action.payload
        })
        build.addCase(fetchCompanyVacansies.fulfilled, (state, action) => {
            state.my_vacansies = action.payload
        })
    }
})


export const { } = companySlice.actions

export default companySlice.reducer