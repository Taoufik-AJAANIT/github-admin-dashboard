import { Button, Typography } from "antd";
import { GithubOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


function Login() {

    return (
        <Link to={process.env.REACT_APP_GITHUB_AUTHORIZE_URL}>
            <Button icon={<GithubOutlined/>} color="default" variant="filled" size={'large'}>
                <Typography>
                    Continue with github
                </Typography>
            </Button>
        </Link>
    );
}

export default Login;
