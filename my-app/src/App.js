import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. Let's see how much
          till we break it.
          <br />
          UUUUUU hotupdate is available huh ? <br /> Deployment is succesfull
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1 class="text-9xl text-red-500">Hello world!</h1>
      </header>
    </div>
  );
}

export default App;
