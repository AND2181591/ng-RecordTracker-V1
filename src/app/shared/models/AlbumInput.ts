export interface AlbumInput {
    album: string;
    orderType: string;
    trackingNum?: string;
    date?: {
      day: number;
      month: number;
      year: number;
    }
}