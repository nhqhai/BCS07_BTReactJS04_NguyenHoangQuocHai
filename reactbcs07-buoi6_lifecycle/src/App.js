import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeTemplate from './Templates/HomeTemplate';
import DemoLifecycle from './Pages/DemoLifecycle/DemoLifecycle';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route path="lifecycle" element={<DemoLifecycle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
