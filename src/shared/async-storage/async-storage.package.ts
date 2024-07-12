import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageKey } from '../constants/enums/async-storage-key.enum';
type AsyncStorageType = typeof AsyncStorage;
class AsyncStoragePackage {
    private storage: AsyncStorageType;
    constructor(storage: AsyncStorageType) {
        this.storage = storage;
    }

    async setItem(key: AsyncStorageKey, value: string) {
        return await this.storage.setItem(key, value);
    }

    async getItem(key: AsyncStorageKey) {
        return await this.storage.getItem(key);
    }

    async removeItem(key: AsyncStorageKey) {
        return await this.storage.removeItem(key);
    }

    async clear() {
        return await this.storage.clear();
    }
}

export { AsyncStoragePackage };
