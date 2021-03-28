export interface IMidia {
  imagePath: string;
  trailerUrl: string;
  category: string;
  name: string;
  _id: string;
}

export interface IVirtualMidia extends IMidia {
  isFavorite: boolean;
}