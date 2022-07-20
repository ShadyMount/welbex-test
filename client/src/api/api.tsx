import { instance } from "./axiosInstance"


interface IGetItems {
    currentPage?: number,
    pageSize?: number,
    sortDir?: string,
    sortValue?: string | number,
    sortBy?: string
}

export const itemsAPI = {
    
    
    async getItems({currentPage, pageSize, sortDir, sortValue, sortBy}: IGetItems) {

        return  instance.get('api/items', {
            params: {
                currentPage, pageSize, sortDir, sortValue, sortBy
            }
        })
        .then(response => {
            return response.data.values
        })

    },

    
    // async addItem(td) {
    //     return instance.post('api/items')
    //         .then(response => {
    //             console.log(response.data.values.message, ' - itemsApi: ответ с сервера на addItem')
    //         })
    // },
    

}