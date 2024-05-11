import { useState } from "react"

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(true)

    return { isAuthenticated, setIsAuthenticated }
}