import DisplayContainers from './DisplayContainers.js';
import DisplayImages from './DisplayImages.js';
import DisplayRepo from './DisplayRepo.js';
import DisplayNew from './DisplayNew.js';
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

                <Route path="/">
                    <DisplayContainers />
                </Route>
            </Switch>
            
        </div>
    )
}

export default Display
