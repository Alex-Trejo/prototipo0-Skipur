import type {
  CreateSpecialtyDto,
  UpdateSpecialtyDto,
  Specialty,
  SpecialtyDto,
  SpecialtyFormValues,
} from '../types/specialty'

export function mapFromSpecialtyDto(specialtyDto: SpecialtyDto): Specialty {
  return {
    description: specialtyDto.description,
    name: specialtyDto.name,
    id: specialtyDto.id,
  }
}

export function mapToCreateSpecialtyDto(
  specialty: SpecialtyFormValues
): CreateSpecialtyDto {
  return {
    description: specialty.description,
    name: specialty.name,
  }
}

export function mapToUpdateSpecialtyDto(
  specialty: SpecialtyFormValues
): UpdateSpecialtyDto {
  return {
    description: specialty.description,
    name: specialty.name,
  }
}
