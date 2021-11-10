import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchContainerInfo, fetchContainerStats } from '../../../../api/container';
import ContainerScreen from './ContainerScreen';
import Loading from '../../../../components/Loading';

const ContainerPage = () => {

    // Get container info from request
    const { id } = useParams();
    const ports = useLocation().state;

    const [ isBusy, setBusy ] = useState(true);
    const [ containerInfo, setContainerInfo ] = useState(null);
    const [ containerStats, setContainerStats ] = useState(null);

    const getContainer = async (id) => {
        setBusy(true);
        const containerInfoResponse = await fetchContainerInfo(id);
        const containerStatsResponse = await fetchContainerStats(id);
        setContainerInfo(containerInfoResponse);
        setContainerStats(containerStatsResponse);
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
                    <ContainerScreen containerInfo={containerInfo} stats={containerStats} ports={ports}/>
                )
            }
        </>
    )
}

export default ContainerPage;
