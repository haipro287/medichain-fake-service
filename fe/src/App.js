import logo from './logo.svg';
import './App.css';
import {Routes} from "./routes";
import {BrowserRouter} from "react-router-dom";

function App({basename}) {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div>
                    <BrowserRouter basename={basename}>
                        <Routes/>
                    </BrowserRouter>
                </div>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
