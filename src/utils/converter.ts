class Converter {
  toVND = (value: number) => value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}

export const converter = new Converter()
