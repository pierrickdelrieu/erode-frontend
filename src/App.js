import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";


import Home from "./views/Home";
import Login from "./views/Login";
import Signin from "./views/Signin";
import Dashboard from "./views/Dashboard";
import RGPD from "./views/RGPD";

import Error404 from "./views/Error404";


import {setToken, getToken} from './components/utils/useToken';
import Turnon2fa from './views/Turnon2fa';



function App() {
    const token = getToken();

    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/login' element=
                        { token == null
                            ? <Login setToken={setToken}/>
                            : <Navigate replace to="/dashboard" />
                        }
                    />
                    {/* <Route path='/signin' element=
                        { token == null
                            ? <Signin setToken={setToken}/>
                            : <Navigate replace to="/dashboard" />
                        }
                    /> */}
                    { (token !== null)
                        ? <Route path="/dashboard" element={<Dashboard token={token}/>}/>
                        : null
                    }
                    { (token !== null)
                        ? <Route path="/turnon2fa" element={<Turnon2fa userToken={token}/>}/>
                        : null
                    }
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<Error404/>}/>
                    <Route path="/RGPD" element={<RGPD/>}/>
                </Routes>
            </Router>
        </div>
    );
    
}

export default App;
