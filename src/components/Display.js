import Containers from './Containers.js';
import Images from './Images.js'
import { useState, useEffect } from 'react';
import { fetchContainers } from './api/container';
import { fetchImages } from './api/image';
import { Switch, Link, Route } from 'react-router-dom';

const Display = () => {

    const [containers, setContainers] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getContainers = async () => {
            const containersFromServer = await fetchContainers();
            setContainers(containersFromServer);
        }

        const getImages = async () => {
            const imagesFromServer = await fetchImages();
            setImages(imagesFromServer);
        }

        getContainers();
        getImages();
    }, []);

    return (
        <div className='display'>
            <h2>
                <Link to="/">Containers</Link>
                <Link to="/images">Images</Link>
            </h2>
            <Switch>
                <Route path="/images">
                    <Images images={images} />
                </Route>

                <Route path="/">
                    <Containers containers={containers} />
                </Route>
            </Switch>
            
        </div>
    )
}

export default Display
