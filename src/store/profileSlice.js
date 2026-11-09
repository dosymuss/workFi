import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUserById, patchUser } from "../api/auth";


export const fetchMyProfile = createAsyncThunk(
    "fetchMyProfile/profile",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getUserById(id)
            console.log(res.data);

            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const fetchPatchMyProfile = createAsyncThunk(
    "fetchPatchMyProfile/profile",
    async (obj, { rejectWithValue }) => {
        try {
            const res = await patchUser(obj.id, obj.data)
            console.log(res.data);

            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


const profileSlice = createSlice({
    name: "profile",
    initialState: {
        my_profile: null
    },
    reducers: {
        setNewTech: (state, action) => {
            state.my_profile = {
                ...state.my_profile,
                technologies: [...action.payload]
            }
        }
    },
    extraReducers: build => {
        build.addCase(fetchMyProfile.fulfilled, (state, action) => {
            state.my_profile = action.payload
        })
    }
})


export const { setNewTech} = profileSlice.actions

export default profileSlice.reducer