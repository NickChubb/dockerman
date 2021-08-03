import { useState, useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import useToken from './components/useToken';
import { fetchConfig } from "./components/api/system";
import Loading from '../../Loading';

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
    const [ config, setConfig ] = useState();
    
    const getConfig = async () => {
      setBusy(true);
      const configFromServer = await fetchConfig();
      setConfig(configFromServer);
      setBusy(false);
    }

    useEffect(() => {
        getConfig();
    }, []);

    if (!token && config && config.auth.useAuth) {
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
