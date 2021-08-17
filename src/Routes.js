import { useState, useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import useToken from './components/useToken';
import { fetchUseAuth } from "./components/api/login";
import Loading from './components/Loading';

/**
 * Import all page components here
 */
import MainPage from './page/MainPage';
import LoginPage from './page/LoginPage';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
const Routes = () => {

    const { token, setToken } = useToken();
    const [ isBusy, setBusy ] = useState(true);
    const [ useAuth, setUseAuth ] = useState();
    
    const getConfig = async () => {
      setBusy(true);
      const useAuthFromServer = await fetchUseAuth();
      setUseAuth(useAuthFromServer);
      setBusy(false);
    }

    useEffect(() => {
        getConfig();
    }, []);

    if (!token && useAuth) {
      return <LoginPage setToken={setToken} />
    } 

    return (
      <>
        { isBusy ? (
                <Loading />
              ) : (

                <Switch>
                  <Route path="/login">
                    <LoginPage setToken={setToken} />
                  </Route>

                  <Route path="/">
                    <MainPage />
                  </Route>
                </Switch>
              )}
      </>
    )
}

export default Routes;
