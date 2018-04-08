const uploadFiles = (files: Array<File>, onProgress: Function, onLoad: Function) => {
  files.forEach((file, index) => {
    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', (event: Event) => {
      onProgress(event, index)
    }, false
    )

    xhr.upload.addEventListener('load', (event: Event) => {
      onLoad(event, index)
    }, false
    )

    xhr.open('POST', 'http://localhost:3000/upload')
    const formData = new FormData()
    formData.append(`file${index}`, file)
    xhr.send(formData)
  })
}

export {
  uploadFiles
}
