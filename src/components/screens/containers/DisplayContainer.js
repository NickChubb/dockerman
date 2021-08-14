import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchContainerInfo } from '../../api/container';
import ContainerScreen from './ContainerScreen';
import Loading from '../../Loading';

const ContainerPage = () => {

    // Get container info from request
    const { id } = useParams();
    const ports = useLocation().state;

    const [ isBusy, setBusy ] = useState(true);
    const [ containerInfo, setContainerInfo ] = useState(null);

    const getContainer = async (id) => {
        setBusy(true);
        const containerInfoResponse = await fetchContainerInfo(id);
        setContainerInfo(containerInfoResponse);
        setBusy(false);
    }

    useEffect(() => {
        getContainer(id);
    }, []);

    return (
        <>  
            {
                isBusy ? (
                    <Loading />
                ) : (
                    <ContainerScreen containerInfo={containerInfo} ports={ports}/>
                )
            }
        </>
    )
}

export default ContainerPage;
