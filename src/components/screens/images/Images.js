import Image from './Image.js';

const Images = ({images}) => {
    return (
        <>
            {images && images.length > 0 ?
                            
                    images.map((image, i) => (
                            <Image key={i} image={image} />
                    ))
                    :
                    <div className='no-data-message' >No images to display.</div>
            }
        </>
    )
}

export default Images;
