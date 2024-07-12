import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig, SliceName } from '../../../shared/index.ts';

const getExampleData = createAsyncThunk<
    {
        userId: number;
        id: number;
        title: string;
        completed: boolean;
    },
    void,
    AsyncThunkConfig
>(`${SliceName.EXAMPLE}/get-data`, async (_, { extra, rejectWithValue }) => {
    try {
        const { exampleApi } = extra;
        const a = await exampleApi.getPositions();

        return a;
    } catch (error) {
        return rejectWithValue(
            `Error while fetching data ${JSON.stringify(error)}`,
        );
    }
});

export { getExampleData };
