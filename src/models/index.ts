export interface Subtitle {
  language: string;
  src: string;
}

export interface Video {
  resolution: number;
  src: string;
}

export interface MovieDetail {
  title: string;
  path: string;
  subtitles: Subtitle[];
  videos: Video[];
  poster: string | null;
  thumbnail: string | null;
  date: string;
}
