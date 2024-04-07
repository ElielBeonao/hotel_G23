import { IEtablissementHotelier } from "./etablissement-hotelier.model";

export interface IChambre {

    id_c?: string;
    intitule_c?: string;
    prix_c?: number;
    tv_c?: boolean;
    air_cond_c?: boolean;
    refrigerator_c?: boolean;
    extensible_c?: boolean;
    capacite_c?: number;
    issue_c?: boolean;
    disponible_c?: boolean,
    etablissementHotelier?: IEtablissementHotelier;

}

export class Chambre implements IChambre {

    constructor(
        public id_c?: string,
        public intitule_c?: string,
        public prix_c?: number,
        public tv_c?: boolean,
        public air_cond_c?: boolean,
        public refrigerator_c?: boolean,
        public extensible_c?: boolean,
        public capacite_c?: number,
        public issue_c?: boolean,
        public disponible_c?: boolean,
        public etablissementHotelier?: IEtablissementHotelier
    ) {}
} 