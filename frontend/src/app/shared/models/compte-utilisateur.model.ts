export interface ICompteUtilisateur {

    id_user?: number;
    username?: string;
    nom_complet?: string;
    user_type?: string;

}

export class CompteUtilisateur implements ICompteUtilisateur {

    constructor(
        public id_user?: number,
        public username?: string,
        public nom_complet?: string,
        public user_type?: string
    ) {
    }

} 