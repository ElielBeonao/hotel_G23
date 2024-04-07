import { Moment } from "moment";
import { IChambre } from "./chambre.model";
import { ICompteUtilisateur } from "./compte-utilisateur.model";

export enum ReservationStatut {
    EN_ATTENTE = 0,
    CONFIRMEE = 1,
    ANNULEE = 2,
    TERMINEE = 3
}

export interface IReservation {
    id_res?: number;
    date_res?: Moment;
    date_debut?: Moment;
    date_fin?: Moment;
    statut_res?: ReservationStatut;
    chambre?: IChambre;
    client?: ICompteUtilisateur;
    employe?: ICompteUtilisateur;

}

export class Reservation implements IReservation {
    constructor(
        public id_res?: number,
        public date_res?: Moment,
        public date_debut?: Moment,
        public date_fin?: Moment,
        public statut_res?: ReservationStatut,
        public chambre?: IChambre,
        public client?: ICompteUtilisateur,
        public employe?: ICompteUtilisateur
    ) {}
}