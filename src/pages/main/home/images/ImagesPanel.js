import React, { useState, useEffect } from 'react';
import ImagesList from './ImagesList.js';
import Button from '../../../../components/Button.js';
import Loading from '../../../../components/Loading.js';
import { fetchImages, pruneImages } from '../../../../api/image.js';

const ImagesPanel = () => {

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
            <h3 className="topbar">
                <Button text="prune -a" onClick={() => pruneImages()}/>
            </h3>
            { isBusy ? (
                <Loading />
              ) : (
                <ImagesList images={images} />
              )}
        </>
    )
}

export default ImagesPanel;

