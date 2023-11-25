import axios from "axios"

//获取听书模块数据
export const getListenBooksAll = async () => {
    // let api_key='3b7167f81e38b16a564040cb22ed6244';
    // let host= 'api.xf-yun.com';
    // let headers="host date request-line";
    // let algorithm="hmac-sha256";
    let date=new Date();
    console.log(date)
    // let apiSecret='NWMxY2QyZWY0YzI1Mzg5Nzg2N2JlMjcy';
    
  
    // let signature_sha=hmac-sha256(signature_origin,apiSecret)
    // let signature=base64(signature_sha);

    let authorization='YXBpX2tleT0iYXBpa2V5WFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFgiLCBhbGdvcml0aG09ImhtYWMtc2hhMjU2IiwgaGVhZGVycz0iaG9zdCBkYXRlIHJlcXVlc3QtbGluZSIsIHNpZ25hdHVyZT0idWpwWVFINGVCUHYwMm42dndQUDZ3cGJjeEV0ZGJ5WVJrQm9hbjlZQm1PW';

    // let signature_origin=`host:${host}\ndate:${date}\nPOST /v1/private/dts_create`

    let  data  = await axios.get(` http://api-dx.xf-yun.com/v1/private/dts_create?host=api-dx.xf-yun.com&date=${date}&authorization=${authorization}`);
    return data;
}
