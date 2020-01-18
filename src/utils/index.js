export function tosat (title, options = {}) {
  mpvue.showToast({
    title,
    icon: 'none',
    mask: true,
    ...options
  })
}
export function loading (title, options = {}) {
  mpvue.showLoading({
    title: title || ' ',
    mask: true,
    ...options
  })
}
export const dialog = {
  confirm (content, options = {}) {
    return new Promise((resolve, reject) => {
      mpvue.showModal({
        title: options.title || '提示',
        content,
        ...options,
        success (res) {
          if (res.confirm) {
            resolve()
          } else {
            reject()
          }
        },
        fail () {
          reject()
        }
      })
    })
  },
  alert (content, options = {}) {
    return new Promise((resolve, reject) => {
      mpvue.showModal({
        title: options.title || '提示',
        content,
        ...options,
        showCancel: false,
        success (res) {
          if (res.confirm) {
            resolve()
          } else {
            reject()
          }
        },
        fail () {
          reject()
        }
      })
    })
  }
}
