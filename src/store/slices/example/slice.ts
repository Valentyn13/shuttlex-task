import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SliceName } from '../../../shared';

import { getExampleData } from './actions';

type State = {
    data: {
        userId: number;
        id: number;
        title: string;
        completed: boolean;
    } | null;
    error: null | string;
};

const initialState: State = {
    data: null,
    error: null,
};

const { reducer, actions } = createSlice({
    initialState,
    name: SliceName.EXAMPLE,
    reducers: {
        setExample(
            state,
            action: PayloadAction<{
                userId: number;
                id: number;
                title: string;
                completed: boolean;
            }>,
        ) {
            state.data = action.payload;
        },
    },
    extraReducers(buider) {
        buider.addCase(getExampleData.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        buider.addCase(getExampleData.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    },
});

export { actions, reducer };
