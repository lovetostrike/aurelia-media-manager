import { autoinject, bindable } from 'aurelia-framework'
import {uploadFiles} from 'lib/file-upload'

export class DragAndDrop {
  private id: string
  private fileTypesString: string
  private fileTypes: Array<string> = [
    'image/jpeg',
    'image/png',
    'application/*'
  ]
  private files: Array<File>
  private uploads: Array<any>
  @bindable private multiple: boolean = true

  constructor() {
    this.id = `aurelia-media-manager-${Date.now()}`
    this.files = []
    this.fileTypesString = this.fileTypes.join()
    this.uploads = []
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
    uploadFiles(filesToUpload, this.handleUploadProgress, this.handleLoadComplete)
  }
}
