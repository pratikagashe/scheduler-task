export interface IProviderProps {
    children: any
}

export interface IUserDetails {
    email: string
    fullName: string
    isLoggedIn: boolean
}

export interface IForgetPassword {
    email: string
}

export interface ILogin {
    email: string
    password: string
}

export interface ISignUp {
    email: string
    fullName: string
    password: string
    confirmPassword: string
}

export interface IResetPassword {
    email: string
    password: string
    confirmPassword: string
}

export interface IScheduledEventList {
    id: number
    eventDate: Date | string
    taskList: Array<ITaskList>
}

export interface ITaskList {
    timing: IScheduleTiming
    details: IScheduleDetails
}

export interface IScheduleTiming {
    startTime: Date | string
    endTime: Date | string
}

export interface IScheduleDetails {
    eventName: string
    eventType: string
}

export interface IDuration {
    id: number
    mins: string
}

export interface IAddEventType {
    eventName: string
    eventDurationId: number
    customMins: string
}

export interface IEventType {
    id: number
    name: string
    durationId: number
    customMins: string
}

export interface IMeetingConfiguration {
    eventType: IEventType
    hideConfiguration: Function
    taskDetails: ITaskList
    setTaskDetails: any
}

export interface IEnterDetails {
    eventType: IEventType
    taskDetails: ITaskList
    setTaskDetails: any
}

export interface IEnterDetailsForm {
    firstName: string
    lastName: string
    email: string
}
