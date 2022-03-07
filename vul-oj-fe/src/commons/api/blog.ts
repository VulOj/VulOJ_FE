import qs from 'qs'
import ajax from '../utils/request'


export const getBlog = (start_id: number, list_size: number, is_descend: number) => {
    return ajax({
        url: '/blog',
        method: 'get',
        params: {
            start_id: start_id,
            list_size: list_size,
            is_descend: is_descend
        }
    })
}

export const createBlog = (title: string, content: string) => {
    return ajax({
        url: '/blog',
        method: 'post',
        data: qs.stringify({
            title: title,
            content: content
        })
    })
}