import { UploadFile } from 'antd'
import { RcFile } from 'antd/es/upload'

class FileExtensions {
  urlToFile = async (url: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const file = new File([blob], url.split('/')[5].split('?')[0], {
        type: blob.type
      })
      return file
    } catch (error) {
      console.log(error)
    }
  }

  urlToUploadFile = async (url: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const file = new File([blob], url.split('/')[5].split('?')[0], {
        type: blob.type
      })
      const uploadFile: UploadFile = {
        name: file.name,
        uid: file.name,
        originFileObj: file as RcFile,
        fileName: file.name,
        lastModified: file.lastModified,
        preview: url,
        size: file.size,
        thumbUrl: url,
        url: url,
        type: file.type
      }
      return uploadFile
    } catch (error) {
      console.log(error)
    }
  }

  validator = (file: RcFile) => {
    const isImage = file.type.split('/')[0] === 'image'
    const errorMgs = []
    if (!isImage) {
      errorMgs.push(`'${file.name}' is not an image file`)
    }

    const isLessThan3MB = file.size / 1024 / 1024 < 3
    if (!isLessThan3MB) {
      errorMgs.push(`Image must smaller than 3MB!`)
    }

    return errorMgs
  }
}

export const fileExtensions = new FileExtensions()
