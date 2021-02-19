import Image from './Image.js';

const Images = ({images}) => {
    return (
        <>
            {images.map((image, i) => (
                    <Image key={i} image={image} />
            ))}
        </>
    )
}

export default Images;
