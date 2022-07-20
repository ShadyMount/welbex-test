import { instance } from "./axiosInstance"


interface IGetItems {
    currentPage?: number | null,
    pageSize?: number | null,
    sortCompare?: string | null,
    sortValue?: string | number | null,
    sortBy?: string | null
}

export const itemsAPI = {
    
    
    async getItems({currentPage, pageSize, sortCompare, sortValue, sortBy}: IGetItems) {
        let response = await instance.get('api/items', {
            params: {
                currentPage, pageSize, sortCompare, sortValue, sortBy,
            }
        })
            return response.data.values
    },

    
    // async addItem(td) {
    //     return instance.post('api/items')
    //         .then(response => {
    //             console.log(response.data.values.message, ' - itemsApi: ответ с сервера на addItem')
    //         })
    // },
    

}