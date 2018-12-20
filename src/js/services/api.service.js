import axios from 'axios';

export const DEFAULT_API_ADRESS = 'https://api.github.com/';

export class ApiService {
    constructor(http){
        this.init(http);
    }

    init(http){
        this.http = http.create({
            baseURL: DEFAULT_API_ADRESS,
            timeout: 1000,
        });
    }

    get(url){
        return this.http
            .get(url)
            .catch(this.parseError)
            .then(this.parseResponse)
    }

    getUsersByName(name){
        return this.get(`search/users?q=${name}`)
    }

    getRepositoriesByUserName(name){
        return this.get(`search/repositories?q=user:${name}`)
    }

    parseResponse(response){
        return response && response.data && response.data.items ?
            response.data.items : response;
    }

    parseError(errorResponse){
        /* eslint-disable-next-line no-console*/
        console.error(errorResponse);
    }
}

export default new ApiService(axios);
