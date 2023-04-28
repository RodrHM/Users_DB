import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmToken } from './redux/features/users/usersActions';
import Form from './components/Form/Form';

function App() {
  const dispatch = useDispatch()
  const {isAuthenticated } = useSelector( state => state.user)

  useEffect(()=>{
    // console.log('app ----------------------------------------------')
    const localToken = localStorage.getItem('token')

    if(localToken) dispatch(confirmToken())
    
  },[dispatch])

  return (
    <div className="App">
      <Routes>
        <Route 
          exact 
          path='/' 
          element={<PrivateRoute isAuthenticated={!isAuthenticated} component={<Form />} redirect='/dashboard'/>}
        />
        <Route 
          exact 
          path='/dashboard' 
          element={<PrivateRoute isAuthenticated={isAuthenticated} component={<Dashboard /> } redirect='/'/>}
        />
        {/* <PrivateRoute isAuthenticated={true} exact path='/dashboard' component={<Dashboard/>}/> */}
      </Routes>
    </div>
  );
}

export default App;