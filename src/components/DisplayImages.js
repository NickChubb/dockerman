import Images from './Images.js';
import DisplayControl from './DisplayControl.js';
import Button from './Button.js';
import { fetchImages } from './api/image';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
            <h2>
                <Link to="/">Containers</Link>
                <span className="disabled">Images</span>
            </h2>
            <h3 className="topbar">
                <Button text="prune -a" />
            </h3>
            <Images images={images} />
        </>
    )
}

export default DisplayImages

