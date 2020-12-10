import axios from 'axios'
import { cloneDeep, isEmpty } from 'lodash'
import { message } from 'antd'

import history from '../common/history'

const { CancelToken } = axios
window.cancelRequest = new Map()

export default function request(options) {
  let { data, url, method = 'get' } = options
  const cloneData = cloneDeep(data)

  options.url = url
  options.params = cloneData
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })
  
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem("token");
  }

  return axios(options)
    .then(response => {
      const { success, code, data } = response

      let result = {}
      result = data;

      console.log(result);
      
      if (result.success) {
         return Promise.resolve(result.data)
      }else{
        if (result.code == 401){
            history.replace('/login');
            return Promise.reject({
              success: false,
              data:{},
              code:result.code,
              message: result.message,
            })      
          }else{
          message.error(`${result.msg}`)
          return Promise.reject({
            success: false,
            data:{},
            code:result.code,
            message: result.message,
          })      
        }
      }
    })
    // .catch(error => {
    //   const { response } = error

    //   let msg
    //   let statusCode

    //   if (response && response instanceof Object) {
    //     const { data, statusText } = response
    //     statusCode = response.status
    //     msg = data.message || statusText
    //   } else {
    //     statusCode = 600
    //     msg = error.message || 'Network Error'
    //   }

    //   message.error(`${msg}`)
    //   /* eslint-disable */
    //   return Promise.reject({
    //     success: false,
    //     code:statusCode,
    //     message: msg,
    //   })
    // })
}
