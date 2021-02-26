import React from 'react';

const Image = ({image}) => {
    return (
        <div className='container'>
            <h2>{image.RepoTags[0]}</h2>
        </div>
    )
}

export default Image;
