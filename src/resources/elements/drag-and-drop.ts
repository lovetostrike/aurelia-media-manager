import { autoinject, bindable, bindingMode } from 'aurelia-framework'
import {uploadFiles} from '../../lib/file-upload'

@autoinject
export class DragAndDrop {
  @bindable private fileTypes: Array<string>
  @bindable private abort: Function
  @bindable private multiple: boolean
  private id: string
  @bindable({defaultBindingMode: bindingMode.twoWay}) private uploads: Array<any> = []

  constructor() {
    this.id = `aurelia-media-manager-${Date.now()}`
  }

  handleInputChange = (event: Event) => {
    const input = <HTMLInputElement>event.target
    this.uploadFiles(input.files)
  }

  handleDrop = (event: DragEvent) => {
    const files = Array.from(
        this.multiple ? event.dataTransfer.files : [event.dataTransfer.files[0]]
      )
      .filter(file => this.fileTypes.includes(file.type) ||
        this.fileTypes.includes(`${file.type.split('/')[0]}/*`)
      )
    event.dataTransfer.clearData()
    this.uploadFiles(files)
  }

  handleUploadProgress = (event: any, fileIndex: number) => {
    if (event.lengthComputable) {
      const percentage = Math.round((event.loaded * 100) / event.total)
      this.updateUploadProgress(fileIndex, percentage)
    }
  }

  handleLoadComplete = (event: Event, fileIndex: number) => {
    this.updateUploadProgress(fileIndex, 100)
    this.uploads[fileIndex].xhr = null
  }

  handleAbort = (event: Event, fileIndex: number) => {
    this.uploads[fileIndex].cancelled = true
    this.abort(this.uploads[fileIndex])
  }

  abortUpload (fileIndex: number) {
    this.uploads[fileIndex].xhr.abort()
  }

  private updateUploadProgress(index: number, percentage: number) {
    const upload = this.uploads[index]
    upload.progress = percentage
    this.uploads.splice(index, 1, upload)
  }

  private uploadFiles (files: Array<File> | FileList) {
    this.uploads = []
    const filesToUpload = Array.isArray(files) ? files : Array.from(files)
    filesToUpload.forEach(file => {
      this.uploads.push({
        file,
        progress: 0
      })
    })
    const xhrs = uploadFiles(filesToUpload, {
      'progress': this.handleUploadProgress,
      'load': this.handleLoadComplete,
      'abort': this.handleAbort
    })
    this.uploads = xhrs.map((xhr, index) => {
      this.uploads[index].xhr = xhr
      return this.uploads[index]
    })
  }
}
