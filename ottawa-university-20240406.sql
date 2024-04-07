--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2

-- Started on 2024-04-06 15:37:25 UTC

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
-- TOC entry 3477 (class 0 OID 0)
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
-- TOC entry 3478 (class 0 OID 0)
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
-- TOC entry 3479 (class 0 OID 0)
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
-- TOC entry 226 (class 1259 OID 17978)
-- Name: client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client (
    nas_cli integer NOT NULL,
    nom_complet_cli character varying NOT NULL,
    date_creation_cli timestamp without time zone DEFAULT CURRENT_DATE NOT NULL,
    adresse character varying NOT NULL
);


ALTER TABLE public.client OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 26126)
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
-- TOC entry 232 (class 1259 OID 26125)
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
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 232
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
-- TOC entry 3481 (class 0 OID 0)
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
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 221
-- Name: etablissement_hotelier_id_eh_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.etablissement_hotelier_id_eh_seq OWNED BY public.etablissement_hotelier.id_eh;


--
-- TOC entry 230 (class 1259 OID 18001)
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    id_loc bigint NOT NULL,
    date_loc timestamp without time zone NOT NULL,
    id_res bigint,
    id_cli integer NOT NULL,
    id_c character varying(6) NOT NULL,
    paiement bigint NOT NULL,
    nas_emp integer NOT NULL,
    date_debut timestamp without time zone NOT NULL,
    date_fin timestamp without time zone NOT NULL
);


ALTER TABLE public.location OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 18000)
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
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 229
-- Name: location_id_loc_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.location_id_loc_seq OWNED BY public.location.id_loc;


--
-- TOC entry 227 (class 1259 OID 17986)
-- Name: reservation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservation (
    id_res bigint NOT NULL,
    date_res timestamp without time zone DEFAULT CURRENT_DATE NOT NULL,
    statut_res smallint DEFAULT 0 NOT NULL,
    id_c character varying(6) NOT NULL,
    id_emp integer NOT NULL,
    id_cli integer NOT NULL,
    date_debut timestamp without time zone NOT NULL,
    date_fin timestamp without time zone NOT NULL
);


ALTER TABLE public.reservation OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17993)
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur (
    nas_emp integer NOT NULL,
    nom_complet_emp character varying NOT NULL,
    id_eh bigint NOT NULL,
    adresse character varying NOT NULL,
    role character varying(25) NOT NULL,
    password text
);


ALTER TABLE public.utilisateur OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 26108)
-- Name: utilisateur_role_etablissement_hotelier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur_role_etablissement_hotelier (
    nas_utilisateur bigint NOT NULL,
    id_eh bigint NOT NULL,
    role_utilisateur character varying NOT NULL
);


ALTER TABLE public.utilisateur_role_etablissement_hotelier OWNER TO postgres;

--
-- TOC entry 3255 (class 2604 OID 17939)
-- Name: bureau_chaine_contact id_bchc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bureau_chaine_contact ALTER COLUMN id_bchc SET DEFAULT nextval('public.bureau_chaine_contact_id_bchc_seq'::regclass);


--
-- TOC entry 3254 (class 2604 OID 17930)
-- Name: bureau_chaine_hoteliere id_bch; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bureau_chaine_hoteliere ALTER COLUMN id_bch SET DEFAULT nextval('public.bureau_chaine_hoteliere_id_bch_seq'::regclass);


--
-- TOC entry 3253 (class 2604 OID 17921)
-- Name: chaine_hoteliere id_ch; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chaine_hoteliere ALTER COLUMN id_ch SET DEFAULT nextval('public.chaine_hoteliere_id_ch_seq'::regclass);


--
-- TOC entry 3271 (class 2604 OID 26129)
-- Name: compte_utilisateur id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compte_utilisateur ALTER COLUMN id_user SET DEFAULT nextval('public.compte_utilisateur_id_user_seq'::regclass);


--
-- TOC entry 3256 (class 2604 OID 17948)
-- Name: etablissement_hotelier id_eh; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etablissement_hotelier ALTER COLUMN id_eh SET DEFAULT nextval('public.etablissement_hotelier_id_eh_seq'::regclass);


--
-- TOC entry 3259 (class 2604 OID 17959)
-- Name: etablissement_hotelier_contact id_ehc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etablissement_hotelier_contact ALTER COLUMN id_ehc SET DEFAULT nextval('public.etablissement_hotelier_contact_id_ehc_seq'::regclass);


--
-- TOC entry 3270 (class 2604 OID 18004)
-- Name: location id_loc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location ALTER COLUMN id_loc SET DEFAULT nextval('public.location_id_loc_seq'::regclass);


--
-- TOC entry 3458 (class 0 OID 17936)
-- Dependencies: 220
-- Data for Name: bureau_chaine_contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bureau_chaine_contact (id_bchc, telephone_bchc, email_contact_bchc, id_bch) FROM stdin;
1	8190010000	alpha@hotel.ca	1
2	6130020000	beta@hotel.ca	2
3	9110030000	gama@hotel.ca	3
4	7770040000	delata@hotel.ca	4
5	1230050000	epsilon@hotel.ca	5
\.


--
-- TOC entry 3456 (class 0 OID 17927)
-- Dependencies: 218
-- Data for Name: bureau_chaine_hoteliere; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bureau_chaine_hoteliere (id_bch, adresse_bch, id_ch) FROM stdin;
1	100 javascript canada ottawa ontario	1
2	8 python canada gatineau quebec	2
3	21 jumpstreet canada vancouvert comlombie-britanique	3
4	999 heaven road canada edmonton alberta 	4
5	100 javascript canada regina saskatchewan	5
\.


--
-- TOC entry 3454 (class 0 OID 17918)
-- Dependencies: 216
-- Data for Name: chaine_hoteliere; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chaine_hoteliere (id_ch, nom_ch) FROM stdin;
1	Alpha
2	Beta
3	Gamma
4	Delta
5	Epsilon
\.


--
-- TOC entry 3463 (class 0 OID 17964)
-- Dependencies: 225
-- Data for Name: chambre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chambre (id_c, intitule_c, prix_c, tv_c, air_cond_c, refrigerator_c, extensible_c, capacite_c, issue_c, id_eh, disponible_c) FROM stdin;
1	single	80	f	f	t	t	1	f	1	t
2	single	80	f	f	t	t	1	f	2	t
3	single	80	f	f	t	t	1	f	3	t
4	single	80	f	f	t	t	1	f	4	t
5	single	80	f	f	t	t	1	f	5	t
6	single	80	f	f	t	t	1	f	6	t
7	single	80	f	f	t	t	1	f	7	t
8	single	80	f	f	t	t	1	f	8	t
9	single	80	f	f	t	t	1	f	9	t
10	single	80	f	f	t	t	1	f	10	t
11	single	80	f	f	t	t	1	f	11	t
12	single	80	f	f	t	t	1	f	12	t
13	single	80	f	f	t	t	1	f	13	t
14	single	80	f	f	t	t	1	f	14	t
15	single	80	f	f	t	t	1	f	15	t
16	single	80	f	f	t	t	1	f	16	t
17	single	80	f	f	t	t	1	f	17	t
18	single	80	f	f	t	t	1	f	18	t
19	single	80	f	f	t	t	1	f	19	t
20	single	80	f	t	f	t	1	f	20	t
21	single	80	f	f	t	f	1	f	21	t
22	single	80	f	f	t	f	1	f	22	t
23	single	80	f	f	t	f	1	f	23	t
24	single	80	f	f	t	f	1	f	24	t
25	single	80	f	f	t	f	1	f	25	t
26	single	80	f	f	t	f	1	f	26	t
27	single	80	f	f	t	f	1	f	27	t
28	single	80	f	f	t	f	1	f	28	t
29	single	80	f	f	t	f	1	f	29	t
30	single	80	f	f	t	f	1	f	30	t
31	single	80	f	f	t	f	1	f	31	t
32	single	80	f	f	t	f	1	f	32	t
33	single	80	f	f	t	f	1	f	33	t
34	single	80	f	f	t	f	1	f	34	t
35	single	80	f	f	t	f	1	f	35	t
36	single	80	f	f	t	f	1	f	36	t
37	single	80	f	f	t	f	1	f	37	t
38	single	80	f	f	t	f	1	f	38	t
39	single	80	f	f	t	f	1	f	39	t
40	single	80	f	f	t	f	1	f	40	t
41	double	120	f	f	t	t	2	f	1	t
42	double	120	f	f	t	t	2	f	2	t
43	double	120	f	f	t	t	2	f	3	t
44	double	120	f	f	t	t	2	f	4	t
45	double	120	f	f	t	t	2	f	5	t
46	double	120	f	f	t	t	2	f	6	t
47	double	120	f	f	t	t	2	f	7	t
48	double	120	f	f	t	t	2	f	8	t
49	double	120	f	f	t	t	2	f	9	t
50	double	120	f	f	t	t	2	f	10	t
51	double	120	f	f	t	t	2	f	11	t
52	double	120	f	f	t	t	2	f	12	t
53	double	120	f	f	t	t	2	f	13	t
54	double	120	f	f	t	t	2	f	14	t
55	double	120	f	f	t	t	2	f	15	t
56	double	120	f	f	t	t	2	f	16	t
57	double	120	f	f	t	t	2	f	17	t
58	double	120	f	f	t	t	2	f	18	t
59	double	120	f	f	t	t	2	f	19	t
60	double	120	f	f	t	t	2	f	20	t
61	double	120	f	f	t	t	2	f	21	t
62	double	120	f	f	t	t	2	f	22	t
63	double	120	f	f	t	t	2	f	23	t
64	double	120	f	f	t	t	2	f	24	t
65	double	120	f	f	t	t	2	f	25	t
66	double	120	f	f	t	t	2	f	26	t
67	double	120	f	f	t	t	2	f	27	t
68	double	120	f	f	t	t	2	f	28	t
69	double	120	f	f	t	t	2	f	29	t
70	double	120	f	f	t	t	2	f	30	t
71	double	120	f	f	t	t	2	f	31	t
72	double	120	f	f	t	t	2	f	32	t
73	double	120	f	f	t	t	2	f	33	t
74	double	120	f	f	t	t	2	f	34	t
75	double	120	f	f	t	t	2	f	35	t
76	double	120	f	f	t	t	2	f	36	t
77	double	120	f	f	t	t	2	f	37	t
78	double	120	f	f	t	t	2	f	38	t
79	double	120	f	f	t	t	2	f	39	t
80	double	120	f	f	t	t	2	f	40	t
81	triple	180	t	f	t	t	3	f	1	t
82	triple	180	t	f	t	t	3	f	2	t
83	triple	180	t	f	t	t	3	f	3	t
84	triple	180	t	f	t	t	3	f	4	t
85	triple	180	t	f	t	t	3	f	5	t
86	triple	180	t	f	t	t	3	f	6	t
87	triple	180	t	f	t	t	3	f	7	t
88	triple	180	t	f	t	t	3	f	8	t
89	triple	180	t	f	t	t	3	f	9	t
90	triple	180	t	f	t	t	3	f	10	t
91	triple	180	t	f	t	t	3	f	11	t
92	triple	180	t	f	t	t	3	f	12	t
93	triple	180	t	f	t	t	3	f	13	t
94	triple	180	t	f	t	t	3	f	14	t
95	triple	180	t	f	t	t	3	f	15	t
96	triple	180	t	f	t	t	3	f	16	t
97	triple	180	t	f	t	t	3	f	17	t
98	triple	180	t	f	t	t	3	f	18	t
99	triple	180	t	f	t	t	3	f	19	t
100	triple	180	t	f	t	t	3	f	20	t
101	triple	180	t	f	t	t	3	f	21	t
102	triple	180	t	f	t	t	3	f	22	t
103	triple	180	t	f	t	t	3	f	23	t
104	triple	180	t	f	t	t	3	f	24	t
105	triple	180	t	f	t	t	3	f	25	t
106	triple	180	t	f	t	t	3	f	26	t
107	triple	180	t	f	t	t	3	f	27	t
108	triple	180	t	f	t	t	3	f	28	t
109	triple	180	t	f	t	t	3	f	29	t
110	triple	180	t	f	t	t	3	f	30	t
111	triple	180	t	f	t	t	3	f	31	t
112	triple	180	t	f	t	t	3	f	32	t
113	triple	180	t	f	t	t	3	f	33	t
114	triple	180	t	f	t	t	3	f	34	t
115	triple	180	t	f	t	t	3	f	35	t
116	triple	180	t	f	t	t	3	f	36	t
117	triple	180	t	f	t	t	3	f	37	t
118	triple	180	t	f	t	t	3	f	38	t
119	triple	180	t	f	t	t	3	f	39	t
120	triple	180	t	f	t	t	3	f	40	t
121	quad	230	t	f	t	t	4	f	1	t
122	quad	230	t	f	t	t	4	f	2	t
123	quad	230	t	f	t	t	4	f	3	t
124	quad	230	t	f	t	t	4	f	4	t
125	quad	230	t	f	t	t	4	f	5	t
126	quad	230	t	f	t	t	4	f	6	t
127	quad	230	t	f	t	t	4	f	7	t
128	quad	230	t	f	t	t	4	f	8	t
129	quad	230	t	f	t	t	4	f	9	t
130	quad	230	t	f	t	t	4	f	10	t
131	quad	230	t	f	t	t	4	f	11	t
132	quad	230	t	f	t	t	4	f	12	t
133	quad	230	t	f	t	t	4	f	13	t
134	quad	230	t	f	t	t	4	f	14	t
135	quad	230	t	f	t	t	4	f	15	t
136	quad	230	t	f	t	t	4	f	16	t
137	quad	230	t	f	t	t	4	f	17	t
138	quad	230	t	f	t	t	4	f	18	t
139	quad	230	t	f	t	t	4	f	19	t
140	quad	230	t	f	t	t	4	f	20	t
141	quad	230	t	f	t	t	4	f	21	t
142	quad	230	t	f	t	t	4	f	22	t
143	quad	230	t	f	t	t	4	f	23	t
144	quad	230	t	f	t	t	4	f	24	t
145	quad	230	t	f	t	t	4	f	25	t
146	quad	230	t	f	t	t	4	f	26	t
147	quad	230	t	f	t	t	4	f	27	t
148	quad	230	t	f	t	t	4	f	28	t
149	quad	230	t	f	t	t	4	f	29	t
150	quad	230	t	f	t	t	4	f	30	t
151	quad	230	t	f	t	t	4	f	31	t
152	quad	230	t	f	t	t	4	f	32	t
153	quad	230	t	f	t	t	4	f	33	t
154	quad	230	t	f	t	t	4	f	34	t
155	quad	230	t	f	t	t	4	f	35	t
156	quad	230	t	f	t	t	4	f	36	t
157	quad	230	t	f	t	t	4	f	37	t
158	quad	230	t	f	t	t	4	f	38	t
159	quad	230	t	f	t	t	4	f	39	t
160	quad	230	t	f	t	t	4	f	40	t
161	suite	1500	t	t	t	t	5	f	1	t
162	suite	1500	t	t	t	t	5	f	2	t
163	suite	1500	t	t	t	t	5	f	3	t
164	suite	1500	t	t	t	t	5	f	4	t
165	suite	1500	t	t	t	t	5	f	5	t
166	suite	1500	t	t	t	t	5	f	6	t
167	suite	1500	t	t	t	t	5	f	7	t
168	suite	1500	t	t	t	t	5	f	8	t
169	suite	1500	t	t	t	t	5	f	9	t
170	suite	1500	t	t	t	t	5	f	10	t
171	suite	1500	t	t	t	t	5	f	11	t
172	suite	1500	t	t	t	t	5	f	12	t
173	suite	1500	t	t	t	t	5	f	13	t
174	suite	1500	t	t	t	t	5	f	14	t
175	suite	1500	t	t	t	t	5	f	15	t
176	suite	1500	t	t	t	t	5	f	16	t
177	suite	1500	t	t	t	t	5	f	17	t
178	suite	1500	t	t	t	t	5	f	18	t
179	suite	1500	t	t	t	t	5	f	19	t
180	suite	1500	t	t	t	t	5	f	20	t
181	Suite	500	t	t	t	t	5	f	21	t
182	Suite	500	t	t	t	t	5	f	22	t
183	Suite	500	t	t	t	t	5	f	23	t
184	Suite	500	t	t	t	t	5	f	24	t
185	Suite	500	t	t	t	t	5	f	25	t
186	Suite	500	t	t	t	t	5	f	26	t
187	Suite	500	t	t	t	t	5	f	27	t
188	Suite	500	t	t	t	t	5	f	28	t
189	Suite	500	t	t	t	t	5	f	29	t
190	Suite	500	t	t	t	t	5	f	30	t
191	Suite	500	t	t	t	t	5	f	31	t
192	Suite	500	t	t	t	t	5	f	32	t
193	Suite	500	t	t	t	t	5	f	33	t
194	Suite	500	t	t	t	t	5	f	34	t
195	Suite	500	t	t	t	t	5	f	35	t
196	Suite	500	t	t	t	t	5	f	36	t
197	Suite	500	t	t	t	t	5	f	37	t
198	Suite	500	t	t	t	t	5	f	38	t
199	Suite	500	t	t	t	t	5	f	39	t
200	Suite	500	t	t	t	t	5	f	40	t
\.


--
-- TOC entry 3464 (class 0 OID 17978)
-- Dependencies: 226
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client (nas_cli, nom_complet_cli, date_creation_cli, adresse) FROM stdin;
\.


--
-- TOC entry 3471 (class 0 OID 26126)
-- Dependencies: 233
-- Data for Name: compte_utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.compte_utilisateur (id_user, nom_complet, username, password, user_type) FROM stdin;
11	Franck Janel AGAH	1234567890	$2b$10$JQ.huOa3Z3CjiXWPh8KbhOCVxdbpsippF8cccYRaTAqnsBHxlctI.	CLIENT
13	Peggy Marlène AGAH	10031987	$2b$10$eL1XXoZ.FhYVMi3waVD6V.TNHIaet9f1ij9sV2Vv52.j3MCGh4rCO	EMPLOYE
15	Roger AGAH	28041954	$2b$10$MIjNghWZOS2.XanJdWTvDuIcRDfA1YICmtwPyf559Nn7HTs19b7uu	CLIENT
14	Pauline AGAH	10011956	$2b$10$UAFiViO0NuwZAwkgHK46cuDIBCM.b9mvq677PntRSYmHgP40tCILm	EMPLOYE
\.


--
-- TOC entry 3460 (class 0 OID 17945)
-- Dependencies: 222
-- Data for Name: etablissement_hotelier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.etablissement_hotelier (id_eh, classe_eh, adresse_eh, nom_eh, nbr_chambres, id_ch) FROM stdin;
1	2	Ottawa	Azaria	120	1
2	4	Ottawa	Folke	200	1
3	5	Portland	Maristela	300	1
4	3	Toronto	Isocrates	320	1
5	2	Vnacouver	Raivo	340	1
6	3	Kanata	Sameera	410	1
7	5	Orleans	Aphrodisia	290	1
8	2	Miami	Dana	180	1
9	2	Paris	Shyla	120	2
10	3	Bogota	Gerben	120	2
11	5	Bujumbura	Ursula	120	2
12	4	Bruxelles	Ayaan	120	2
13	2	Paris	Saiful	120	2
14	3	Prague	Ran	120	2
15	5	Berlin	Sofia	120	2
16	3	Islamad	Lakendra	120	2
17	5	Tokyo	Boris	160	3
18	4	London	Lalita	220	3
19	3	Acrra	Kailyn	420	3
20	2	Tokyo	Marius	240	3
21	3	Pretoria	Maite	3350	3
22	4	Yaounde	Jaden	425	3
23	1	Alger	Plato	320	3
24	4	Denver	Sidonia	250	3
25	2	Vatican	Saif	120	4
26	3	Dakar	Astrape	135	4
27	4	Amsterdam	Shivani	225	4
28	5	Guatemala	Hugubert	220	4
29	5	Amsterdam	Malwina	320	4
30	3	Madrid	Nirmal	198	4
31	5	Seoul	Salomon	229	4
32	4	New Delhi	Pace	300	4
33	3	Detroit	Eunike	348	5
34	3	Sacramento	Henriette	420	5
35	3	Los Angeles	Camille	490	5
36	2	Los Angeles	Shiv	324	5
37	5	Atlanta	Mithras	160	5
38	4	Moscow	Alcetis	365	5
39	2	Istanbul	Axel	425	5
40	5	Barcelona	Larissa	374	5
\.


--
-- TOC entry 3462 (class 0 OID 17956)
-- Dependencies: 224
-- Data for Name: etablissement_hotelier_contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.etablissement_hotelier_contact (id_ehc, telephone_ehc, email_contact_ehc, id_eh) FROM stdin;
\.


--
-- TOC entry 3468 (class 0 OID 18001)
-- Dependencies: 230
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.location (id_loc, date_loc, id_res, id_cli, id_c, paiement, nas_emp, date_debut, date_fin) FROM stdin;
\.


--
-- TOC entry 3465 (class 0 OID 17986)
-- Dependencies: 227
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservation (id_res, date_res, statut_res, id_c, id_emp, id_cli, date_debut, date_fin) FROM stdin;
\.


--
-- TOC entry 3466 (class 0 OID 17993)
-- Dependencies: 228
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateur (nas_emp, nom_complet_emp, id_eh, adresse, role, password) FROM stdin;
13	Sylvie Rose	1	3018 MacLaren Street	Manager	\N
14	Oakley Stein	2	4132 Bridgeport Rd	Manager	\N
15	Rebecc Doherty	3	1102 rue St-Henri	Manager	\N
16	Martha Whitney	4	3111 99th St	Manager	\N
17	Alec Steele	5	43 5th Avenue	Manager	\N
18	Stacey Chambers	6	3228 MacLaren Street	Manager	\N
19	Caitlyn Cox	7	1306 Merivale Road	Manager	\N
20	Moshe Bass	8	1189 Carling Avenue	Manager	\N
21	Elsie Coffey	9	3228 MacLaren Street	Manager	\N
22	Caspey Proctor	10	3235 Carling Avenue	Manager	\N
23	Aryan Mueller	11	4484 Merivale Road	Manager	\N
24	Anita Campbell	12	184 Bank St	Manager	\N
25	Caiden Horn	13	406 MacLaren Street	Manager	\N
26	Leon Jacobson	14	2752 Thurston Dr	Manager	\N
27	Ruair Houston	15	4424 Merivale Road	Manager	\N
28	Claude House	16	3304 MacLaren Street	Manager	\N
29	Edna Gonzales	17	19 Carling Avenue	Manager	\N
30	Darren Duagherty	18	2651 Bank St	Manager	\N
31	Lloyd Moore	19	933 MacLaren Street	Manager	\N
32	Scott Sheppard	20	1180 Carling Avenue	Manager	\N
33	Floyd Jenkins	21	1512 Montreal Road	Manager	\N
34	Mikolaj Archer	22	4517 Carling Avenue	Manager	\N
35	Lacey Mccormick 	23	1413 MacLaren Street	Manager	\N
36	Eliana Rollins	24	4753 Carling Avenue	Manager	\N
37	Nina Chens	25	3307 Carling Avenue	Manager	\N
38	Cian Ryenolds	26	3855 Carling Avenue	Manager	\N
39	Taylor Philips	27	4782 Carling Avenue	Manager	\N
40	Janice Wells	28	107 Bank St	Manager	\N
41	William Brown	29	3706 Thurston Dr	Manager	\N
42	Thea Ryan	30	3651 MacLaren Street	Manager	\N
43	Annabel Barlett	31	1911 Merivale Road	Manager	\N
44	Isobell Pearce	32	1903 Merivale Road	Manager	\N
45	Huh Nichols	33	516 Bank St	Manager	\N
46	Nathan Lester	34	2234 Carling Avenue	Manager	\N
47	Wanda Bennet	35	4117 Carling Avenue	Manager	\N
48	Lucian Daniels	36	4919 MacLaren Street	Manager	\N
49	Libby Halls	37	4195 MacLaren Street	Manager	\N
50	Raheem Friedman	38	4084 MacLaren Street	Manager	\N
51	Samia Spencer	39	404 MacLaren Street	Manager	\N
52	Ruben Terry	40	1223 Montreal Road	Manager	\N
53	Jayson Knox	1	98 MacLaren Street	Cashier	\N
54	Coy Rivera	2	9 Thatcher St.	Cashier	\N
55	Korey Ray	3	7720 Roosevelt Avenue	Cashier	\N
56	Woodrow Barrera	4	67 Briarwood St.	Cashier	\N
57	Danny Lozano	5	65 Stillwater Street	Cashier	\N
58	Katherine Good	6	956 Prairie Street	Cashier	\N
59	Celia Petty	7	487 Lower River St.	Cashier	\N
60	Catalina Hood	8	49 E. Penn Ave.	Cashier	\N
61	Eugenio Holmes	9	998 Indian Summer Rd.	Cashier	\N
62	Neville Rhodes	10	37 S. Gonzales St.	Cashier	\N
63	Aurelia Cantu	11	82 Monroe Dr.	Cashier	\N
64	Santo Cruz	12	8398 Redwood St.	Cashier	\N
65	Socorro Mitchell	13	288 Lake Forest St.	Cashier	\N
66	Billy Holden	14	6 Hamilton Street	Cashier	\N
67	Daniel Garrison	15	541 Rocky River Road	Cashier	\N
68	Martin Roth	16	8204 West Greystone Court	Cashier	\N
69	Saul Forbes	17	436 School St.	Cashier	\N
70	Mindy Kline	18	8458 North High Road	Cashier	\N
71	Brendon Rasmussen	19	639 8th St.	Cashier	\N
72	Veronica Sullivan	20	989 New Saddle Lane	Cashier	\N
73	Harry Mccall	21	75 Depot Drive	Cashier	\N
74	Jon Little	22	689 Carriage Ave.	Cashier	\N
75	Tanner Edwards	23	63 Spruce Street	Cashier	\N
76	Tamra Villa	24	144 Peg Shop Ave.	Cashier	\N
77	Willard Barron	25	7005 W. Depot Drive	Cashier	\N
78	Brianna Sanders	26	145 Sherman Road	Cashier	\N
79	Edmund Valentine	27	181 Plumb Branch Drive	Cashier	\N
80	Tracie Ortega	28	135 Edgewood Street	Cashier	\N
81	Charmaine Murphy	29	82 Homewood Ave.	Cashier	\N
82	Margery Cisneros	30	21 South Locust Lane	Cashier	\N
83	Annabelle Herring	31	3 Arcadia Avenue	Cashier	\N
84	Jewel Guzman	32	396 Rockland St.	Cashier	\N
85	Molly Campbell	33	625 Parker Street	Cashier	\N
86	Glenn Hanna	34	8191 Amerige St.	Cashier	\N
87	Meagan Larsen	35	15 Bridle Street	Cashier	\N
88	Inez Maxwell	36	42 Prairie Court	Cashier	\N
89	Foster Dixon	37	802 Beechwood Street	Cashier	\N
90	Barney Bonilla	38	7577 North Pilgrim Street	Cashier	\N
91	Mckinley Romero	39	9511 E. Rock Creek St.	Cashier	\N
92	Lavern Lowery	40	8061 Windfall Street	Cashier	\N
1	Franck AGAH	1	Plateau Dokui Abidjan	USER_CLIENT	Monpassword
2	Lyran AGAH	1	Plateau Dokui Abidjan	USER_EMPLOYE	Monpassword
\.


--
-- TOC entry 3469 (class 0 OID 26108)
-- Dependencies: 231
-- Data for Name: utilisateur_role_etablissement_hotelier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateur_role_etablissement_hotelier (nas_utilisateur, id_eh, role_utilisateur) FROM stdin;
13	1	AGENT
13	9	MANAGER
14	1	AGENT
\.


--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 219
-- Name: bureau_chaine_contact_id_bchc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bureau_chaine_contact_id_bchc_seq', 1, false);


--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 217
-- Name: bureau_chaine_hoteliere_id_bch_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bureau_chaine_hoteliere_id_bch_seq', 1, false);


--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 215
-- Name: chaine_hoteliere_id_ch_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chaine_hoteliere_id_ch_seq', 1, false);


--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 232
-- Name: compte_utilisateur_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compte_utilisateur_id_user_seq', 15, true);


--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 223
-- Name: etablissement_hotelier_contact_id_ehc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.etablissement_hotelier_contact_id_ehc_seq', 1, false);


--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 221
-- Name: etablissement_hotelier_id_eh_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.etablissement_hotelier_id_eh_seq', 1, false);


--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 229
-- Name: location_id_loc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.location_id_loc_seq', 1, false);


--
-- TOC entry 3277 (class 2606 OID 17943)
-- Name: bureau_chaine_contact bureau_chaine_contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bureau_chaine_contact
    ADD CONSTRAINT bureau_chaine_contact_pkey PRIMARY KEY (id_bchc);


--
-- TOC entry 3275 (class 2606 OID 17934)
-- Name: bureau_chaine_hoteliere bureau_chaine_hoteliere_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bureau_chaine_hoteliere
    ADD CONSTRAINT bureau_chaine_hoteliere_pkey PRIMARY KEY (id_bch);


--
-- TOC entry 3273 (class 2606 OID 17925)
-- Name: chaine_hoteliere chaine_hoteliere_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chaine_hoteliere
    ADD CONSTRAINT chaine_hoteliere_pkey PRIMARY KEY (id_ch);


--
-- TOC entry 3283 (class 2606 OID 17977)
-- Name: chambre chambre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chambre
    ADD CONSTRAINT chambre_pkey PRIMARY KEY (id_c);


--
-- TOC entry 3285 (class 2606 OID 17985)
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (nas_cli);


--
-- TOC entry 3295 (class 2606 OID 26133)
-- Name: compte_utilisateur compte_utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compte_utilisateur
    ADD CONSTRAINT compte_utilisateur_pkey PRIMARY KEY (id_user);


--
-- TOC entry 3289 (class 2606 OID 17999)
-- Name: utilisateur employe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT employe_pkey PRIMARY KEY (nas_emp);


--
-- TOC entry 3281 (class 2606 OID 17963)
-- Name: etablissement_hotelier_contact etablissement_hotelier_contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etablissement_hotelier_contact
    ADD CONSTRAINT etablissement_hotelier_contact_pkey PRIMARY KEY (id_ehc);


--
-- TOC entry 3279 (class 2606 OID 17954)
-- Name: etablissement_hotelier etablissement_hotelier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etablissement_hotelier
    ADD CONSTRAINT etablissement_hotelier_pkey PRIMARY KEY (id_eh);


--
-- TOC entry 3291 (class 2606 OID 18006)
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id_loc);


--
-- TOC entry 3293 (class 2606 OID 26112)
-- Name: utilisateur_role_etablissement_hotelier pk_utilisateur_in_etbalissement_hotelier; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_role_etablissement_hotelier
    ADD CONSTRAINT pk_utilisateur_in_etbalissement_hotelier PRIMARY KEY (nas_utilisateur, id_eh);


--
-- TOC entry 3287 (class 2606 OID 17992)
-- Name: reservation reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (id_res);


--
-- TOC entry 3297 (class 2606 OID 18012)
-- Name: bureau_chaine_contact bureau_chaine_contact_id_bch_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bureau_chaine_contact
    ADD CONSTRAINT bureau_chaine_contact_id_bch_fkey FOREIGN KEY (id_bch) REFERENCES public.bureau_chaine_hoteliere(id_bch) NOT VALID;


--
-- TOC entry 3296 (class 2606 OID 18007)
-- Name: bureau_chaine_hoteliere bureau_chaine_hoteliere_id_ch_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bureau_chaine_hoteliere
    ADD CONSTRAINT bureau_chaine_hoteliere_id_ch_fkey FOREIGN KEY (id_ch) REFERENCES public.chaine_hoteliere(id_ch) NOT VALID;


--
-- TOC entry 3300 (class 2606 OID 18027)
-- Name: chambre chambre_id_eh_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chambre
    ADD CONSTRAINT chambre_id_eh_fkey FOREIGN KEY (id_eh) REFERENCES public.etablissement_hotelier(id_eh) NOT VALID;


--
-- TOC entry 3301 (class 2606 OID 18032)
-- Name: client client_nas_cli_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_nas_cli_fkey FOREIGN KEY (nas_cli) REFERENCES public.location(id_loc) NOT VALID;


--
-- TOC entry 3304 (class 2606 OID 18047)
-- Name: utilisateur employe_id_eh_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT employe_id_eh_fkey FOREIGN KEY (id_eh) REFERENCES public.etablissement_hotelier(id_eh) NOT VALID;


--
-- TOC entry 3299 (class 2606 OID 18022)
-- Name: etablissement_hotelier_contact etablissement_hotelier_contact_id_eh_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etablissement_hotelier_contact
    ADD CONSTRAINT etablissement_hotelier_contact_id_eh_fkey FOREIGN KEY (id_eh) REFERENCES public.etablissement_hotelier(id_eh) NOT VALID;


--
-- TOC entry 3298 (class 2606 OID 18017)
-- Name: etablissement_hotelier etablissement_hotelier_id_ch_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etablissement_hotelier
    ADD CONSTRAINT etablissement_hotelier_id_ch_fkey FOREIGN KEY (id_ch) REFERENCES public.chaine_hoteliere(id_ch) NOT VALID;


--
-- TOC entry 3308 (class 2606 OID 26118)
-- Name: utilisateur_role_etablissement_hotelier fk_etablissement_hotelier_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_role_etablissement_hotelier
    ADD CONSTRAINT fk_etablissement_hotelier_id FOREIGN KEY (id_eh) REFERENCES public.etablissement_hotelier(id_eh) NOT VALID;


--
-- TOC entry 3309 (class 2606 OID 26113)
-- Name: utilisateur_role_etablissement_hotelier fk_utilisateur_role_etablissement_hotelier; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_role_etablissement_hotelier
    ADD CONSTRAINT fk_utilisateur_role_etablissement_hotelier FOREIGN KEY (nas_utilisateur) REFERENCES public.utilisateur(nas_emp);


--
-- TOC entry 3305 (class 2606 OID 18062)
-- Name: location location_id_c_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_id_c_fkey FOREIGN KEY (id_c) REFERENCES public.chambre(id_c) NOT VALID;


--
-- TOC entry 3306 (class 2606 OID 18052)
-- Name: location location_id_res_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_id_res_fkey FOREIGN KEY (id_res) REFERENCES public.reservation(id_res) NOT VALID;


--
-- TOC entry 3307 (class 2606 OID 18057)
-- Name: location location_nas_emp_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_nas_emp_fkey FOREIGN KEY (nas_emp) REFERENCES public.utilisateur(nas_emp) NOT VALID;


--
-- TOC entry 3302 (class 2606 OID 18042)
-- Name: reservation reservation_id_cli_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_id_cli_fkey FOREIGN KEY (id_cli) REFERENCES public.client(nas_cli) NOT VALID;


--
-- TOC entry 3303 (class 2606 OID 18037)
-- Name: reservation reservation_id_emp_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_id_emp_fkey FOREIGN KEY (id_emp) REFERENCES public.utilisateur(nas_emp) NOT VALID;


-- Completed on 2024-04-06 15:37:25 UTC

--
-- PostgreSQL database dump complete
--

