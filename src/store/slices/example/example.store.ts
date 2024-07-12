import { getExampleData } from './actions.ts';
import { actions } from './slice.ts';
const allActions = {
    ...actions,
    getExampleData,
};

export { allActions as exampleActions };
export { reducer as exampleReducer } from './slice.ts';
