import notification from 'ant-design-vue/es/notification'
export const errManager = response => {
  console.log(response)
  // if (response.code!=200) {
  //   const data = error.response.data
  //   if (error.response.status === 403) {
  //     notification.error({
  //       message: 'Forbidden',
  //       description: data.message
  //     })
  //   }
  //   if (error.response.status === 401) {
  //     notification.error({
  //       message: 'Unauthorized',
  //       description: 'Authorization verification failed'
  //     })
  //   }
  // }
}
