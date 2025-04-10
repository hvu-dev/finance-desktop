export type PaginationParams = {
    page: number;
    pageSize: number;
};

export type MetaData = {
    count: number;
};

export type ServiceResponse<T> = {
    meta: MetaData;
    data: T;
};
