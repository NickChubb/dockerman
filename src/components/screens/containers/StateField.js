import StateAnimation from './StateAnimation';

const StateField = ({ state }) => {

    return (
        <>
            Status: <b>{state}</b> <StateAnimation state={state} />
        </>
    )

}

export default StateField;