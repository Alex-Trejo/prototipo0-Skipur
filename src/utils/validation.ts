export const MIN_AGE = 1
export const MAX_AGE = 99

export function isFullName(text: string) {
  return /[a-zA-Z]{3,}\s[a-zA-Z]{3,}/.test(text)
}

export function isPhoneNumber(phone: string) {
  return /0[\d]{9}/.test(phone)
}

export function isValidAge(age: number) {
  return age >= MIN_AGE && age <= MAX_AGE
}
