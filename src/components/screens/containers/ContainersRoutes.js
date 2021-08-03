import { Switch, Route } from 'react-router-dom';

// PATHS
import DisplayContainers from './DisplayContainers';
import DisplayContainer from './DisplayContainer';

const ContainersRoutes = () => {

    return (
        <Switch>

            <Route path="/container/:id">
                <DisplayContainer />
            </Route>

            <Route path="/container">
                <DisplayContainers />
            </Route>

            <Route path="/">
                <DisplayContainers />
            </Route>

        </Switch>
    )
}

export default ContainersRoutes;