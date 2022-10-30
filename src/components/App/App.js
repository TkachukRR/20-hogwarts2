import FilterButtons from '../FilterButtons';
import Table from '../Table/Table';
import { API_URL } from '../../constants/api';

import './App.css';

class App {
    async render() {
        await FilterButtons.render();
        FilterButtons.eventListener();
        await Table.renderHeader();
        await Table.renderBody(API_URL);
    }
}

export default new App()