export interface RefrigerationComponentResource {
  id: number;
  name: string;
  manufacturer: string;
  location: string;
  image: string;
  rating?: { average: string; reviews: string };
}
