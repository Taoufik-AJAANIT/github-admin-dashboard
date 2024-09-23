import storage from "../../../../utils/storage";
import StorageKeys from "../../../../types/storage-keys";
import { Button } from "antd";
import { LogoutOutlined } from '@ant-design/icons';

function Logout() {

    return <Button icon={<LogoutOutlined/>} onClick={() => {
        storage.set(StorageKeys.ACCESS_TOKEN, "");
        window.location.reload();
    }}>
        Logout
    </Button>;
}

export default Logout;
