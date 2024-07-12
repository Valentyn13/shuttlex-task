import { http } from '../../shared/index.ts';

import { ExampleApi } from './example-api.package.ts';

export const exampleApi = new ExampleApi({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    http,
});
