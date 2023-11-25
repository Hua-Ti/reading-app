import axios from "axios"

//获取听书模块数据
export const getListenBooks = async (sourceUuid) => {
    let  {data}  = await axios.get(` https://apic.netstart.cn/yunyuedu/ting/source.json?sourceUuid=${sourceUuid}`)
    return data
}

// 获取书架内容
export const getShelfContent = async () => {
    let  {data}  = await axios.get(`https://apic.netstart.cn/yunyuedu/shelf/info.json`)
    
    return data
}

// https://apic.netstart.cn/yunyuedu/ting/source.json?sourceUuid=audio_cf559bbbda5245a8a76c4fc65b9b52ae_4