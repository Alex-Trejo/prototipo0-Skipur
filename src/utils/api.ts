export type QueryParamsMapper<T> = {
  [K in keyof T]: {
    param: string
    value: T[K]
  }
}

export function buildApiRequestParams<T>(queryParamsMap: QueryParamsMapper<T>) {
  const params: Record<string, string> = {}

  for (const key in queryParamsMap) {
    const { param, value } = queryParamsMap[key as keyof QueryParamsMapper<T>]
    params[param] = String(value)
  }

  return params
}
