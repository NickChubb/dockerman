import Container from './Container.js';

const Containers = ({containers}) => {

    return (
        <>
            {containers.map((container, i) => (
                    <Container key={i} container={container} />
            ))}
        </>
    )
}

export default Containers
