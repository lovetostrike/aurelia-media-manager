import { bindable, autoinject } from 'aurelia-framework';

@autoinject
export class MediaSource {
  @bindable private name: string
  @bindable private id: string

  constructor(private elementRef: Element) {
  }

  attached () {
    this.elementRef.setAttribute('name', this.name);
  }
}
