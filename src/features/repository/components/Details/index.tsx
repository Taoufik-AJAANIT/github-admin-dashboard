import { useParams } from "react-router-dom";
import useRepository from "../../state";
import { useEffect } from "react";
import Stargazers from "./Stargazers";
import { Row, Typography } from "antd";

function RepositoryDetails() {
    const { fetchOne } = useRepository();
    const { name, owner } = useParams() as { name: string, owner: string };

    useEffect(() => {
        fetchOne({ name, owner });
    }, [fetchOne, name, owner]);

    return (
        <Row justify={'space-between'} align={'middle'}>
            <Typography.Title level={3}>
                {name}
            </Typography.Title>
            <Stargazers/>
        </Row>
    );
}

export default RepositoryDetails;
