export interface IChaineHoteliere {

    id_ch?: number;
    nom_ch?: string;

}

export class ChaineHoteliere implements IChaineHoteliere {

    constructor(
        public id_ch?: number,
        public nom_ch?: string
    ) {
    }

}   