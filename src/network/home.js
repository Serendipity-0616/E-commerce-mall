import {request} from "./network";

export function getMultiData() {
  return request({
    url: '/home/multidata'
  })
}

export function getProductData(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

//函数调用 -> 压入函数栈
// function test() {
//   const name =['aaa','bbb']
// }
// test()

// let totalNums = []
// const nums1 =[20,11]
// const num2 = [333,444]
//
// // for (let n of nums1){
// //   totalNums.push(n)
// // }
// //ES6语法扩展运算符
// //解析
// totalNums.push(...nums1)
