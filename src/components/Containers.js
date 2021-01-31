import Container from './Container.js';

//let containers = fetch('./api/getContainers').then((response) => {response.json()});

//console.log(containers);

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
