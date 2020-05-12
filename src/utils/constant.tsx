export const dummyScheduledEvents = [
    {
        id: 1,
        eventDate: 'Tue May 12 2020 13:18:30 GMT+0530 (IST)',
        taskList: [
            {
                timing: {
                    startTime: 'Tue May 12 2020 09:00:00 GMT+0530 (IST)',
                    endTime: 'Tue May 12 2020 09:30:00 GMT+0530 (IST)',
                },
                details: {
                    eventName: 'Rupert Grint',
                    eventType: 'Demo Call',
                },
            },
            {
                timing: {
                    startTime: 'Tue May 12 2020 13:00:00 GMT+0530 (IST)',
                    endTime: 'Tue May 12 2020 13:30:00 GMT+0530 (IST)',
                },
                details: {
                    eventName: 'Emma Granger',
                    eventType: 'Account Review',
                },
            },
        ],
    },
    {
        id: 2,
        eventDate: 'Tue May 13 2020 13:18:30 GMT+0530 (IST)',
        taskList: [
            {
                timing: {
                    startTime: 'Tue May 13 2020 09:00:00 GMT+0530 (IST)',
                    endTime: 'Tue May 13 2020 09:30:00 GMT+0530 (IST)',
                },
                details: {
                    eventName: 'Rupert Grint',
                    eventType: 'Demo Call',
                },
            },
            {
                timing: {
                    startTime: 'Tue May 13 2020 13:00:00 GMT+0530 (IST)',
                    endTime: 'Tue May 13 2020 13:30:00 GMT+0530 (IST)',
                },
                details: {
                    eventName: 'Emma Granger',
                    eventType: 'Account Review',
                },
            },
        ],
    },
]

export const dummyEventTypes = [
    {
        id: 1,
        name: 'Demo call',
        durationId: 2,
        customMins: '',
    },
    {
        id: 2,
        name: 'Technical call',
        durationId: 4,
        customMins: '',
    },
    {
        id: 3,
        name: 'Account review',
        durationId: 2,
        customMins: '',
    },
]

export const eventDuration = [
    { id: 1, mins: '15' },
    { id: 2, mins: '30' },
    { id: 3, mins: '45' },
    { id: 4, mins: '60' },
]
