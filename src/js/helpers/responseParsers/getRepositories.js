import { Repository } from '../../models';

const getRepositories = (response) => {
    return response.items.map((responseItem) => new Repository(responseItem.name, responseItem.html_url))
}

export default getRepositories;