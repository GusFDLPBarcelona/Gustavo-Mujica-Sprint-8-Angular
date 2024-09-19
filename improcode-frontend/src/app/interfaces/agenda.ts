export interface Agenda {
    id: string;
    summary: string;
    location: string;
    description: string;
    start: {
        dateTime: string;
    };
    end: {
        dateTime: string;
    };
}