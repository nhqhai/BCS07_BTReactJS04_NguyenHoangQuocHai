import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeTemplate from './Templates/HomeTemplate';
import DemoLifecycle from './Pages/DemoLifecycle/DemoLifecycle';
import DemoRedux from './Pages/DemoRedux/DemoRedux';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route path="lifecycle">
            <Route path=":id" element={<DemoLifecycle />} />
          </Route>
          <Route path="demoredux" element={<DemoRedux />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
