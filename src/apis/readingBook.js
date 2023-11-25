import axios from "axios"

//通过书本ID 获取章节Id相关信息
export const getIds = async (id) => {
    let  {data}  = await axios.get(` https://apic.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=${id}`)
    return data
}

// 通过书本id和章节id,获取章节内容
export const getContent = async (bookId,contentId) => {
    let  {data}  = await axios.get(`https://apic.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=${bookId}&content_uuid=${contentId}`)
    
    return data
}

