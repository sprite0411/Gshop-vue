/**
 * Created by Sprite on 2020/6/8.
 */

/*
export function reqAddress({latitude,longitude}) {
  return ajax(`/position/${latitude},${longitude}`,)
};
*/
import ajax from './ajax'

const BASE = '/api'

export const reqAddress = (longitude,latitude) =>  ajax(BASE + `/position/${latitude},${longitude}`)

export const reqFoodCategorys = () => ajax(BASE + '/index_category')

export const reqShops = ({latitude,longitude}) => ajax(BASE + '/shops',{latitude,longitude})

export const reqLoginPwd = ({name, pwd, captcha}) => ajax(BASE + '/login_pwd',{name, pwd, captcha}, 'POST')

export const reqSendCode = (phone) => ajax(BASE + '/sendcode', {phone})

export const reqLoginSms = ({phone,code}) => ajax(BASE + '/login_sms', {phone,code}, 'POST')

export const reqUser = () => ajax(BASE + '/userinfo')

export const reqLogout = () => ajax(BASE + '/logout')

export const reqGoods = () => ajax('/shopgoods')

export const reqRatings = () => ajax('/shopratings')

export const reqInfo = () => ajax('/shopinfo')
