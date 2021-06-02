import Button from '../../Button.js';

const Repo = ({ key, repo }) => {
    return (
        <div className='container'>
            <Button text="build" />
            <Button text="destroy" />
            
        </div>
    )
}

export default Repo;
