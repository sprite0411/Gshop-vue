/**
 * Created by Sprite on 2020/6/14.
 */
import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/shopgoods',{code: 0, data: data.goods})

Mock.mock('/shopratings',{code: 0,data: data.ratings})

Mock.mock('/shopinfo',{code: 0,data: data.info})

