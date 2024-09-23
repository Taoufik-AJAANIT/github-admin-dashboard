import useRepository from "../../state";
import { useEffect } from "react";
import { Breakpoint, Col, Divider, Input, Row, Statistic, TableColumnType, Typography } from "antd";
import Table from "../../../../components/Table";
import Repository from "../../../../types/repository";
import { AnyObject } from "antd/es/_util/type";
import { Link } from "react-router-dom";
import Routes from "../../../../types/routes";
import useUser from "../../../../state";

type DataIndex = keyof Repository;


function RepositoryList() {

    const { repositories, fetch, total, params, setParams, filters, setFilters } = useRepository();
    const { user } = useUser();

    useEffect(() => {
        fetch();
    }, [
        fetch,
        params
    ]);

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<AnyObject> => ({
        filterDropdown: () => (
            <Input
                placeholder={`Search ${dataIndex}`}
                value={filters[dataIndex]}
                onChange={(e) => setFilters({
                    ...filters,
                    [dataIndex]: e.target.value
                })}
            />
        ),
    });


    const columns = [{
        title: 'Name',
        dataIndex: 'full_name',
        key: 'full_name',
        filterSearch: true,
        ...getColumnSearchProps('full_name'),
        render: (text: string, record: AnyObject) => {
            return (
                <Link to={`${Routes.HOME}/${record.owner.login}/${record.name}`}>
                    {text}
                </Link>
            );
        }
    }, {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        responsive: ['md'] as Breakpoint[],
    }, {
        title: 'Stars',
        dataIndex: 'stargazers_count',
        key: 'stargazers_count',
    }, {
        title: 'Forks',
        dataIndex: 'forks_count',
        key: 'forks_count',
    }, {
        title: 'Updated At',
        dataIndex: 'updated_at',
        key: 'updated_at',
        responsive: ['md'] as Breakpoint[],
    }, {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        responsive: ['md'] as Breakpoint[],
        showSorterTooltip: false,
        sorter: true,
        sortOrder: (params.sort === 'created_at' ? params.direction : undefined),
    }];


    return (
        <Row justify={'center'}>
            <Row>
                <Col span={8}>
                    <Typography>{user?.name}</Typography>
                </Col>
                <Col span={8}>
                    <Statistic title="Followers" value={user?.followers}/>
                </Col>
                <Col span={8}>
                    <Statistic title="Following" value={user?.following}/>
                </Col>
            </Row>
            <Divider/>
            <Table
                rowKey={'id'}
                page={params.page}
                dataSource={repositories}
                filters={filters}
                columns={columns}
                loading={!repositories}
                total={total}
                onChange={(pagination, filters, sorter: any) => {
                    setParams({
                        ...params,
                        direction: sorter.order,
                        sort: sorter.order && sorter.columnKey,
                        page: pagination.current || 1,
                    });
                }}
            />
        </Row>
    );
}

export default RepositoryList;
