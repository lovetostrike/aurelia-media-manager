export class GetValueValueConverter {
  toView (value: any, index: number | string) {
    return value[index]
  }
}
