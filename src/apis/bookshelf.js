import axios from "axios"

//获取书架
export const getShelf = async () => {
    let  {data}  = await axios.get(` https://apic.netstart.cn/yunyuedu/shelf/banner.json`)
    return data
}

// 获取书架内容
export const getShelfContent = async () => {
    let  {data}  = await axios.get(`https://apic.netstart.cn/yunyuedu/shelf/info.json`)
    
    return data
}

// https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=f8e5a81b6add40d587a42adb8280512e_4&content_uuid=17c0fbf0282c4bdf91a97294c3f0cfb2_4