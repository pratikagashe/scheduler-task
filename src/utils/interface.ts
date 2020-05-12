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
