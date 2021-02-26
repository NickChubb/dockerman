import DisplayContainers from './DisplayContainers.js';
import DisplayImages from './DisplayImages.js';
import { Switch, Route } from 'react-router-dom';

const Display = () => {

    return (
        <div className='display'>
            
            <Switch>
                <Route path="/images">
                    <DisplayImages />
                </Route>

                <Route path="/">
                    <DisplayContainers />
                </Route>
            </Switch>
            
        </div>
    )
}

export default Display
