export interface Specialty {
  id?: string
  name: string
  description: string
}

export interface SpecialtyDto {
  id: string
  name: string
  description: string
  is_active: boolean
  created_at: Date
}

export interface PostSpecialtyDto {
  name: string
  description: string
}

export interface PutSpecialtyDto {
  name?: string
  description?: string
}
