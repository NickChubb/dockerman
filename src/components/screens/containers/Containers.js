import Container from './Container.js';

const Containers = ({containers}) => {

    return (
        <>
            {containers.map((container) => (
                    <Container container={container} />
            ))}
        </>
    )
}

export default Containers
