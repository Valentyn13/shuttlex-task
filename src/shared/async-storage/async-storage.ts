import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStoragePackage } from './async-storage.package';

const asyncStorage = new AsyncStoragePackage(AsyncStorage);

export { asyncStorage };
