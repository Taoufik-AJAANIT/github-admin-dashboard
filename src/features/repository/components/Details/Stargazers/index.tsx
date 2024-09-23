import { useParams } from "react-router-dom";
import useRepository from "../../../state";
import { useEffect } from "react";
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button, Col } from "antd";

function Stargazers() {
    const { repository, stared, star, unStar } = useRepository();
    const { name, owner } = useParams() as { name: string, owner: string };

    useEffect(() => {
        stared({ name, owner });
    }, [stared, name, owner]);

    return (
        <Col>
            <Button
                onClick={() => {
                    if (repository?.stared) {
                        unStar({ name, owner });
                    } else {
                        star({ name, owner });
                    }
                }}
                icon={repository?.stared ? <StarFilled/> : <StarOutlined/>}>
                {repository?.stared ? "Unstar" : "Star"}
            </Button>
        </Col>
    );
}

export default Stargazers;
