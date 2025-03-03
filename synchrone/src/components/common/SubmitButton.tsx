import { ReactNode } from "react"
import { Button } from "./Button"

export const SubmitButton = ({children}: {children: ReactNode}) => {
  return (
  <Button variant="contained" type="submit">
    {children}
  </Button>
  )
}