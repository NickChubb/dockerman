import DisplayContainers from './containers/DisplayContainers.js';
import DisplayImages from './images/DisplayImages.js';
import DisplayRepo from './repos/DisplayRepo.js';
import DisplayNew from './repos/DisplayNew.js';
import DisplayConfig from './config/DisplayConfig.js';
import { Switch, Route } from 'react-router-dom';

const Display = () => {

    return (
        <div className='display'>
            
            <Switch>
                <Route path="/images">
                    <DisplayImages />
                </Route>

                <Route path="/repo">
                    <DisplayRepo />
                </Route>

                <Route path="/new">
                    <DisplayNew />
                </Route>

                <Route path="/config">
                    <DisplayConfig />
                </Route>

                <Route path="/">
                    <DisplayContainers />
                </Route>
            </Switch>
            
        </div>
    )
}

export default Display
