import Container from './Container.js';

const Containers = ({containers}) => {

    return (
        <>
            {
                containers && containers.length > 0 ?

                    containers.map((container) => (
                        <Container container={container} />
                    ))
                    :
                    <div className='no-data-message' >No containers to display.</div>
            }
        </>
    )
}

export default Containers
