import Button from './Button';
import Status from './Status';

const Container = (props) => {
    return (
        <div className='application'>
            <h2>{props.title}</h2>
            <Status />
            <Button colour='blue' text='Restart' />
            <Button colour='blue' text='Stop' />
            <Button colour='blue' text='Logs' />
        </div>
    )
}

Container.defaultProps = {
    title: 'Container',
}

export default Container
