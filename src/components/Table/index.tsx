import { Flex, Table as AntdTable, TableProps } from 'antd';

export type PaginationProps = {
    page: number;
    total: number;
};

export type Filter = {
    [key: string]: string;
}

function Table({
                   dataSource,
                   columns,
                   page,
                   total,
                   onChange,
                   filters,
               }: TableProps & PaginationProps & { filters: Filter }) {
    return <Flex>
        <AntdTable
            onChange={onChange}
            dataSource={dataSource?.filter((row) => {
                return Object.keys(filters).every((key) => {
                    return String((row as any)[key]).includes((filters as any)[key]);
                });
            })}
            columns={columns}
            pagination={{
                current: page,
                defaultCurrent: page,
                total,
                showSizeChanger: false,
            }
            }/>
    </Flex>
}

export default Table;
