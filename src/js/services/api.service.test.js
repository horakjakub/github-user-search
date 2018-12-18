import { ApiService, DEFAULT_API_ADRESS } from "./api.service";

function successRequestMock(data) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(data)}, 0);
    });
}

const responseDataMock = {
    data: {
        items: [
            'someItem'
        ]
    }
};

const axiosInstanceMock = {
    get: jest.fn().mockReturnValue(successRequestMock(responseDataMock))
};

const axiosMock = {
    create: jest.fn().mockReturnValue(axiosInstanceMock)
};

describe('ApiService', () => {
    let apiService;

    beforeAll(()=>{
        apiService = new ApiService(axiosMock);
    });

    describe('init()', () => {
        it('should call `create` method on provided http client', () => {
            expect(axiosMock.create).toHaveBeenCalledTimes(1);
            expect(axiosMock.create).toHaveBeenCalledWith({
                baseURL: DEFAULT_API_ADRESS,
                timeout: expect.any(Number),
            });
        });

        it('should bind `http` client with provided instance', () => {
            expect(apiService.http).toBe(axiosInstanceMock);
        });
    });

    describe('get()', () => {
        it('should call `get` method on `http` object with provided string', () => {
            apiService.get('someString');

            expect(apiService.http.get).toHaveBeenCalledWith('someString');
        });

        it('should call `parseResponse()` method from successfully resolved request', async () => {
            apiService.parseResponse = jest.fn();

            expect.assertions(1);
            await apiService.get();

            expect(apiService.parseResponse).toHaveBeenCalledWith(responseDataMock);
        });
    });

    describe('getUsersByName()', () => {
        it('should call `get()` method with passed param, and string `search/users?q=`', () => {
            apiService.getUsersByName('someString');

            expect(apiService.http.get).toHaveBeenCalledWith('search/users?q=someString');
        });
    });

    describe('getRepositoriesByUserName()', () => {
        it('should call `get()` method with passed param, and string `search/repositories?q=user:`', () => {
            apiService.getRepositoriesByUserName('someString');

            expect(apiService.http.get).toHaveBeenCalledWith('search/repositories?q=user:someString');
        });
    });
});