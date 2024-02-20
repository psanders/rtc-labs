--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
d55113da-c7d8-4cdf-84c1-571109b8521a	f2fa6d701cbe0b561425669aaf715dcc75d95fe23b384b50696ae0674d9f4de1	2024-02-20 21:57:10.859702+00	20230123032410_init	\N	\N	2024-02-20 21:57:10.834731+00	1
0876babb-31b9-4056-9de1-4c5bbd1fac31	0ae6d2419ade25fed5c7bd028b46ef004370633c562e51b85d63485f06578759	2024-02-20 21:57:10.861577+00	20240212032900_added_max_contacts	\N	\N	2024-02-20 21:57:10.859935+00	1
\.


--
-- Data for Name: access_control_lists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.access_control_lists (api_version, ref, name, allow, deny, created_at, updated_at, extended) FROM stdin;
\.


--
-- Data for Name: credentials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credentials (api_version, ref, name, username, password, created_at, updated_at, extended) FROM stdin;
v2	6bc70853-d2b8-4606-a943-09ad81dd82ef	John Doe (Credentials)	1001	1234	2024-02-20 23:26:51.283+00	2024-02-20 23:26:51.283+00	{}
v2	852cf688-f9f2-42a3-ac20-4ff4ab2c08d0	Jane Doe (Credentials)	1002	1234	2024-02-20 23:27:12.802+00	2024-02-20 23:27:12.802+00	{}
\.


--
-- Data for Name: domains; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.domains (api_version, ref, acl_ref, name, domain_uri, created_at, updated_at, extended) FROM stdin;
v2	ca7c7dcd-2276-4912-9dff-14cb40583a98	\N	Local Domain	sip.local	2024-02-20 23:23:55.158+00	2024-02-20 23:23:55.158+00	{}
\.


--
-- Data for Name: agents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agents (api_version, ref, domain_ref, credentials_ref, name, username, privacy, enabled, created_at, updated_at, extended, expires, max_contacts) FROM stdin;
v2	89df1e95-448d-48b3-bcb3-ff54dba9682b	ca7c7dcd-2276-4912-9dff-14cb40583a98	6bc70853-d2b8-4606-a943-09ad81dd82ef	John Doe	1001	NONE	t	2024-02-20 23:27:47.081+00	2024-02-20 23:27:47.081+00	{}	0	1
v2	d4bea0fb-2d5c-4ddf-83fe-52f8325ca35a	ca7c7dcd-2276-4912-9dff-14cb40583a98	852cf688-f9f2-42a3-ac20-4ff4ab2c08d0	Jane Doe	1002	NONE	t	2024-02-20 23:28:10.531+00	2024-02-20 23:28:10.531+00	{}	0	1
\.


--
-- Data for Name: trunks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trunks (api_version, ref, acl_ref, inbound_credentials_ref, outbound_credentials_ref, name, send_register, inbound_uri, created_at, updated_at, extended) FROM stdin;
\.


--
-- Data for Name: numbers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.numbers (api_version, ref, trunk_ref, tel_url, name, aor_link, city, country, country_iso_code, session_affinity_header, extra_headers, created_at, updated_at, extended) FROM stdin;
\.


--
-- Data for Name: egress_policies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.egress_policies (ref, domain_ref, number_ref, rule) FROM stdin;
\.


--
-- Data for Name: peers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.peers (api_version, ref, credentials_ref, acl_ref, name, username, aor, contact_addr, balancing_algorithm, with_session_affinity, enabled, created_at, updated_at, extended, expires, max_contacts) FROM stdin;
\.


--
-- Data for Name: trunk_uris; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trunk_uris (ref, trunk_ref, host, port, transport, "user", weight, priority, enabled) FROM stdin;
\.


--
-- PostgreSQL database dump complete
--

