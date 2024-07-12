import { Provider } from 'react-redux';
import { Slot } from 'expo-router';

import { store } from '@store/index';

const TabsLayout = () => {
    return (
        <Provider store={store.instance}>
            <Slot />
        </Provider>
    );
};

export default TabsLayout;
