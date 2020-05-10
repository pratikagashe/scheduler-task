import React from 'react'
import AppRoutes from './component/routes'
import { UserContextProvider } from './component/Context'

function App() {
    return (
        <div className="container">
            <UserContextProvider>
                <AppRoutes />
            </UserContextProvider>
        </div>
    )
}

export default App
