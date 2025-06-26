import type {
  PostSpecialtyDto,
  PutSpecialtyDto,
  Specialty,
  SpecialtyDto,
} from '../types/specialty'

export function mapFromSpecialtyDto(specialtyDto: SpecialtyDto): Specialty {
  return {
    description: specialtyDto.description,
    name: specialtyDto.name,
    id: specialtyDto.id,
  }
}

export function mapToPostSpecialtyDto(specialty: Specialty): PostSpecialtyDto {
  return {
    description: specialty.description,
    name: specialty.name,
  }
}

export function mapToPutSpecialtyDto(specialty: Specialty): PutSpecialtyDto {
  return {
    description: specialty.description,
    name: specialty.name,
  }
}
