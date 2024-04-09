import { Moment } from "moment";
import { IChambre } from "./chambre.model";
import { ICompteUtilisateur } from "./compte-utilisateur.model";
import { IReservation } from "./reservation.model";

export enum LocationStatut {
    EN_ATTENTE = 0,
    EN_COURS = 1,
    TERMINEE = 2
}

export interface ILocation {
    id_loc?: number;
    date_loc?: Moment;
    date_debut?: Moment;
    date_fin?: Moment;
    statut_loc?: LocationStatut;
    reservation?: IReservation;
    chambre?: IChambre;
    client?: ICompteUtilisateur;
    employe?: ICompteUtilisateur;

}

export class Location implements ILocation {
    constructor(
        public id_loc?: number,
        public date_loc?: Moment,
        public date_debut?: Moment,
        public date_fin?: Moment,
        public reservation?: IReservation,
        public statut_loc?: LocationStatut,
        public chambre?: IChambre,
        public client?: ICompteUtilisateur,
        public employe?: ICompteUtilisateur
    ) {}
}