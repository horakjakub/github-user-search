import { List } from '../../models';
import getRepositories from "./getRepositories";

const getRepositoriesList = (response, page) => {
    return new List(getRepositories(response), page, response.total_count);
}

export default getRepositoriesList;