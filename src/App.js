import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './bbs/component/pages/HomePage';
import BbsWritePage from './bbs/component/pages/BbsWritePage'
import BbsViewPage from './bbs/component/pages/BbsViewPage';
import BbsUpdatePage from './bbs/component/pages/BbsUpdatePage';
import styled from 'styled-components';
import ForecastPage from './bbs/component/pages/ForecastPage';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <h2>React BBS Project</h2>
      </Wrapper>
      
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/bbs-write' element={<BbsWritePage />}></Route>
        <Route path='/bbs-view/:id' element={<BbsViewPage />} ></Route>
        <Route path='/bbs-update' element={<BbsUpdatePage/>}></Route>
        <Route path='/forecast-write' element={<ForecastPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
