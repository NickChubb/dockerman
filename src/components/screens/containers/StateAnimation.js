import Spinner from 'react-bootstrap/Spinner';

const StateAnimation = ({ state }) => {

    const getStateAnimation = (state) => {
        if ( state === 'running' ) {
            return <Spinner animation="grow" size="sm" style={{ color: 'green', animationDuration: '1s', animationTimingFunction: 'ease-out' }}/>

        } else if (state === 'loading' ) {
            return <Spinner animation="border" size="sm" style={{color: 'blue'}} />
        } else {
            return <Spinner animation="grow" size="sm" style={{color: 'red', animationName: 'spinner-grow', animationIterationCount: '1', opacity: 1, animationFillMode: 'forwards'}} />
        }
    }

    return (
        <>
            {getStateAnimation(state)}
        </>
    )

}

export default StateAnimation;