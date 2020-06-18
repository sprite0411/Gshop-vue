/**
 * Created by Sprite on 2020/6/8.
 */

import axios from 'axios'


export default function ajax(url, data={}, method='GET'){

  return new Promise((resolve,reject)=> {
    let promise
    if(method === 'GET'){
      promise = axios.get(url, {params: data})//query参数
    }else {
      promise = axios.post(url, data)
    }

    promise.then(response=> {
      resolve(response.data)
    }).catch(
      error=> {
        alert('请求失败',error.message)
      }
    )
  })


}
