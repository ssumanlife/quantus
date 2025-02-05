export const lengthCheck = (value: string, maxLength?: number) => {
  if (!maxLength) return value
  if (value.length > maxLength) {
    return value.slice(0, maxLength) + '...'
  }
  return value
}
