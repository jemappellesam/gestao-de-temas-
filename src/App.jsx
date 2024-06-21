import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './components/App.module.css'; 
import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';                                                       
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/cadastro",
      element: <Cadastro />
    }
  ]);

  return (
    <div className={`${styles.appContainer} ${isDarkTheme ? styles.darkTheme : styles.lightTheme}`}>
      <Cabecalho />
      <main className='container-lg mt-5'>
        <div className='d-flex justify-content-end mb-3'>
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="themeSwitch" 
              checked={isDarkTheme} 
              onChange={toggleTheme} 
            />
            <label className="form-check-label" htmlFor="themeSwitch">
              {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
            </label>
          </div>
        </div>
        <RouterProvider router={router} />
      </main>
      <Rodape />
    </div>
  );
};

export default App;
