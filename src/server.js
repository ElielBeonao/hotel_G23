const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 9090;
const appRoutes = require('./routes/index');
const jwtInterceptor = require('./core/jwt-interceptor');

app.use(cors({
  origin: 'http://localhost:4200', // remplacez par l'origine de votre application Angular
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', appRoutes.authenticationNotRequired);
app.use('/api', jwtInterceptor, appRoutes.authenticationRequired);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// je veux faire des routes CRUD pour les entites dans des dossiers separes
// -- BEGIN;
 
 

 
// -- CREATE TABLE IF NOT EXISTS public.bureau_chaine_hoteliere
// -- (
// --     id_bch serial NOT NULL,
// --     adresse_bch character varying NOT NULL,
// --     id_ch bigint NOT NULL,
// --     PRIMARY KEY (id_bch)
// -- );
 
// -- CREATE TABLE IF NOT EXISTS public.bureau_chaine_contact
// -- (
// --     id_bchc serial NOT NULL,
// --     telephone_bchc bigint NOT NULL,
// --     email_contact_bchc character varying NOT NULL,
// --     id_bch bigint NOT NULL,
// --     PRIMARY KEY (id_bchc)
// -- );
 

 
// -- CREATE TABLE IF NOT EXISTS public.etablissement_hotelier_contact
// -- (
// --     id_ehc serial NOT NULL,
// --     telephone_ehc bigint[] NOT NULL,
// --     email_contact_ehc character varying NOT NULL,
// --     id_eh bigint NOT NULL,
// --     PRIMARY KEY (id_ehc)
// -- );
 
// -- CREATE TABLE IF NOT EXISTS public.chambre
// -- (
// --     id_c character varying(6) NOT NULL,
// --     intitule_c character varying NOT NULL,
// --     prix_c double precision NOT NULL DEFAULT 0.00,
// --     tv_c boolean NOT NULL DEFAULT true,
// --     air_cond_c boolean NOT NULL DEFAULT true,
// --     refrigerator_c boolean NOT NULL DEFAULT true,
// --     extensible_c boolean NOT NULL DEFAULT false,
// --     capacite_c smallint NOT NULL DEFAULT 1,
// --     issue_c boolean NOT NULL DEFAULT false,
// --     id_eh bigint NOT NULL,
// --     disponible_c boolean NOT NULL,
// --     PRIMARY KEY (id_c)
// -- );
 
// -- CREATE TABLE IF NOT EXISTS public.client
// -- (
// --     nas_cli integer NOT NULL,
// --     nom_complet_cli character varying NOT NULL,
// --     date_creation_cli timestamp without time zone NOT NULL DEFAULT CURRENT_DATE,
// --     adresse character varying NOT NULL,
// --     PRIMARY KEY (nas_cli)
// -- );
 
// -- CREATE TABLE IF NOT EXISTS public.reservation
// -- (
// --     id_res bigint NOT NULL,
// --     date_res timestamp without time zone NOT NULL DEFAULT CURRENT_DATE,
// --     statut_res smallint NOT NULL DEFAULT 0,
// --     id_c character varying(6) NOT NULL,
// --     id_emp integer NOT NULL,
// --     id_cli integer NOT NULL,
// --     PRIMARY KEY (id_res)
// -- );
 
// -- CREATE TABLE IF NOT EXISTS public.employe
// -- (
// --     nas_emp integer NOT NULL,
// --     nom_complet_emp character varying NOT NULL,
// --     id_eh bigint NOT NULL,
// --     adresse character varying NOT NULL,
// --     role character varying(25) NOT NULL,
// --     PRIMARY KEY (nas_emp)
// -- );
 
// -- CREATE TABLE IF NOT EXISTS public.location
// -- (
// --     id_loc bigserial NOT NULL,
// --     date_loc timestamp without time zone NOT NULL,
// --     id_res bigint,
// --     id_cli integer NOT NULL,
// --     id_c character varying(6) NOT NULL,
// --     paiement bigint NOT NULL,
// --     nas_emp integer NOT NULL,
// --     PRIMARY KEY (id_loc)
// -- );
 
// -- ALTER TABLE IF EXISTS public.bureau_chaine_hoteliere
// --     ADD FOREIGN KEY (id_ch)
// --     REFERENCES public.chaine_hoteliere (id_ch) MATCH SIMPLE
// --     ON UPDATE NO ACTION
// --     ON DELETE NO ACTION
// --     NOT VALID;
 
 
// -- ALTER TABLE IF EXISTS public.bureau_chaine_contact
// --     ADD FOREIGN KEY (id_bch)
// --     REFERENCES public.bureau_chaine_hoteliere (id_bch) MATCH SIMPLE
// --     ON UPDATE NO ACTION
// --     ON DELETE NO ACTION
// --     NOT VALID;
 
 
// -- ALTER TABLE IF EXISTS public.etablissement_hotelier
// --     ADD FOREIGN KEY (id_ch)
// --     REFERENCES public.chaine_hoteliere (id_ch) MATCH SIMPLE
// --     ON UPDATE NO ACTION
// --     ON DELETE NO ACTION
// --     NOT VALID;
 
 
// -- ALTER TABLE IF EXISTS public.etablissement_hotelier_contact
// --     ADD FOREIGN KEY (id_eh)
// --     REFERENCES public.etablissement_hotelier (id_eh) MATCH SIMPLE
// --     ON UPDATE NO ACTION
// --     ON DELETE NO ACTION
// --     NOT VALID;
 
 
// -- ALTER TABLE IF EXISTS public.chambre
// --     ADD FOREIGN KEY (id_eh)
// --     REFERENCES public.etablissement_hotelier (id_eh) MATCH SIMPLE
// --     ON UPDATE NO ACTION
// --     ON DELETE NO ACTION
// --     NOT VALID;
 
 
// -- ALTER TABLE IF EXISTS public.client
// --     ADD FOREIGN KEY (nas_cli)
// --     REFERENCES public.location (id_loc) MATCH SIMPLE
// --     ON UPDATE NO ACTION
// --     ON DELETE NO ACTION
// --     NOT VALID;
 
 
// -- ALTER TABLE IF EXISTS public.reservation
// --     ADD FOREIGN KEY (id_emp)
// --     REFERENCES public.employe (nas_emp) MATCH SIMPLE
// --     ON UPDATE NO ACTION
// --     ON DELETE NO ACTION
// --     NOT VALID;
 
 
// -- ALTER TABLE IF EXISTS public.reservation
// --     ADD FOREIGN KEY (id_cli)
// --     REFERENCES public.client (nas_cli) MATCH SIMPLE
// --     ON UPDATE NO ACTION
// --     ON DELETE NO ACTION
// --     NOT VALID;
 
 
// -- ALTER TABLE IF EXISTS public.employe
// --     ADD FOREIGN KEY (id_eh)
// --     REFERENCES public.etablissement_hotelier (id_eh) MATCH SIMPLE
// --     ON UPDATE NO ACTION
// --     ON DELETE NO ACTION
// --     NOT VALID;
 
 
// -- ALTER TABLE IF EXISTS public.location
// --     ADD FOREIGN KEY (id_res)
// --     REFERENCES public.reservation (id_res) MATCH SIMPLE
// --     ON UPDATE NO ACTION
// --     ON DELETE NO ACTION
// --     NOT VALID;
 
 
// -- ALTER TABLE IF EXISTS public.location
// --     ADD FOREIGN KEY (nas_emp)
// --     REFERENCES public.employe (nas_emp) MATCH SIMPLE
// --     ON UPDATE NO ACTION
// --     ON DELETE NO ACTION
// --     NOT VALID;
 
 
// -- ALTER TABLE IF EXISTS public.location
// --     ADD FOREIGN KEY (id_c)
// --     REFERENCES public.chambre (id_c) MATCH SIMPLE
// --     ON UPDATE NO ACTION
// --     ON DELETE NO ACTION
// --     NOT VALID;
 
// -- END;

