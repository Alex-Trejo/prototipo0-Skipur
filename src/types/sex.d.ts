import type { SexDict } from '../constants/sex.constants'

export type Sex = (typeof SexDict)[keyof typeof SexDict]
