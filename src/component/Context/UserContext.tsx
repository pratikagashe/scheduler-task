import React, { createContext, useState } from 'react'
import { IUserDetails, IProviderProps } from '../../utils/interface'

const userProfile = {
    email: '',
    fullName: '',
    isLoggedIn: false,
}

export const Context = createContext<
    [IUserDetails, (profile: IUserDetails) => void]
>([userProfile, () => {}])

export const Provider = (props: IProviderProps): any => {
    const { children } = props
    const currentUserProfile = useState<IUserDetails>(userProfile)

    return (
        <Context.Provider value={currentUserProfile}>
            {children}
        </Context.Provider>
    )
}
