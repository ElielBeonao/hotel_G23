import { IChaineHoteliere } from "./chaine-hoteliere.model";

export interface IEtablissementHotelier {

    id_eh?: number;
    nom_eh?: string;
    classe_eh?: number;
    adresse_eh?: string;
    nbr_chambres?: number;
    chaineHoteliere?: IChaineHoteliere;

}

export class EtablissementHotelier implements IEtablissementHotelier {

    constructor(
        public id_eh?: number,
        public nom_eh?: string,
        public classe_eh?: number,
        public adresse_eh?: string,
        public nbr_chambres?: number,
        public chaineHoteliere?: IChaineHoteliere
    ) {}
} 