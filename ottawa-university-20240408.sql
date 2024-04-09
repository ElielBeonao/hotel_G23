--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2

-- Started on 2024-04-08 00:39:29 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 237 (class 1255 OID 42492)
-- Name: chambre_reservation_after_insert_func(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.chambre_reservation_after_insert_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.statut_res = 1 THEN
        UPDATE chambre SET disponible_c = false WHERE id_c = NEW.id_c;
        IF NOT EXISTS (SELECT 1 FROM location WHERE id_c = NEW.id_c AND NEW.date_debut <= date_fin AND NEW.date_fin >= date_debut) THEN
            INSERT INTO location (id_c, date_debut, date_fin) VALUES (NEW.id_c, NEW.date_debut, NEW.date_fin);
        END IF;
    ELSE
        UPDATE chambre SET disponible_c = true WHERE id_c = NEW.id_c;
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.chambre_reservation_after_insert_func() OWNER TO postgres;

--
-- TOC entry 249 (class 1255 OID 42589)
-- Name: chambre_reservation_after_update_func(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.chambre_reservation_after_update_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.statut_res = 1 THEN
        -- Mettre à jour la location existante si la nouvelle réservation chevauche une location existante
        UPDATE location
        SET date_debut = GREATEST(NEW.date_debut, date_debut),
            date_fin = LEAST(NEW.date_fin, date_fin),
			nas_emp = NEW.id_emp
        WHERE id_c = NEW.id_c
        AND NEW.date_debut <= date_fin
        AND NEW.date_fin >= date_debut;

        -- Si aucune location existante n'a été mise à jour, en créer une nouvelle
        IF NOT FOUND THEN
            INSERT INTO location (id_c, date_debut, date_fin, id_cli, nas_emp, id_res) VALUES (NEW.id_c, NEW.date_debut, NEW.date_fin, NEW.id_cli, NEW.id_emp, NEW.id_res);
        END IF;

        UPDATE chambre SET disponible_c = false WHERE id_c = NEW.id_c;
    ELSIF NEW.statut_res = 2 THEN
        -- Supprimer la location correspondante à la réservation annulée
        DELETE FROM location WHERE id_c = NEW.id_c AND id_res = NEW.id_res;

        -- Si aucune autre réservation n'existe pour la chambre, la marquer comme disponible
        IF NOT EXISTS (SELECT 1 FROM reservation WHERE id_c = NEW.id_c AND statut_res = 1) THEN
            UPDATE chambre SET disponible_c = true WHERE id_c = NEW.id_c;
        END IF;
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.chambre_reservation_after_update_func() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 17936)
-- Name: bureau_chaine_contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bureau_chaine_contact (
    id_bchc integer NOT NULL,
    telephone_bchc bigint NOT NULL,
    email_contact_bchc character varying NOT NULL,
    id_bch bigint NOT NULL
);


ALTER TABLE public.bureau_chaine_contact OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17935)
-- Name: bureau_chaine_contact_id_bchc_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bureau_chaine_contact_id_bchc_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bureau_chaine_contact_id_bchc_seq OWNER TO postgres;

--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 219
-- Name: bureau_chaine_contact_id_bchc_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bureau_chaine_contact_id_bchc_seq OWNED BY public.bureau_chaine_contact.id_bchc;


--
-- TOC entry 218 (class 1259 OID 17927)
-- Name: bureau_chaine_hoteliere; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bureau_chaine_hoteliere (
    id_bch integer NOT NULL,
    adresse_bch character varying NOT NULL,
    id_ch bigint NOT NULL
);


ALTER TABLE public.bureau_chaine_hoteliere OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17926)
-- Name: bureau_chaine_hoteliere_id_bch_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bureau_chaine_hoteliere_id_bch_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bureau_chaine_hoteliere_id_bch_seq OWNER TO postgres;

--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 217
-- Name: bureau_chaine_hoteliere_id_bch_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bureau_chaine_hoteliere_id_bch_seq OWNED BY public.bureau_chaine_hoteliere.id_bch;


--
-- TOC entry 216 (class 1259 OID 17918)
-- Name: chaine_hoteliere; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chaine_hoteliere (
    id_ch integer NOT NULL,
    nom_ch character varying NOT NULL
);


ALTER TABLE public.chaine_hoteliere OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 17917)
-- Name: chaine_hoteliere_id_ch_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chaine_hoteliere_id_ch_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chaine_hoteliere_id_ch_seq OWNER TO postgres;

--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 215
-- Name: chaine_hoteliere_id_ch_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chaine_hoteliere_id_ch_seq OWNED BY public.chaine_hoteliere.id_ch;


--
-- TOC entry 225 (class 1259 OID 17964)
-- Name: chambre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chambre (
    id_c character varying(6) NOT NULL,
    intitule_c character varying NOT NULL,
    prix_c double precision DEFAULT 0.00 NOT NULL,
    tv_c boolean DEFAULT true NOT NULL,
    air_cond_c boolean DEFAULT true NOT NULL,
    refrigerator_c boolean DEFAULT true NOT NULL,
    extensible_c boolean DEFAULT false NOT NULL,
    capacite_c smallint DEFAULT 1 NOT NULL,
    issue_c boolean DEFAULT false NOT NULL,
    id_eh bigint NOT NULL,
    disponible_c boolean NOT NULL
);


ALTER TABLE public.chambre OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 26126)
-- Name: compte_utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compte_utilisateur (
    id_user bigint NOT NULL,
    nom_complet character varying NOT NULL,
    username character varying NOT NULL,
    password text NOT NULL,
    user_type character varying NOT NULL
);


ALTER TABLE public.compte_utilisateur OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 26125)
-- Name: compte_utilisateur_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.compte_utilisateur_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.compte_utilisateur_id_user_seq OWNER TO postgres;

--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 227
-- Name: compte_utilisateur_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compte_utilisateur_id_user_seq OWNED BY public.compte_utilisateur.id_user;


--
-- TOC entry 222 (class 1259 OID 17945)
-- Name: etablissement_hotelier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.etablissement_hotelier (
    id_eh integer NOT NULL,
    classe_eh smallint DEFAULT 1 NOT NULL,
    adresse_eh character varying NOT NULL,
    nom_eh character varying NOT NULL,
    nbr_chambres smallint DEFAULT 0 NOT NULL,
    id_ch bigint NOT NULL
);


ALTER TABLE public.etablissement_hotelier OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17956)
-- Name: etablissement_hotelier_contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.etablissement_hotelier_contact (
    id_ehc integer NOT NULL,
    telephone_ehc bigint[] NOT NULL,
    email_contact_ehc character varying NOT NULL,
    id_eh bigint NOT NULL
);


ALTER TABLE public.etablissement_hotelier_contact OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17955)
-- Name: etablissement_hotelier_contact_id_ehc_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.etablissement_hotelier_contact_id_ehc_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.etablissement_hotelier_contact_id_ehc_seq OWNER TO postgres;

--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 223
-- Name: etablissement_hotelier_contact_id_ehc_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.etablissement_hotelier_contact_id_ehc_seq OWNED BY public.etablissement_hotelier_contact.id_ehc;


--
-- TOC entry 221 (class 1259 OID 17944)
-- Name: etablissement_hotelier_id_eh_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.etablissement_hotelier_id_eh_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.etablissement_hotelier_id_eh_seq OWNER TO postgres;

--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 221
-- Name: etablissement_hotelier_id_eh_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.etablissement_hotelier_id_eh_seq OWNED BY public.etablissement_hotelier.id_eh;


--
-- TOC entry 232 (class 1259 OID 42524)
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    id_loc bigint NOT NULL,
    date_loc timestamp without time zone DEFAULT CURRENT_DATE NOT NULL,
    id_res bigint,
    id_cli integer NOT NULL,
    id_c character varying(6) NOT NULL,
    nas_emp integer NOT NULL,
    date_debut timestamp without time zone NOT NULL,
    date_fin timestamp without time zone NOT NULL,
    statut_loc smallint DEFAULT 0 NOT NULL
);


ALTER TABLE public.location OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 42523)
-- Name: location_id_loc_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.location_id_loc_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.location_id_loc_seq OWNER TO postgres;

--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 231
-- Name: location_id_loc_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.location_id_loc_seq OWNED BY public.location.id_loc;


--
-- TOC entry 234 (class 1259 OID 42547)
-- Name: paiement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.paiement (
    p_id bigint NOT NULL,
    p_date timestamp without time zone DEFAULT CURRENT_DATE NOT NULL,
    p_montant bigint DEFAULT 0 NOT NULL,
    id_loc bigint NOT NULL,
    nas_emp bigint NOT NULL
);


ALTER TABLE public.paiement OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 42546)
-- Name: paiement_p_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.paiement_p_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.paiement_p_id_seq OWNER TO postgres;

--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 233
-- Name: paiement_p_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.paiement_p_id_seq OWNED BY public.paiement.p_id;


--
-- TOC entry 230 (class 1259 OID 42505)
-- Name: reservation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservation (
    id_res bigint NOT NULL,
    date_res timestamp without time zone DEFAULT CURRENT_DATE NOT NULL,
    statut_res smallint DEFAULT 0 NOT NULL,
    id_c character varying(6) NOT NULL,
    id_emp integer,
    id_cli integer NOT NULL,
    date_debut timestamp without time zone NOT NULL,
    date_fin timestamp without time zone NOT NULL
);


ALTER TABLE public.reservation OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 42504)
-- Name: reservation_id_res_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservation_id_res_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservation_id_res_seq OWNER TO postgres;

--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 229
-- Name: reservation_id_res_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservation_id_res_seq OWNED BY public.reservation.id_res;


--
-- TOC entry 236 (class 1259 OID 42573)
-- Name: total_capacite_chambres_hotel_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.total_capacite_chambres_hotel_view AS
 SELECT eh.id_eh,
    c.intitule_c,
    count(*) AS count
   FROM (public.chambre c
     JOIN public.etablissement_hotelier eh ON ((eh.id_eh = c.id_eh)))
  GROUP BY eh.id_eh, c.intitule_c;


ALTER VIEW public.total_capacite_chambres_hotel_view OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 42560)
-- Name: total_chambre_disponible_adresse_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.total_chambre_disponible_adresse_view AS
 SELECT eh.adresse_eh,
    count(c.*) AS count
   FROM (public.chambre c
     JOIN public.etablissement_hotelier eh ON ((eh.id_eh = c.id_eh)))
  WHERE (c.disponible_c = true)
  GROUP BY eh.adresse_eh;


ALTER VIEW public.total_chambre_disponible_adresse_view OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 26108)
-- Name: utilisateur_role_etablissement_hotelier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur_role_etablissement_hotelier (
    nas_utilisateur bigint NOT NULL,
    id_eh bigint NOT NULL,
    role_utilisateur character varying NOT NULL
);


ALTER TABLE public.utilisateur_role_etablissement_hotelier OWNER TO postgres;

--
-- TOC entry 3263 (class 2604 OID 17939)
-- Name: bureau_chaine_contact id_bchc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bureau_chaine_contact ALTER COLUMN id_bchc SET DEFAULT nextval('public.bureau_chaine_contact_id_bchc_seq'::regclass);


--
-- TOC entry 3262 (class 2604 OID 17930)
-- Name: bureau_chaine_hoteliere id_bch; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bureau_chaine_hoteliere ALTER COLUMN id_bch SET DEFAULT nextval('public.bureau_chaine_hoteliere_id_bch_seq'::regclass);


--
-- TOC entry 3261 (class 2604 OID 17921)
-- Name: chaine_hoteliere id_ch; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chaine_hoteliere ALTER COLUMN id_ch SET DEFAULT nextval('public.chaine_hoteliere_id_ch_seq'::regclass);


--
-- TOC entry 3275 (class 2604 OID 26129)
-- Name: compte_utilisateur id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compte_utilisateur ALTER COLUMN id_user SET DEFAULT nextval('public.compte_utilisateur_id_user_seq'::regclass);


--
-- TOC entry 3264 (class 2604 OID 17948)
-- Name: etablissement_hotelier id_eh; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etablissement_hotelier ALTER COLUMN id_eh SET DEFAULT nextval('public.etablissement_hotelier_id_eh_seq'::regclass);


--
-- TOC entry 3267 (class 2604 OID 17959)
-- Name: etablissement_hotelier_contact id_ehc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etablissement_hotelier_contact ALTER COLUMN id_ehc SET DEFAULT nextval('public.etablissement_hotelier_contact_id_ehc_seq'::regclass);


--
-- TOC entry 3279 (class 2604 OID 42527)
-- Name: location id_loc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location ALTER COLUMN id_loc SET DEFAULT nextval('public.location_id_loc_seq'::regclass);


--
-- TOC entry 3282 (class 2604 OID 42550)
-- Name: paiement p_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiement ALTER COLUMN p_id SET DEFAULT nextval('public.paiement_p_id_seq'::regclass);


--
-- TOC entry 3276 (class 2604 OID 42508)
-- Name: reservation id_res; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation ALTER COLUMN id_res SET DEFAULT nextval('public.reservation_id_res_seq'::regclass);


--
-- TOC entry 3471 (class 0 OID 17936)
-- Dependencies: 220
-- Data for Name: bureau_chaine_contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bureau_chaine_contact VALUES (1, 8190010000, 'alpha@hotel.ca', 1);
INSERT INTO public.bureau_chaine_contact VALUES (2, 6130020000, 'beta@hotel.ca', 2);
INSERT INTO public.bureau_chaine_contact VALUES (3, 9110030000, 'gama@hotel.ca', 3);
INSERT INTO public.bureau_chaine_contact VALUES (4, 7770040000, 'delata@hotel.ca', 4);
INSERT INTO public.bureau_chaine_contact VALUES (5, 1230050000, 'epsilon@hotel.ca', 5);


--
-- TOC entry 3469 (class 0 OID 17927)
-- Dependencies: 218
-- Data for Name: bureau_chaine_hoteliere; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bureau_chaine_hoteliere VALUES (1, '100 javascript canada ottawa ontario', 1);
INSERT INTO public.bureau_chaine_hoteliere VALUES (2, '8 python canada gatineau quebec', 2);
INSERT INTO public.bureau_chaine_hoteliere VALUES (3, '21 jumpstreet canada vancouvert comlombie-britanique', 3);
INSERT INTO public.bureau_chaine_hoteliere VALUES (4, '999 heaven road canada edmonton alberta ', 4);
INSERT INTO public.bureau_chaine_hoteliere VALUES (5, '100 javascript canada regina saskatchewan', 5);


--
-- TOC entry 3467 (class 0 OID 17918)
-- Dependencies: 216
-- Data for Name: chaine_hoteliere; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.chaine_hoteliere VALUES (1, 'Alpha');
INSERT INTO public.chaine_hoteliere VALUES (2, 'Beta');
INSERT INTO public.chaine_hoteliere VALUES (3, 'Gamma');
INSERT INTO public.chaine_hoteliere VALUES (4, 'Delta');
INSERT INTO public.chaine_hoteliere VALUES (5, 'Epsilon');


--
-- TOC entry 3476 (class 0 OID 17964)
-- Dependencies: 225
-- Data for Name: chambre; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.chambre VALUES ('2', 'single', 80, false, false, true, true, 1, false, 2, true);
INSERT INTO public.chambre VALUES ('3', 'single', 80, false, false, true, true, 1, false, 3, true);
INSERT INTO public.chambre VALUES ('4', 'single', 80, false, false, true, true, 1, false, 4, true);
INSERT INTO public.chambre VALUES ('5', 'single', 80, false, false, true, true, 1, false, 5, true);
INSERT INTO public.chambre VALUES ('6', 'single', 80, false, false, true, true, 1, false, 6, true);
INSERT INTO public.chambre VALUES ('7', 'single', 80, false, false, true, true, 1, false, 7, true);
INSERT INTO public.chambre VALUES ('8', 'single', 80, false, false, true, true, 1, false, 8, true);
INSERT INTO public.chambre VALUES ('9', 'single', 80, false, false, true, true, 1, false, 9, true);
INSERT INTO public.chambre VALUES ('10', 'single', 80, false, false, true, true, 1, false, 10, true);
INSERT INTO public.chambre VALUES ('11', 'single', 80, false, false, true, true, 1, false, 11, true);
INSERT INTO public.chambre VALUES ('12', 'single', 80, false, false, true, true, 1, false, 12, true);
INSERT INTO public.chambre VALUES ('13', 'single', 80, false, false, true, true, 1, false, 13, true);
INSERT INTO public.chambre VALUES ('14', 'single', 80, false, false, true, true, 1, false, 14, true);
INSERT INTO public.chambre VALUES ('15', 'single', 80, false, false, true, true, 1, false, 15, true);
INSERT INTO public.chambre VALUES ('16', 'single', 80, false, false, true, true, 1, false, 16, true);
INSERT INTO public.chambre VALUES ('17', 'single', 80, false, false, true, true, 1, false, 17, true);
INSERT INTO public.chambre VALUES ('18', 'single', 80, false, false, true, true, 1, false, 18, true);
INSERT INTO public.chambre VALUES ('19', 'single', 80, false, false, true, true, 1, false, 19, true);
INSERT INTO public.chambre VALUES ('20', 'single', 80, false, true, false, true, 1, false, 20, true);
INSERT INTO public.chambre VALUES ('21', 'single', 80, false, false, true, false, 1, false, 21, true);
INSERT INTO public.chambre VALUES ('22', 'single', 80, false, false, true, false, 1, false, 22, true);
INSERT INTO public.chambre VALUES ('23', 'single', 80, false, false, true, false, 1, false, 23, true);
INSERT INTO public.chambre VALUES ('24', 'single', 80, false, false, true, false, 1, false, 24, true);
INSERT INTO public.chambre VALUES ('25', 'single', 80, false, false, true, false, 1, false, 25, true);
INSERT INTO public.chambre VALUES ('26', 'single', 80, false, false, true, false, 1, false, 26, true);
INSERT INTO public.chambre VALUES ('27', 'single', 80, false, false, true, false, 1, false, 27, true);
INSERT INTO public.chambre VALUES ('28', 'single', 80, false, false, true, false, 1, false, 28, true);
INSERT INTO public.chambre VALUES ('29', 'single', 80, false, false, true, false, 1, false, 29, true);
INSERT INTO public.chambre VALUES ('30', 'single', 80, false, false, true, false, 1, false, 30, true);
INSERT INTO public.chambre VALUES ('31', 'single', 80, false, false, true, false, 1, false, 31, true);
INSERT INTO public.chambre VALUES ('32', 'single', 80, false, false, true, false, 1, false, 32, true);
INSERT INTO public.chambre VALUES ('33', 'single', 80, false, false, true, false, 1, false, 33, true);
INSERT INTO public.chambre VALUES ('34', 'single', 80, false, false, true, false, 1, false, 34, true);
INSERT INTO public.chambre VALUES ('35', 'single', 80, false, false, true, false, 1, false, 35, true);
INSERT INTO public.chambre VALUES ('36', 'single', 80, false, false, true, false, 1, false, 36, true);
INSERT INTO public.chambre VALUES ('37', 'single', 80, false, false, true, false, 1, false, 37, true);
INSERT INTO public.chambre VALUES ('38', 'single', 80, false, false, true, false, 1, false, 38, true);
INSERT INTO public.chambre VALUES ('39', 'single', 80, false, false, true, false, 1, false, 39, true);
INSERT INTO public.chambre VALUES ('40', 'single', 80, false, false, true, false, 1, false, 40, true);
INSERT INTO public.chambre VALUES ('41', 'double', 120, false, false, true, true, 2, false, 1, true);
INSERT INTO public.chambre VALUES ('42', 'double', 120, false, false, true, true, 2, false, 2, true);
INSERT INTO public.chambre VALUES ('43', 'double', 120, false, false, true, true, 2, false, 3, true);
INSERT INTO public.chambre VALUES ('44', 'double', 120, false, false, true, true, 2, false, 4, true);
INSERT INTO public.chambre VALUES ('45', 'double', 120, false, false, true, true, 2, false, 5, true);
INSERT INTO public.chambre VALUES ('46', 'double', 120, false, false, true, true, 2, false, 6, true);
INSERT INTO public.chambre VALUES ('47', 'double', 120, false, false, true, true, 2, false, 7, true);
INSERT INTO public.chambre VALUES ('48', 'double', 120, false, false, true, true, 2, false, 8, true);
INSERT INTO public.chambre VALUES ('49', 'double', 120, false, false, true, true, 2, false, 9, true);
INSERT INTO public.chambre VALUES ('50', 'double', 120, false, false, true, true, 2, false, 10, true);
INSERT INTO public.chambre VALUES ('51', 'double', 120, false, false, true, true, 2, false, 11, true);
INSERT INTO public.chambre VALUES ('52', 'double', 120, false, false, true, true, 2, false, 12, true);
INSERT INTO public.chambre VALUES ('53', 'double', 120, false, false, true, true, 2, false, 13, true);
INSERT INTO public.chambre VALUES ('54', 'double', 120, false, false, true, true, 2, false, 14, true);
INSERT INTO public.chambre VALUES ('55', 'double', 120, false, false, true, true, 2, false, 15, true);
INSERT INTO public.chambre VALUES ('56', 'double', 120, false, false, true, true, 2, false, 16, true);
INSERT INTO public.chambre VALUES ('57', 'double', 120, false, false, true, true, 2, false, 17, true);
INSERT INTO public.chambre VALUES ('58', 'double', 120, false, false, true, true, 2, false, 18, true);
INSERT INTO public.chambre VALUES ('59', 'double', 120, false, false, true, true, 2, false, 19, true);
INSERT INTO public.chambre VALUES ('60', 'double', 120, false, false, true, true, 2, false, 20, true);
INSERT INTO public.chambre VALUES ('61', 'double', 120, false, false, true, true, 2, false, 21, true);
INSERT INTO public.chambre VALUES ('62', 'double', 120, false, false, true, true, 2, false, 22, true);
INSERT INTO public.chambre VALUES ('63', 'double', 120, false, false, true, true, 2, false, 23, true);
INSERT INTO public.chambre VALUES ('64', 'double', 120, false, false, true, true, 2, false, 24, true);
INSERT INTO public.chambre VALUES ('65', 'double', 120, false, false, true, true, 2, false, 25, true);
INSERT INTO public.chambre VALUES ('66', 'double', 120, false, false, true, true, 2, false, 26, true);
INSERT INTO public.chambre VALUES ('67', 'double', 120, false, false, true, true, 2, false, 27, true);
INSERT INTO public.chambre VALUES ('68', 'double', 120, false, false, true, true, 2, false, 28, true);
INSERT INTO public.chambre VALUES ('69', 'double', 120, false, false, true, true, 2, false, 29, true);
INSERT INTO public.chambre VALUES ('70', 'double', 120, false, false, true, true, 2, false, 30, true);
INSERT INTO public.chambre VALUES ('71', 'double', 120, false, false, true, true, 2, false, 31, true);
INSERT INTO public.chambre VALUES ('72', 'double', 120, false, false, true, true, 2, false, 32, true);
INSERT INTO public.chambre VALUES ('73', 'double', 120, false, false, true, true, 2, false, 33, true);
INSERT INTO public.chambre VALUES ('74', 'double', 120, false, false, true, true, 2, false, 34, true);
INSERT INTO public.chambre VALUES ('75', 'double', 120, false, false, true, true, 2, false, 35, true);
INSERT INTO public.chambre VALUES ('76', 'double', 120, false, false, true, true, 2, false, 36, true);
INSERT INTO public.chambre VALUES ('77', 'double', 120, false, false, true, true, 2, false, 37, true);
INSERT INTO public.chambre VALUES ('78', 'double', 120, false, false, true, true, 2, false, 38, true);
INSERT INTO public.chambre VALUES ('79', 'double', 120, false, false, true, true, 2, false, 39, true);
INSERT INTO public.chambre VALUES ('80', 'double', 120, false, false, true, true, 2, false, 40, true);
INSERT INTO public.chambre VALUES ('81', 'triple', 180, true, false, true, true, 3, false, 1, true);
INSERT INTO public.chambre VALUES ('82', 'triple', 180, true, false, true, true, 3, false, 2, true);
INSERT INTO public.chambre VALUES ('83', 'triple', 180, true, false, true, true, 3, false, 3, true);
INSERT INTO public.chambre VALUES ('84', 'triple', 180, true, false, true, true, 3, false, 4, true);
INSERT INTO public.chambre VALUES ('85', 'triple', 180, true, false, true, true, 3, false, 5, true);
INSERT INTO public.chambre VALUES ('86', 'triple', 180, true, false, true, true, 3, false, 6, true);
INSERT INTO public.chambre VALUES ('87', 'triple', 180, true, false, true, true, 3, false, 7, true);
INSERT INTO public.chambre VALUES ('88', 'triple', 180, true, false, true, true, 3, false, 8, true);
INSERT INTO public.chambre VALUES ('89', 'triple', 180, true, false, true, true, 3, false, 9, true);
INSERT INTO public.chambre VALUES ('90', 'triple', 180, true, false, true, true, 3, false, 10, true);
INSERT INTO public.chambre VALUES ('91', 'triple', 180, true, false, true, true, 3, false, 11, true);
INSERT INTO public.chambre VALUES ('92', 'triple', 180, true, false, true, true, 3, false, 12, true);
INSERT INTO public.chambre VALUES ('93', 'triple', 180, true, false, true, true, 3, false, 13, true);
INSERT INTO public.chambre VALUES ('94', 'triple', 180, true, false, true, true, 3, false, 14, true);
INSERT INTO public.chambre VALUES ('95', 'triple', 180, true, false, true, true, 3, false, 15, true);
INSERT INTO public.chambre VALUES ('96', 'triple', 180, true, false, true, true, 3, false, 16, true);
INSERT INTO public.chambre VALUES ('97', 'triple', 180, true, false, true, true, 3, false, 17, true);
INSERT INTO public.chambre VALUES ('98', 'triple', 180, true, false, true, true, 3, false, 18, true);
INSERT INTO public.chambre VALUES ('99', 'triple', 180, true, false, true, true, 3, false, 19, true);
INSERT INTO public.chambre VALUES ('100', 'triple', 180, true, false, true, true, 3, false, 20, true);
INSERT INTO public.chambre VALUES ('101', 'triple', 180, true, false, true, true, 3, false, 21, true);
INSERT INTO public.chambre VALUES ('102', 'triple', 180, true, false, true, true, 3, false, 22, true);
INSERT INTO public.chambre VALUES ('103', 'triple', 180, true, false, true, true, 3, false, 23, true);
INSERT INTO public.chambre VALUES ('104', 'triple', 180, true, false, true, true, 3, false, 24, true);
INSERT INTO public.chambre VALUES ('105', 'triple', 180, true, false, true, true, 3, false, 25, true);
INSERT INTO public.chambre VALUES ('106', 'triple', 180, true, false, true, true, 3, false, 26, true);
INSERT INTO public.chambre VALUES ('107', 'triple', 180, true, false, true, true, 3, false, 27, true);
INSERT INTO public.chambre VALUES ('108', 'triple', 180, true, false, true, true, 3, false, 28, true);
INSERT INTO public.chambre VALUES ('109', 'triple', 180, true, false, true, true, 3, false, 29, true);
INSERT INTO public.chambre VALUES ('110', 'triple', 180, true, false, true, true, 3, false, 30, true);
INSERT INTO public.chambre VALUES ('111', 'triple', 180, true, false, true, true, 3, false, 31, true);
INSERT INTO public.chambre VALUES ('112', 'triple', 180, true, false, true, true, 3, false, 32, true);
INSERT INTO public.chambre VALUES ('113', 'triple', 180, true, false, true, true, 3, false, 33, true);
INSERT INTO public.chambre VALUES ('114', 'triple', 180, true, false, true, true, 3, false, 34, true);
INSERT INTO public.chambre VALUES ('115', 'triple', 180, true, false, true, true, 3, false, 35, true);
INSERT INTO public.chambre VALUES ('116', 'triple', 180, true, false, true, true, 3, false, 36, true);
INSERT INTO public.chambre VALUES ('117', 'triple', 180, true, false, true, true, 3, false, 37, true);
INSERT INTO public.chambre VALUES ('118', 'triple', 180, true, false, true, true, 3, false, 38, true);
INSERT INTO public.chambre VALUES ('119', 'triple', 180, true, false, true, true, 3, false, 39, true);
INSERT INTO public.chambre VALUES ('120', 'triple', 180, true, false, true, true, 3, false, 40, true);
INSERT INTO public.chambre VALUES ('121', 'quad', 230, true, false, true, true, 4, false, 1, true);
INSERT INTO public.chambre VALUES ('122', 'quad', 230, true, false, true, true, 4, false, 2, true);
INSERT INTO public.chambre VALUES ('123', 'quad', 230, true, false, true, true, 4, false, 3, true);
INSERT INTO public.chambre VALUES ('124', 'quad', 230, true, false, true, true, 4, false, 4, true);
INSERT INTO public.chambre VALUES ('125', 'quad', 230, true, false, true, true, 4, false, 5, true);
INSERT INTO public.chambre VALUES ('126', 'quad', 230, true, false, true, true, 4, false, 6, true);
INSERT INTO public.chambre VALUES ('127', 'quad', 230, true, false, true, true, 4, false, 7, true);
INSERT INTO public.chambre VALUES ('128', 'quad', 230, true, false, true, true, 4, false, 8, true);
INSERT INTO public.chambre VALUES ('129', 'quad', 230, true, false, true, true, 4, false, 9, true);
INSERT INTO public.chambre VALUES ('130', 'quad', 230, true, false, true, true, 4, false, 10, true);
INSERT INTO public.chambre VALUES ('131', 'quad', 230, true, false, true, true, 4, false, 11, true);
INSERT INTO public.chambre VALUES ('132', 'quad', 230, true, false, true, true, 4, false, 12, true);
INSERT INTO public.chambre VALUES ('133', 'quad', 230, true, false, true, true, 4, false, 13, true);
INSERT INTO public.chambre VALUES ('134', 'quad', 230, true, false, true, true, 4, false, 14, true);
INSERT INTO public.chambre VALUES ('135', 'quad', 230, true, false, true, true, 4, false, 15, true);
INSERT INTO public.chambre VALUES ('136', 'quad', 230, true, false, true, true, 4, false, 16, true);
INSERT INTO public.chambre VALUES ('137', 'quad', 230, true, false, true, true, 4, false, 17, true);
INSERT INTO public.chambre VALUES ('138', 'quad', 230, true, false, true, true, 4, false, 18, true);
INSERT INTO public.chambre VALUES ('139', 'quad', 230, true, false, true, true, 4, false, 19, true);
INSERT INTO public.chambre VALUES ('140', 'quad', 230, true, false, true, true, 4, false, 20, true);
INSERT INTO public.chambre VALUES ('141', 'quad', 230, true, false, true, true, 4, false, 21, true);
INSERT INTO public.chambre VALUES ('142', 'quad', 230, true, false, true, true, 4, false, 22, true);
INSERT INTO public.chambre VALUES ('143', 'quad', 230, true, false, true, true, 4, false, 23, true);
INSERT INTO public.chambre VALUES ('144', 'quad', 230, true, false, true, true, 4, false, 24, true);
INSERT INTO public.chambre VALUES ('145', 'quad', 230, true, false, true, true, 4, false, 25, true);
INSERT INTO public.chambre VALUES ('146', 'quad', 230, true, false, true, true, 4, false, 26, true);
INSERT INTO public.chambre VALUES ('147', 'quad', 230, true, false, true, true, 4, false, 27, true);
INSERT INTO public.chambre VALUES ('148', 'quad', 230, true, false, true, true, 4, false, 28, true);
INSERT INTO public.chambre VALUES ('149', 'quad', 230, true, false, true, true, 4, false, 29, true);
INSERT INTO public.chambre VALUES ('150', 'quad', 230, true, false, true, true, 4, false, 30, true);
INSERT INTO public.chambre VALUES ('151', 'quad', 230, true, false, true, true, 4, false, 31, true);
INSERT INTO public.chambre VALUES ('152', 'quad', 230, true, false, true, true, 4, false, 32, true);
INSERT INTO public.chambre VALUES ('153', 'quad', 230, true, false, true, true, 4, false, 33, true);
INSERT INTO public.chambre VALUES ('154', 'quad', 230, true, false, true, true, 4, false, 34, true);
INSERT INTO public.chambre VALUES ('155', 'quad', 230, true, false, true, true, 4, false, 35, true);
INSERT INTO public.chambre VALUES ('156', 'quad', 230, true, false, true, true, 4, false, 36, true);
INSERT INTO public.chambre VALUES ('157', 'quad', 230, true, false, true, true, 4, false, 37, true);
INSERT INTO public.chambre VALUES ('158', 'quad', 230, true, false, true, true, 4, false, 38, true);
INSERT INTO public.chambre VALUES ('159', 'quad', 230, true, false, true, true, 4, false, 39, true);
INSERT INTO public.chambre VALUES ('160', 'quad', 230, true, false, true, true, 4, false, 40, true);
INSERT INTO public.chambre VALUES ('161', 'suite', 1500, true, true, true, true, 5, false, 1, true);
INSERT INTO public.chambre VALUES ('162', 'suite', 1500, true, true, true, true, 5, false, 2, true);
INSERT INTO public.chambre VALUES ('163', 'suite', 1500, true, true, true, true, 5, false, 3, true);
INSERT INTO public.chambre VALUES ('164', 'suite', 1500, true, true, true, true, 5, false, 4, true);
INSERT INTO public.chambre VALUES ('165', 'suite', 1500, true, true, true, true, 5, false, 5, true);
INSERT INTO public.chambre VALUES ('166', 'suite', 1500, true, true, true, true, 5, false, 6, true);
INSERT INTO public.chambre VALUES ('167', 'suite', 1500, true, true, true, true, 5, false, 7, true);
INSERT INTO public.chambre VALUES ('168', 'suite', 1500, true, true, true, true, 5, false, 8, true);
INSERT INTO public.chambre VALUES ('169', 'suite', 1500, true, true, true, true, 5, false, 9, true);
INSERT INTO public.chambre VALUES ('170', 'suite', 1500, true, true, true, true, 5, false, 10, true);
INSERT INTO public.chambre VALUES ('171', 'suite', 1500, true, true, true, true, 5, false, 11, true);
INSERT INTO public.chambre VALUES ('172', 'suite', 1500, true, true, true, true, 5, false, 12, true);
INSERT INTO public.chambre VALUES ('173', 'suite', 1500, true, true, true, true, 5, false, 13, true);
INSERT INTO public.chambre VALUES ('174', 'suite', 1500, true, true, true, true, 5, false, 14, true);
INSERT INTO public.chambre VALUES ('175', 'suite', 1500, true, true, true, true, 5, false, 15, true);
INSERT INTO public.chambre VALUES ('176', 'suite', 1500, true, true, true, true, 5, false, 16, true);
INSERT INTO public.chambre VALUES ('177', 'suite', 1500, true, true, true, true, 5, false, 17, true);
INSERT INTO public.chambre VALUES ('178', 'suite', 1500, true, true, true, true, 5, false, 18, true);
INSERT INTO public.chambre VALUES ('179', 'suite', 1500, true, true, true, true, 5, false, 19, true);
INSERT INTO public.chambre VALUES ('180', 'suite', 1500, true, true, true, true, 5, false, 20, true);
INSERT INTO public.chambre VALUES ('181', 'Suite', 500, true, true, true, true, 5, false, 21, true);
INSERT INTO public.chambre VALUES ('182', 'Suite', 500, true, true, true, true, 5, false, 22, true);
INSERT INTO public.chambre VALUES ('183', 'Suite', 500, true, true, true, true, 5, false, 23, true);
INSERT INTO public.chambre VALUES ('184', 'Suite', 500, true, true, true, true, 5, false, 24, true);
INSERT INTO public.chambre VALUES ('185', 'Suite', 500, true, true, true, true, 5, false, 25, true);
INSERT INTO public.chambre VALUES ('186', 'Suite', 500, true, true, true, true, 5, false, 26, true);
INSERT INTO public.chambre VALUES ('187', 'Suite', 500, true, true, true, true, 5, false, 27, true);
INSERT INTO public.chambre VALUES ('188', 'Suite', 500, true, true, true, true, 5, false, 28, true);
INSERT INTO public.chambre VALUES ('189', 'Suite', 500, true, true, true, true, 5, false, 29, true);
INSERT INTO public.chambre VALUES ('190', 'Suite', 500, true, true, true, true, 5, false, 30, true);
INSERT INTO public.chambre VALUES ('191', 'Suite', 500, true, true, true, true, 5, false, 31, true);
INSERT INTO public.chambre VALUES ('192', 'Suite', 500, true, true, true, true, 5, false, 32, true);
INSERT INTO public.chambre VALUES ('193', 'Suite', 500, true, true, true, true, 5, false, 33, true);
INSERT INTO public.chambre VALUES ('194', 'Suite', 500, true, true, true, true, 5, false, 34, true);
INSERT INTO public.chambre VALUES ('195', 'Suite', 500, true, true, true, true, 5, false, 35, true);
INSERT INTO public.chambre VALUES ('196', 'Suite', 500, true, true, true, true, 5, false, 36, true);
INSERT INTO public.chambre VALUES ('197', 'Suite', 500, true, true, true, true, 5, false, 37, true);
INSERT INTO public.chambre VALUES ('198', 'Suite', 500, true, true, true, true, 5, false, 38, true);
INSERT INTO public.chambre VALUES ('199', 'Suite', 500, true, true, true, true, 5, false, 39, true);
INSERT INTO public.chambre VALUES ('200', 'Suite', 500, true, true, true, true, 5, false, 40, true);
INSERT INTO public.chambre VALUES ('1', 'single', 80, false, false, true, true, 1, false, 1, true);


--
-- TOC entry 3479 (class 0 OID 26126)
-- Dependencies: 228
-- Data for Name: compte_utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.compte_utilisateur VALUES (16, 'Paul Martial Zepea', '10011988', '$2b$10$BlyxMlN.F6DwVRK5SBUXresqqiuLWMVnjI5JlE/SCL9rLWZFqvPP2', 'CLIENT');
INSERT INTO public.compte_utilisateur VALUES (11, 'Franck Janel AGAH', '1234567890', '$2b$10$JQ.huOa3Z3CjiXWPh8KbhOCVxdbpsippF8cccYRaTAqnsBHxlctI.', 'CLIENT');
INSERT INTO public.compte_utilisateur VALUES (13, 'Peggy Marlène AGAH', '10031987', '$2b$10$eL1XXoZ.FhYVMi3waVD6V.TNHIaet9f1ij9sV2Vv52.j3MCGh4rCO', 'EMPLOYE');
INSERT INTO public.compte_utilisateur VALUES (15, 'Roger AGAH', '28041954', '$2b$10$MIjNghWZOS2.XanJdWTvDuIcRDfA1YICmtwPyf559Nn7HTs19b7uu', 'CLIENT');
INSERT INTO public.compte_utilisateur VALUES (14, 'Pauline AGAH', '10011956', '$2b$10$UAFiViO0NuwZAwkgHK46cuDIBCM.b9mvq677PntRSYmHgP40tCILm', 'EMPLOYE');


--
-- TOC entry 3473 (class 0 OID 17945)
-- Dependencies: 222
-- Data for Name: etablissement_hotelier; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.etablissement_hotelier VALUES (1, 2, 'Ottawa', 'Azaria', 120, 1);
INSERT INTO public.etablissement_hotelier VALUES (2, 4, 'Ottawa', 'Folke', 200, 1);
INSERT INTO public.etablissement_hotelier VALUES (3, 5, 'Portland', 'Maristela', 300, 1);
INSERT INTO public.etablissement_hotelier VALUES (4, 3, 'Toronto', 'Isocrates', 320, 1);
INSERT INTO public.etablissement_hotelier VALUES (5, 2, 'Vnacouver', 'Raivo', 340, 1);
INSERT INTO public.etablissement_hotelier VALUES (6, 3, 'Kanata', 'Sameera', 410, 1);
INSERT INTO public.etablissement_hotelier VALUES (7, 5, 'Orleans', 'Aphrodisia', 290, 1);
INSERT INTO public.etablissement_hotelier VALUES (8, 2, 'Miami', 'Dana', 180, 1);
INSERT INTO public.etablissement_hotelier VALUES (9, 2, 'Paris', 'Shyla', 120, 2);
INSERT INTO public.etablissement_hotelier VALUES (10, 3, 'Bogota', 'Gerben', 120, 2);
INSERT INTO public.etablissement_hotelier VALUES (11, 5, 'Bujumbura', 'Ursula', 120, 2);
INSERT INTO public.etablissement_hotelier VALUES (12, 4, 'Bruxelles', 'Ayaan', 120, 2);
INSERT INTO public.etablissement_hotelier VALUES (13, 2, 'Paris', 'Saiful', 120, 2);
INSERT INTO public.etablissement_hotelier VALUES (14, 3, 'Prague', 'Ran', 120, 2);
INSERT INTO public.etablissement_hotelier VALUES (15, 5, 'Berlin', 'Sofia', 120, 2);
INSERT INTO public.etablissement_hotelier VALUES (16, 3, 'Islamad', 'Lakendra', 120, 2);
INSERT INTO public.etablissement_hotelier VALUES (17, 5, 'Tokyo', 'Boris', 160, 3);
INSERT INTO public.etablissement_hotelier VALUES (18, 4, 'London', 'Lalita', 220, 3);
INSERT INTO public.etablissement_hotelier VALUES (19, 3, 'Acrra', 'Kailyn', 420, 3);
INSERT INTO public.etablissement_hotelier VALUES (20, 2, 'Tokyo', 'Marius', 240, 3);
INSERT INTO public.etablissement_hotelier VALUES (21, 3, 'Pretoria', 'Maite', 3350, 3);
INSERT INTO public.etablissement_hotelier VALUES (22, 4, 'Yaounde', 'Jaden', 425, 3);
INSERT INTO public.etablissement_hotelier VALUES (23, 1, 'Alger', 'Plato', 320, 3);
INSERT INTO public.etablissement_hotelier VALUES (24, 4, 'Denver', 'Sidonia', 250, 3);
INSERT INTO public.etablissement_hotelier VALUES (25, 2, 'Vatican', 'Saif', 120, 4);
INSERT INTO public.etablissement_hotelier VALUES (26, 3, 'Dakar', 'Astrape', 135, 4);
INSERT INTO public.etablissement_hotelier VALUES (27, 4, 'Amsterdam', 'Shivani', 225, 4);
INSERT INTO public.etablissement_hotelier VALUES (28, 5, 'Guatemala', 'Hugubert', 220, 4);
INSERT INTO public.etablissement_hotelier VALUES (29, 5, 'Amsterdam', 'Malwina', 320, 4);
INSERT INTO public.etablissement_hotelier VALUES (30, 3, 'Madrid', 'Nirmal', 198, 4);
INSERT INTO public.etablissement_hotelier VALUES (31, 5, 'Seoul', 'Salomon', 229, 4);
INSERT INTO public.etablissement_hotelier VALUES (32, 4, 'New Delhi', 'Pace', 300, 4);
INSERT INTO public.etablissement_hotelier VALUES (33, 3, 'Detroit', 'Eunike', 348, 5);
INSERT INTO public.etablissement_hotelier VALUES (34, 3, 'Sacramento', 'Henriette', 420, 5);
INSERT INTO public.etablissement_hotelier VALUES (35, 3, 'Los Angeles', 'Camille', 490, 5);
INSERT INTO public.etablissement_hotelier VALUES (36, 2, 'Los Angeles', 'Shiv', 324, 5);
INSERT INTO public.etablissement_hotelier VALUES (37, 5, 'Atlanta', 'Mithras', 160, 5);
INSERT INTO public.etablissement_hotelier VALUES (38, 4, 'Moscow', 'Alcetis', 365, 5);
INSERT INTO public.etablissement_hotelier VALUES (39, 2, 'Istanbul', 'Axel', 425, 5);
INSERT INTO public.etablissement_hotelier VALUES (40, 5, 'Barcelona', 'Larissa', 374, 5);


--
-- TOC entry 3475 (class 0 OID 17956)
-- Dependencies: 224
-- Data for Name: etablissement_hotelier_contact; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3483 (class 0 OID 42524)
-- Dependencies: 232
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.location VALUES (1, '2024-04-07 00:00:00', NULL, 16, '1', 14, '2024-06-01 00:00:00', '2024-06-15 00:00:00', 0);


--
-- TOC entry 3485 (class 0 OID 42547)
-- Dependencies: 234
-- Data for Name: paiement; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3481 (class 0 OID 42505)
-- Dependencies: 230
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.reservation VALUES (2, '2024-04-07 00:00:00', 0, '2', NULL, 11, '2024-05-07 00:00:00', '2024-05-14 00:00:00');
INSERT INTO public.reservation VALUES (3, '2024-04-07 00:00:00', 0, '9', NULL, 11, '2024-07-01 00:00:00', '2024-07-30 00:00:00');
INSERT INTO public.reservation VALUES (4, '2024-04-07 00:00:00', 2, '1', 14, 16, '2024-06-01 00:00:00', '2024-06-15 00:00:00');


--
-- TOC entry 3477 (class 0 OID 26108)
-- Dependencies: 226
-- Data for Name: utilisateur_role_etablissement_hotelier; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.utilisateur_role_etablissement_hotelier VALUES (13, 1, 'AGENT');
INSERT INTO public.utilisateur_role_etablissement_hotelier VALUES (13, 9, 'MANAGER');
INSERT INTO public.utilisateur_role_etablissement_hotelier VALUES (14, 1, 'AGENT');


--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 219
-- Name: bureau_chaine_contact_id_bchc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bureau_chaine_contact_id_bchc_seq', 1, false);


--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 217
-- Name: bureau_chaine_hoteliere_id_bch_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bureau_chaine_hoteliere_id_bch_seq', 1, false);


--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 215
-- Name: chaine_hoteliere_id_ch_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chaine_hoteliere_id_ch_seq', 1, false);


--
-- TOC entry 3504 (class 0 OID 0)
-- Dependencies: 227
-- Name: compte_utilisateur_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compte_utilisateur_id_user_seq', 16, true);


--
-- TOC entry 3505 (class 0 OID 0)
-- Dependencies: 223
-- Name: etablissement_hotelier_contact_id_ehc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.etablissement_hotelier_contact_id_ehc_seq', 1, false);


--
-- TOC entry 3506 (class 0 OID 0)
-- Dependencies: 221
-- Name: etablissement_hotelier_id_eh_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.etablissement_hotelier_id_eh_seq', 1, false);


--
-- TOC entry 3507 (class 0 OID 0)
-- Dependencies: 231
-- Name: location_id_loc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.location_id_loc_seq', 1, true);


--
-- TOC entry 3508 (class 0 OID 0)
-- Dependencies: 233
-- Name: paiement_p_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.paiement_p_id_seq', 1, false);


--
-- TOC entry 3509 (class 0 OID 0)
-- Dependencies: 229
-- Name: reservation_id_res_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservation_id_res_seq', 4, true);


--
-- TOC entry 3290 (class 2606 OID 17943)
-- Name: bureau_chaine_contact bureau_chaine_contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bureau_chaine_contact
    ADD CONSTRAINT bureau_chaine_contact_pkey PRIMARY KEY (id_bchc);


--
-- TOC entry 3288 (class 2606 OID 17934)
-- Name: bureau_chaine_hoteliere bureau_chaine_hoteliere_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bureau_chaine_hoteliere
    ADD CONSTRAINT bureau_chaine_hoteliere_pkey PRIMARY KEY (id_bch);


--
-- TOC entry 3286 (class 2606 OID 17925)
-- Name: chaine_hoteliere chaine_hoteliere_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chaine_hoteliere
    ADD CONSTRAINT chaine_hoteliere_pkey PRIMARY KEY (id_ch);


--
-- TOC entry 3296 (class 2606 OID 17977)
-- Name: chambre chambre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chambre
    ADD CONSTRAINT chambre_pkey PRIMARY KEY (id_c);


--
-- TOC entry 3300 (class 2606 OID 26133)
-- Name: compte_utilisateur compte_utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compte_utilisateur
    ADD CONSTRAINT compte_utilisateur_pkey PRIMARY KEY (id_user);


--
-- TOC entry 3294 (class 2606 OID 17963)
-- Name: etablissement_hotelier_contact etablissement_hotelier_contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etablissement_hotelier_contact
    ADD CONSTRAINT etablissement_hotelier_contact_pkey PRIMARY KEY (id_ehc);


--
-- TOC entry 3292 (class 2606 OID 17954)
-- Name: etablissement_hotelier etablissement_hotelier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etablissement_hotelier
    ADD CONSTRAINT etablissement_hotelier_pkey PRIMARY KEY (id_eh);


--
-- TOC entry 3304 (class 2606 OID 42530)
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id_loc);


--
-- TOC entry 3306 (class 2606 OID 42554)
-- Name: paiement paiement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiement
    ADD CONSTRAINT paiement_pkey PRIMARY KEY (p_id);


--
-- TOC entry 3298 (class 2606 OID 26112)
-- Name: utilisateur_role_etablissement_hotelier pk_utilisateur_in_etbalissement_hotelier; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_role_etablissement_hotelier
    ADD CONSTRAINT pk_utilisateur_in_etbalissement_hotelier PRIMARY KEY (nas_utilisateur, id_eh);


--
-- TOC entry 3302 (class 2606 OID 42512)
-- Name: reservation reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (id_res);


--
-- TOC entry 3320 (class 2620 OID 42590)
-- Name: reservation chambre_reservation_after_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER chambre_reservation_after_update AFTER UPDATE ON public.reservation FOR EACH ROW EXECUTE FUNCTION public.chambre_reservation_after_update_func();


--
-- TOC entry 3308 (class 2606 OID 18012)
-- Name: bureau_chaine_contact bureau_chaine_contact_id_bch_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bureau_chaine_contact
    ADD CONSTRAINT bureau_chaine_contact_id_bch_fkey FOREIGN KEY (id_bch) REFERENCES public.bureau_chaine_hoteliere(id_bch) NOT VALID;


--
-- TOC entry 3307 (class 2606 OID 18007)
-- Name: bureau_chaine_hoteliere bureau_chaine_hoteliere_id_ch_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bureau_chaine_hoteliere
    ADD CONSTRAINT bureau_chaine_hoteliere_id_ch_fkey FOREIGN KEY (id_ch) REFERENCES public.chaine_hoteliere(id_ch) NOT VALID;


--
-- TOC entry 3311 (class 2606 OID 18027)
-- Name: chambre chambre_id_eh_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chambre
    ADD CONSTRAINT chambre_id_eh_fkey FOREIGN KEY (id_eh) REFERENCES public.etablissement_hotelier(id_eh) NOT VALID;


--
-- TOC entry 3310 (class 2606 OID 18022)
-- Name: etablissement_hotelier_contact etablissement_hotelier_contact_id_eh_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etablissement_hotelier_contact
    ADD CONSTRAINT etablissement_hotelier_contact_id_eh_fkey FOREIGN KEY (id_eh) REFERENCES public.etablissement_hotelier(id_eh) NOT VALID;


--
-- TOC entry 3309 (class 2606 OID 18017)
-- Name: etablissement_hotelier etablissement_hotelier_id_ch_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etablissement_hotelier
    ADD CONSTRAINT etablissement_hotelier_id_ch_fkey FOREIGN KEY (id_ch) REFERENCES public.chaine_hoteliere(id_ch) NOT VALID;


--
-- TOC entry 3318 (class 2606 OID 50685)
-- Name: paiement fk_compte_utilisateur_id_paiement; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiement
    ADD CONSTRAINT fk_compte_utilisateur_id_paiement FOREIGN KEY (nas_emp) REFERENCES public.compte_utilisateur(id_user) NOT VALID;


--
-- TOC entry 3312 (class 2606 OID 26118)
-- Name: utilisateur_role_etablissement_hotelier fk_etablissement_hotelier_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_role_etablissement_hotelier
    ADD CONSTRAINT fk_etablissement_hotelier_id FOREIGN KEY (id_eh) REFERENCES public.etablissement_hotelier(id_eh) NOT VALID;


--
-- TOC entry 3319 (class 2606 OID 42555)
-- Name: paiement fk_location_id_paiement; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiement
    ADD CONSTRAINT fk_location_id_paiement FOREIGN KEY (id_loc) REFERENCES public.location(id_loc);


--
-- TOC entry 3313 (class 2606 OID 42541)
-- Name: utilisateur_role_etablissement_hotelier fk_utilisateur_role_etablissement_hotelier; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_role_etablissement_hotelier
    ADD CONSTRAINT fk_utilisateur_role_etablissement_hotelier FOREIGN KEY (nas_utilisateur) REFERENCES public.compte_utilisateur(id_user) NOT VALID;


--
-- TOC entry 3316 (class 2606 OID 42531)
-- Name: location location_id_c_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_id_c_fkey FOREIGN KEY (id_c) REFERENCES public.chambre(id_c) NOT VALID;


--
-- TOC entry 3317 (class 2606 OID 42536)
-- Name: location location_id_res_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_id_res_fkey FOREIGN KEY (id_res) REFERENCES public.reservation(id_res) NOT VALID;


--
-- TOC entry 3314 (class 2606 OID 42513)
-- Name: reservation reservation_id_cli_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_id_cli_fkey FOREIGN KEY (id_cli) REFERENCES public.compte_utilisateur(id_user) NOT VALID;


--
-- TOC entry 3315 (class 2606 OID 42518)
-- Name: reservation reservation_id_emp_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_id_emp_fkey FOREIGN KEY (id_emp) REFERENCES public.compte_utilisateur(id_user) NOT VALID;


-- Completed on 2024-04-08 00:39:29 UTC

--
-- PostgreSQL database dump complete
--

