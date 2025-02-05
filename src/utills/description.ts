// 숫자 1 혹은 0을 임의로 return 하는 함수
export const get_1_of_0 = () => {
  return Number(Math.random().toFixed(1).split('.')[1]) > 5 ? 1 : 0
}
// 소숫점 첫째자리를 이용하여 5를 기준으로 1 또는 0을 리턴하도록 구현했습니다.

export const get_random = (n: number) => {
  const oneOrZero = get_1_of_0()
  let result = 0
  while (true) {
    const randomNumber = new Date().getTime()
    const nLength = n.toString().length
    const slicedNumber = randomNumber.toString().slice(-nLength)
    result = Number(slicedNumber) % (n + oneOrZero) // n을 넘어가지 않도록 보정 (new Date.getTime() 핵심)
    if (result >= 0 && result <= n) {
      break
    }
  }
  return result
}
/**
1. 0부터 n까지 의 숫자중 하나를 리턴받는다
  1-1. new Date().getTime() 을 사용해서 같은 자리수를 얻는다 그리고 같은 자리수 길이만큼 slice 처리 
  1-2. 근데 1-1의 결과가 n보다 크다? 그러면 1-1 의 행위 반복 
  1-3. 언젠가 0 과 n 사이로 나온 숫자를 가지고 가공 (get_1_of_0) 의 결과 더하기
  1-4. 1-3 
*/
