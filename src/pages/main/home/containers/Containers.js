import Container from './Container.js';

const Containers = ({containers, getContainers}) => {

    return (
        <>
            {
                containers && containers.length > 0 ?

                    containers.map(( container, key ) => (
                        <Container container={container} getContainers={getContainers} />
                    ))
                    :
                    <div className='no-data-message' >No containers to display.</div>
            }
        </>
    )
}

export default Containers
