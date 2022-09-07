import {Container, Row, Col} from 'react-bootstrap'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { DashboardScreen } from './screens/DashboardScreen';

import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar';


import ResourceListSreen from './screens/Resource/ResourceListSreen';
import ResourceCreateScreen from './screens/Resource/ResourceCreateScreen';
import ResourceUpdateScreen from './screens/Resource/ResourceUpdateScreen';
import ResourceDeleteScreen from './screens/Resource/ResourceDeleteScreen';


import CategoryListScreen from './screens/Category/CategoryListScreen';
import CategoryCreateScreen from './screens/Category/CategoryCreateScreen';
import CategoryUpdateScreen from './screens/Category/CategoryUpdateScreen';
import CategoryDeleteScreen from './screens/Category/CategoryDeleteScreen';


import { ResourceTypeListScreen } from './screens/ResourceType/ResourceTypeListScreen';
import { ResourceTypeUpdateScreen } from './screens/ResourceType/ResourceTypeUpdateScreen';
import { ResourceTypeDeleteScreen } from './screens/ResourceType/ResourceTypeDeleteScreen';
import { ResourceTypeCreateScreen } from './screens/ResourceType/ResourceTypeCreateScreen';
function App() {
  return (
        <Router>
            <div className="container-fluid">
               <div className="row">
                  <Sidebar/>
                    <main className="col-8">
                      <Container>
                      
                        <Routes>
                            <Route exact path="/" element={<DashboardScreen />}></Route>
                           
                            <Route exact path="/categories" element={<CategoryListScreen/>}></Route>
                            <Route exact path={'/createcategory'} element={<CategoryCreateScreen/>}></Route>
                            <Route exact path={'/updatecategory'} element={<CategoryUpdateScreen/>}></Route>
                            <Route exact path={'/deletecategory'} element={<CategoryDeleteScreen/>}></Route>

                            <Route exact path={'/resources'} element={<ResourceListSreen/>}></Route>
                            <Route exact path={'/createresource'} element={<ResourceCreateScreen/>}></Route>
                            <Route exact path={'/updateresource'} element={<ResourceUpdateScreen/>}></Route>
                            <Route exact path={'/deleteresource'} element={<ResourceDeleteScreen/>}></Route>

                            <Route exact path={'/resourcetypes'} element={<ResourceTypeListScreen/>}></Route>
                            <Route exact path={'/createresourcetype'} element={<ResourceTypeCreateScreen/>}></Route>
                            <Route exact path={'/updateresourcetype'} element={<ResourceTypeUpdateScreen/>}></Route>
                            <Route exact path={'/deleteresourcetype'} element={<ResourceTypeDeleteScreen/>}></Route>
                           

                        </Routes>

                      </Container>
                    
                    </main>
                    <Footer />
               </div>
            </div>
                    
        </Router>

  );
}

export default App;
