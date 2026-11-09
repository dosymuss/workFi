import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { editVacansy, getSearchVacansy, getVacansies, getVacansyById } from "../api/vacansy"


const clientId = localStorage.getItem("clientId")

export const fetchAllVacansy = createAsyncThunk(
    "fetchAllVacansy/vacansy",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getVacansies()
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchVacansyById = createAsyncThunk(
    "fetchVacansyById/vacansy",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getVacansyById(id)
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchSearchVacansy = createAsyncThunk(
    "fetchSearchVacansy/vacansy",
    async (value, { rejectWithValue }) => {
        try {
            const res = await getSearchVacansy(value)
            console.log(res.data);

            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const patchVacansy = createAsyncThunk(
    "fetchSearchVacansy/vacansy",
    async (obj, { rejectWithValue }) => {
        try {
            const res = await editVacansy(obj.id, obj.data)
            console.log(res.data);

            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)



const vacansySlice = createSlice({
    name: "vacansy",
    initialState: {
        allVacansies: [],
        vacansy: null,
        searchVacansy: null,
        searchVacansyStatus: null,
        allVacansiesStatus: null,
        vacansyStatus: null,
        likedVacansies: [],
        my_vacansyis: [],
        mainVacansy: []


    },
    reducers: {
        setSearchVacansy: (state, action) => {
            state.searchVacansy = null
        },

        filterVacansiesByTechnologies: (state, action) => {
            const selectedTechnologies = action.payload;
            

            // ✅ если нет технологий — отдаем все
            if (!selectedTechnologies || selectedTechnologies.length === 0) {
                state.mainVacansy = state.allVacansies;
                return;
            }

            const filtered = state.allVacansies.filter(vacansy =>
                vacansy.technologies?.some(tech => selectedTechnologies.includes(tech))
            );

            // если совпадений нет — все вакансии
            state.mainVacansy = filtered.length > 0 ? filtered : state.allVacansies;
        }



    },
    extraReducers: build => {
        build.addCase(fetchAllVacansy.pending, (state, action) => {
            state.allVacansiesStatus = "pending"
        })
        build.addCase(fetchAllVacansy.fulfilled, (state, action) => {
            state.allVacansies = action.payload
            state.allVacansiesStatus = "fulfilled"
            state.likedVacansies = action.payload.filter((item) => item.who_liked?.includes(clientId))
            state.my_vacansyis = action.payload.filter((item) =>
                item.response?.some(response => response.userId === clientId)
            )

            console.log(state.likedVacansies);
            console.log(clientId);
        })
        build.addCase(fetchAllVacansy.rejected, (state, action) => {
            state.allVacansies = action.payload
            state.allVacansiesStatus = "rejected"
        })
        build.addCase(fetchVacansyById.pending, (state, action) => {
            state.vacansyStatus = "pending"
        })
        build.addCase(fetchVacansyById.fulfilled, (state, action) => {
            state.vacansy = action.payload
            state.vacansyStatus = "fulfilled"
        })
        build.addCase(fetchVacansyById.rejected, (state, action) => {
            state.vacansy = action.payload
            state.vacansyStatus = "rejected"
        })
        build.addCase(fetchSearchVacansy.pending, (state, action) => {
            state.searchVacansyStatus = "pending"
        })
        build.addCase(fetchSearchVacansy.fulfilled, (state, action) => {
            state.searchVacansy = action.payload
            state.searchVacansyStatus = "fulfilled"
        })
        build.addCase(fetchSearchVacansy.rejected, (state, action) => {
            state.searchVacansy = action.payload
            state.searchVacansyStatus = "rejected"
        })
    }
})


export const { setSearchVacansy, filterVacansiesByTechnologies } = vacansySlice.actions

export default vacansySlice.reducer