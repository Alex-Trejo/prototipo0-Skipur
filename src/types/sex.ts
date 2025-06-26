export const Sex = {
  Male: 0,
  Female: 1,
  Other: 2,
} as const

export type Sex = (typeof Sex)[keyof typeof Sex]
