export const getBase64 = (file: File) => {
  return new Promise((res) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      const baseUrl = reader.result
      res(baseUrl)
    }
  })
}
