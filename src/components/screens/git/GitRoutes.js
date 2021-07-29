import { Switch, Route } from 'react-router-dom';

// PATHS
import DisplayRepo from './DisplayRepo.js';
import DisplayNew from './DisplayNew';

const GitRoutes = () => {

    return (
        <Switch>

            <Route path="/new">
                <DisplayNew />
            </Route>

            <Route path="/">
                <DisplayRepo />
            </Route>

        </Switch>
    )
}

export default GitRoutes;