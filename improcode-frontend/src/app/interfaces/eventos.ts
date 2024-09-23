export interface Evento {
    id: string;
    summary: string;
    location: string;
    description: string;
    startDateTime: string | null;
    endDateTime: string | null;
}