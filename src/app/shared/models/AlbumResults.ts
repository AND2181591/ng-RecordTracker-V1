export interface AlbumResults {
    items: [{
      album_type: string;
      artists: [{
        name: string;
      }], 
      available_markets: string[];
      id: string;
      images: [{
        url: string;
      }], 
      name: string;
      release_date: string;
    }]
}