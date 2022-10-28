import FilterButtons from '../FilterButtons';
import './App.css';

class App {
    async render() {
        await FilterButtons.render();
        FilterButtons.eventListener();
    }
}

export default new App()