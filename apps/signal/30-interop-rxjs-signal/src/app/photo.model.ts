export interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
  datetaken: string;
  datetakengranularity: number;
  datetakenunknown: string;
  ownername: string;
  tags: string;
  url_q: string;
  height_q: number;
  width_q: number;
  url_m: string;
  height_m: number;
  width_m: number;
}
