import axios from 'axios';

export const DEFAULT_API_ADRESS = 'https://api.github.com/';

export class ApiService {
    constructor(http){
        this.init(http);
    }

    init(http){
        this.http = http.create({
            baseURL: DEFAULT_API_ADRESS,
            timeout: 5000,
        });
    }

    get(url){
        return this.http
            .get(url)
            .then(this.parseResponse)
            .catch(this.parseError)
    }

    getUsersByName(name){
        return this.get(`search/users?q=${name}`)
    }

    getRepositoriesByUserName(name, page, resultsPerPage = 10){
        return this.get(`search/repositories?q=user:${name}&page=${page}&per_page=${resultsPerPage}`)
    }

    parseResponse(response){
        return response && response.data ?
            response.data : response;
    }

    parseError(errorResponse){
        /* eslint-disable-next-line no-console*/
        console.error(errorResponse);
        throw errorResponse;
    }
}

export default new ApiService(axios);
