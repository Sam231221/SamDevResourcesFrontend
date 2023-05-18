import {Container, Row, Col} from 'react-bootstrap'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { DashboardScreen } from './screens/DashboardScreen';

import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar';

function App() {
  return (
        <Router>
            <div className="container-fluid">
               <div className="row">
                  <Sidebar/>
                    <div className="col-10">
                      <Container>
                      
                        <Routes>
                            <Route exact path="/" element={<DashboardScreen />}></Route>
                        </Routes>

                      </Container>
                    
                    </div>
                    <Footer />
               </div>
            </div>
                    
        </Router>

  );
}

export default App;
