import { Switch, Route } from 'react-router-dom';

// PATHS
import DisplayRepo from './DisplayRepo.js';
import DisplayNew from './DisplayNew';

const GitRoutes = () => {

    return (
        <Switch>

            <Route path="/git/new">
                <DisplayNew />
            </Route>

            <Route path="/git">
                <DisplayRepo />
            </Route>

        </Switch>
    )
}

export default GitRoutes;