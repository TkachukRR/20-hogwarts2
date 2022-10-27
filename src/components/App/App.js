import { API_URL, URL_STUDENTS, URL_HOUSE } from "../../constants/api";
import { getApiData } from "../../utils/getApiData";

import './App.css';

class App {
    async render() {
        console.log('app');
        const data = await getApiData.getData(API_URL);
        console.log(data)
    }
}

export default new App()