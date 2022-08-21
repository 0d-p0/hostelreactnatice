import axios from 'axios'
import { useEffect, useState } from 'react'
import { domain } from '../../Util/Address'

export const allRoom = (pageNumber, sprice, lprice, totalBeds, genderType) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [rooms, setRooms] = useState([])
    const [currentPageNumer, setCurrentPageNumer] = useState()
    const [hasMore, setHasMore] = useState(true)
    const [roomlength, setRoomLength] = useState()

    useEffect(() => {
        setLoading(true)
        setError(false)
        axios({
            method: "Get",
            url: domain + "api/v1/allrooms",
            params: { page: pageNumber, sprice, lprice, totalBeds, genderType },
            // cancelToken: new axios.CancelToken(c => cancel = c)

        }).then(res => {

            setRooms([...rooms, ...res.data.rooms])
            setCurrentPageNumer(res.data.currentPage)
            setLoading(false)
            setRoomLength(res.data.roomLength)
            setHasMore((res.data.totalPages >= res.data.currentPage) ? true : false)
            setCurrentPageNumer(res.data.currentPage)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
            console.log(e)
        })

        // return () => cancel()
    }, [pageNumber, sprice, lprice, totalBeds,genderType])

    return { loading, error, rooms, roomlength, hasMore, currentPageNumer, setRooms, setHasMore }
}
