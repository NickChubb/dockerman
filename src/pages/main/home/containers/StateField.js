import StateAnimation from './StateAnimation';

const StateField = ({ state }) => {

    return (
        <>
            <b>{state}</b> <StateAnimation state={state} />
        </>
    )

}

export default StateField;