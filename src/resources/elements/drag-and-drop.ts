import { bindable } from 'aurelia-framework'

export class DragAndDrop {
  private id: string
  private fileTypesString: string
  private fileTypes: Array<string> = [
    'image/jpeg',
    'image/png',
    'application/*'
  ]
  private files: Array<File>
  @bindable private multiple: boolean = true

  constructor () {
    this.id = `aurelia-media-manager-${Date.now()}`
    this.files = []
    this.fileTypesString = this.fileTypes.join()
  }

  handleInputChange (event: Event) {
    const input = <HTMLInputElement>event.target
    this.uploadFiles(Array.from(input.files))
  }

  handleDrop (event: DragEvent) {
    const files = Array.from(
        this.multiple ? event.dataTransfer.files : [event.dataTransfer.files[0]]
      )
      .filter(file => this.fileTypes.includes(file.type) ||
        this.fileTypes.includes(`${file.type.split('/')[0]}/*`)
      )
    event.dataTransfer.clearData()
    this.uploadFiles(files)
  }

  private uploadFiles (files) {
    this.files = files
  }
}
