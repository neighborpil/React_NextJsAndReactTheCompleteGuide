import Link from "next/link";
import {useRouter} from "next/router";

function ClientProjectsPage() {
    const router = useRouter();
    const {id} = router.query;

    function loadProjectHandler() {
        // load data...
        // router.push(`/clients/${id}/projecta`);
        router.push({
            pathname: '/clients/[id]/[clientprojectid]',
            query: {id: id, clientprojectid: 'projecta'}
        });
    }

    return (
        <div>
            <h1>The Projects of a Given Client</h1>
            <button onClick={loadProjectHandler}>Load Project A</button>

        </div>
    );
}

export default ClientProjectsPage;