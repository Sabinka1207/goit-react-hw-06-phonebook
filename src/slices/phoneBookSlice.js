import { createSlice } from "@reduxjs/toolkit";

export const phoneBookSlice = createSlice({
    name: 'contacts',
    initialState: {
        value: [],
        filter: ""
    },
    reducers: {
        remove: (state, action) => { state.value = state.value.filter((contact) => contact.id !== action.payload)},
        add: (state, action) => {state.value = action.payload},
        search: (state, action) => {state.filter = action.payload}
    }
})

export const { remove, add, search} = phoneBookSlice.actions

export default phoneBookSlice.reducer