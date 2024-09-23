export type Params = { [key: string]: string | number };

type GetConfig =  {
    url: string,
    params?: Params
    authenticated?: boolean
};

export default GetConfig;
