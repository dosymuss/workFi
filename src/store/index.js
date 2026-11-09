import { configureStore } from "@reduxjs/toolkit"
import vacansyReducer from "./vacansySlice"
import companyReducer from "./companySlice"
import profileReducer from "./profileSlice"

export const store = configureStore({
    reducer: {
        vacansy: vacansyReducer,
        company: companyReducer,
        profile: profileReducer
    }
})