import Images from './Images.js';
import Button from '../../Button.js';
import Loading from '../../Loading';
import { fetchImages, pruneImages } from '../../api/image';
import { useState, useEffect } from 'react';
import Tabs from '../Tabs.js';

const DisplayImages = () => {

    const [ isBusy, setBusy ] = useState(true);
    const [ images, setImages ] = useState([]);

    const getImages = async () => {
        setBusy(true);
        const imagesFromServer = await fetchImages();
        setImages(imagesFromServer);
        setBusy(false);
    }

    useEffect(() => {
        getImages();
    }, []);

    return (
        <>
            <Tabs page="Images" />
            <h3 className="topbar">
                <Button text="prune -a" onClick={() => pruneImages()}/>
            </h3>
            { isBusy ? (
                <Loading />
              ) : (
                <Images images={images} />
              )}
        </>
    )
}

export default DisplayImages

