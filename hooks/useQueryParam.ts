import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function useQueryParam(param: string, defaultValue: any) {
  const searchParams = useSearchParams()
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    const queryValue = searchParams.get(param)
    setValue(queryValue == null ? defaultValue : queryValue == 'false' ? false : true)
  }, [searchParams, param, defaultValue])

  return value
}

