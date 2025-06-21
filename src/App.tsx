import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlujoProteccionDatos from './pages/FlujoProteccionDatos';
import CuestionarioCEPD from './pages/CuestionarioCEPD';
import FormularioCumplimiento from './pages/FormularioCumplimiento';
import EvaluacionDatosPersonales from './pages/EvaluacionDatosPersonales';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Ruta para la página principal */}
        <Route path="/" element={<HomePage />} />
        
        {/* Rutas para cada cuestionario */}
        <Route path="/flujo-proteccion-datos" element={<FlujoProteccionDatos />} />
        <Route path="/cuestionario-cepd" element={<CuestionarioCEPD />} />
        <Route path="/formulario-cumplimiento" element={<FormularioCumplimiento />} />
        <Route path="/evaluacion-datos-personales" element={<EvaluacionDatosPersonales />} />
      </Routes>
    </div>
  );
}

export default App;