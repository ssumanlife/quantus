// 숫자 1 혹은 0을 임의로 return 하는 함수
export const get_1_of_0 = () => {
  return Number(Math.random().toFixed(1).split('.')[1]) > 5 ? 1 : 0
}

// 난수 생성 함수
export const get_random = (n: number) => {
  const oneOrZero = get_1_of_0()
  let result = 0
  while (true) {
    const randomNumber = new Date().getTime()
    const nLength = n.toString().length
    const slicedNumber = randomNumber.toString().slice(-nLength)
    result = Number(slicedNumber) % (n + oneOrZero)
    if (result >= 0 && result <= n) {
      break
    }
  }
  return result
}
