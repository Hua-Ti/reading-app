import axios from "axios"

//热门搜索数据
export const HotSearchBooks = async () => {
    let  {data}  = await axios.get(`https://apic.netstart.cn/yunyuedu/search/getHotWords`)
    
    return data
}

// 搜索建议数据
export const searchAdvice = async (keyWord) => {
    let  {data}  = await axios.get(`https://apic.netstart.cn/yunyuedu/search/searchHint?search=${keyWord}`)
    
    return data
}

// 搜索结果数据
export const searchResult = async (keyWord) => {
    let { data } = await axios.get(`https://apic.netstart.cn/yunyuedu/search/book.json?keyword=${keyWord}`)
    
    return data
}




