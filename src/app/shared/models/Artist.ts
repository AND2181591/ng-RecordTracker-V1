import { Album } from "./Album";

export class Artist {
    id: number;
    name: string;
    images: [{
        url: string;
    }];
    albums: Album[];
}