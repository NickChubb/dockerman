import { Link, Switch, Route } from 'react-router-dom';

const SideBar = () => {
 
    return (
        <div className="sidebar">
            <Switch>

                <Route path="/images">
                    
                </Route>

                <Route path="/volumes">

                </Route>

                <Route path={["/containers", "/"]}>

                </Route>

            </Switch>
        </div>
    )
}

export default SideBar;