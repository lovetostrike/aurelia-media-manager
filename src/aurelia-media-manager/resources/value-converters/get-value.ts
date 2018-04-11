export class GetValueValueConverter {
  toView (value, index) {
    console.log(value, index)
    return value[index]
  }
}
