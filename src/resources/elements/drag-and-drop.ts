import { autoinject, bindable } from 'aurelia-framework'
import {uploadFiles} from 'lib/file-upload'
import { BindingSignaler } from 'aurelia-templating-resources';

@autoinject
export class DragAndDrop {
  private id: string
  private fileTypesString: string
  private fileTypes: Array<string> = [
    'image/jpeg',
    'image/png',
    'application/*'
  ]
  private files: Array<File>
  private uploadProgresses: Array<number>
  @bindable private multiple: boolean = true

  constructor(private signaler: BindingSignaler) {
    this.id = `aurelia-media-manager-${Date.now()}`
    this.files = []
    this.fileTypesString = this.fileTypes.join()
    this.uploadProgresses = []
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
      this.uploadProgresses.splice(fileIndex, 1, percentage)
      this.signaler.signal('update-file-list')
      console.log(fileIndex, percentage, this.uploadProgresses)
    }
  }

  handleLoadComplete = (event: Event, fileIndex: number) => {
    console.log('upload complete', this)
    this.uploadProgresses.splice(fileIndex, 1, 100)
  }

  private uploadFiles (files) {
    this.files = Array.isArray(files) ? files : Array.from(files)
    uploadFiles(this.files, this.handleUploadProgress, this.handleLoadComplete)
  }
}
