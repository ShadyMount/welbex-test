import { instance } from "./axiosInstance"


interface IGetItems {
    currentPage?: number | null,
    pageSize?: number | null,
    filterCompare?: string | null,
    filterValue?: string | number | null,
    filterBy?: string | null,
    orderBy?: string,
    orderDir?: 'ASC' | 'DESC'
}

export const itemsAPI = {
    async getItems({currentPage, pageSize, filterCompare, filterValue, filterBy, orderBy, orderDir}: IGetItems) {
        let response = await instance.get('api/items', {
            params: {
                currentPage, pageSize, filterCompare, filterValue, filterBy, orderBy, orderDir
            }
        })
            return response.data.values
    },
}