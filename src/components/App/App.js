import FilterButtons from '../FilterButtons';
import Table from '../Table/Table';

import './App.css';

class App {
    async render() {
        await FilterButtons.render();
        FilterButtons.eventListener();
        await Table.renderHeader();
        await Table.renderBody();
    }
}

export default new App()