
export class Orders {
    id: string;
    artistName: string;
    album: string;
    image: string;
    orderType: string;
    trackingUrl?: string;
    trackingNum?: string; 
    date?: {
        day: number, 
        month: number, 
        year: number
    };
    late?: boolean;
    afId?: string;
}