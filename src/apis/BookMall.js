import axios from "axios"

//书城数据
export const getBookMallSex = async (sex) => {
    let { data } = await axios.get(`https://apic.netstart.cn/yunyuedu/store/navi.json?gender=${sex}`)
    
    return data
}

// 书城类别数据
export const getBookMallSort = async (url) => {
    let { data } = await axios.get(`https://apic.netstart.cn/yunyuedu${url}`)
    
    return data
}


// https://apis.netstart.cn/yunyuedu/