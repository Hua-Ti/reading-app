import axios from "axios"

//小分类数据标题和链接
export const smallSortBook = async () => {
    let  {data}  = await axios.get(`https://apic.netstart.cn/yunyuedu/store/merged/rankNavi.json`)
    return data
}

// 搜索建议数据
export const smallSortData = async (url) => {
    let  list  = await axios.get(`https://apic.netstart.cn/yunyuedu${url}`)
    
    return list
}

// 大分类模块
export const bigSortBooks = async () => {
    let  {data}  = await axios.get(`https://apic.netstart.cn/yunyuedu/store/node.json?gender=1`)
    
    return data
}
// 大分类二级分类模块
export const bigTowSortBooks = async (url) => {
    let  {data}  = await axios.get(`https://apic.netstart.cn/yunyuedu${url}`)
    
    return data
}
// 大分类内容模块
export const bigContent = async (url) => {
    let  {data}  = await axios.get(`https://apic.netstart.cn/yunyuedu${url}`)
    
    return data
}


// https://apic.netstart.cn/yunyuedu/source/v2/cat.json?catId=30000


