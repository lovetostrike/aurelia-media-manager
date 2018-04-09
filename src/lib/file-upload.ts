const uploadFiles = (files: Array<File>, handlers: any): Array<XMLHttpRequest> => {
  return files.map((file, index) => {
    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', (event: Event) => {
      handlers.progress(event, index)
    }, false)

    xhr.upload.addEventListener('load', (event: Event) => {
      handlers.load(event, index)
    }, false)

    xhr.upload.addEventListener('abort', (event: Event) => {
      handlers.abort(event, index)
    }, false)

    xhr.open('POST', 'http://localhost:3000/upload', true)
    const formData = new FormData()
    formData.append(`file${index}`, file)
    xhr.send(formData)
    return xhr
  })
}

export {
  uploadFiles
}
