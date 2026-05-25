import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TaskDetail from './pages/TaskDetail';
import Layout from './layouts/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;