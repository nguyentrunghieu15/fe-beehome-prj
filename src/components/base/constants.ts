export interface SingleSelectedItem {
    id: string;
    label: string;
    value: any;
}

export interface ISuggestion {
    id: string;
    text: string;
}

export interface IDay {
    day?: number;
    date?: Date;
    events?: ICalendarEvent[];
}

export interface ICalendarEvent {
    name: string;
    id: string;
    from: Date;
    to: Date;
    color: string;
}
