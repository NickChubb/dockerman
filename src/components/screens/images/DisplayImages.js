import Images from './Images.js';
import Button from '../../Button.js';
import { fetchImages, pruneImages } from '../../api/image';
import { useState, useEffect } from 'react';
import Tabs from '../Tabs.js';

const DisplayImages = () => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        const getImages = async () => {
            const imagesFromServer = await fetchImages();
            setImages(imagesFromServer);
        }

        getImages();
    }, []);

    return (
        <>
            <Tabs page="Images" />
            <h3 className="topbar">
                <Button text="prune -a" onClick={() => pruneImages()}/>
            </h3>
            <Images images={images} />
        </>
    )
}

export default DisplayImages

