
import './App.css';
import CrudApp from './components/CrudApp';

function App() {
  //aquí en App declaramos qué componentes se van a mostrar en pantalla, en este caso <CrudApp/> que a su vez contiene los demás componentes
  return (
    <div className="App">
      <CrudApp/> 
    </div>
  );
}

export default App;
