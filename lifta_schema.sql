--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10
-- Dumped by pg_dump version 17.2

-- Started on 2025-01-29 01:58:18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 24577)
-- Name: lifta_schema; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

CREATE SCHEMA lifta_schema;


ALTER SCHEMA lifta_schema OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 24601)
-- Name: certificate; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.certificate (
    certificate_id integer NOT NULL,
    trainer_id integer NOT NULL,
    title character varying(25) NOT NULL,
    photo character varying,
    description character varying(256),
    date_issued date NOT NULL
);


ALTER TABLE lifta_schema.certificate OWNER TO neondb_owner;

--
-- TOC entry 218 (class 1259 OID 24600)
-- Name: certification_certification_id_seq; Type: SEQUENCE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE SEQUENCE lifta_schema.certification_certification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE lifta_schema.certification_certification_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 218
-- Name: certification_certification_id_seq; Type: SEQUENCE OWNED BY; Schema: lifta_schema; Owner: neondb_owner
--

ALTER SEQUENCE lifta_schema.certification_certification_id_seq OWNED BY lifta_schema.certificate.certificate_id;


--
-- TOC entry 227 (class 1259 OID 57369)
-- Name: exercise; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.exercise (
    exercise_id integer NOT NULL,
    trainer_id integer NOT NULL,
    name character varying(20) NOT NULL,
    description character varying(512),
    muscle_group character varying(128) NOT NULL,
    gif_path character varying
);


ALTER TABLE lifta_schema.exercise OWNER TO neondb_owner;

--
-- TOC entry 226 (class 1259 OID 57368)
-- Name: exercise_exercise_id_seq; Type: SEQUENCE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE SEQUENCE lifta_schema.exercise_exercise_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE lifta_schema.exercise_exercise_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 226
-- Name: exercise_exercise_id_seq; Type: SEQUENCE OWNED BY; Schema: lifta_schema; Owner: neondb_owner
--

ALTER SEQUENCE lifta_schema.exercise_exercise_id_seq OWNED BY lifta_schema.exercise.exercise_id;


--
-- TOC entry 234 (class 1259 OID 57401)
-- Name: ingredient; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.ingredient (
    ingredient_id integer NOT NULL,
    name character varying NOT NULL,
    calories_serving integer NOT NULL,
    carb integer,
    fat integer,
    protein integer,
    trainer_id integer
);


ALTER TABLE lifta_schema.ingredient OWNER TO neondb_owner;

--
-- TOC entry 233 (class 1259 OID 57400)
-- Name: ingredient_ingredient_id_seq; Type: SEQUENCE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE SEQUENCE lifta_schema.ingredient_ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE lifta_schema.ingredient_ingredient_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 233
-- Name: ingredient_ingredient_id_seq; Type: SEQUENCE OWNED BY; Schema: lifta_schema; Owner: neondb_owner
--

ALTER SEQUENCE lifta_schema.ingredient_ingredient_id_seq OWNED BY lifta_schema.ingredient.ingredient_id;


--
-- TOC entry 237 (class 1259 OID 57416)
-- Name: meal; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.meal (
    meal_id integer NOT NULL,
    name character varying(25) NOT NULL,
    nutritionist_id integer NOT NULL,
    picture character varying
);


ALTER TABLE lifta_schema.meal OWNER TO neondb_owner;

--
-- TOC entry 235 (class 1259 OID 57409)
-- Name: meal_ingredient; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.meal_ingredient (
    meal_id integer NOT NULL,
    ingredient_id integer NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE lifta_schema.meal_ingredient OWNER TO neondb_owner;

--
-- TOC entry 238 (class 1259 OID 57425)
-- Name: meal_log; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.meal_log (
    trainee_id integer NOT NULL,
    meal_id integer NOT NULL,
    date date NOT NULL,
    "isDone" boolean NOT NULL,
    type character varying(25) NOT NULL
);


ALTER TABLE lifta_schema.meal_log OWNER TO neondb_owner;

--
-- TOC entry 236 (class 1259 OID 57415)
-- Name: meal_meal_id_seq; Type: SEQUENCE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE SEQUENCE lifta_schema.meal_meal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE lifta_schema.meal_meal_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 236
-- Name: meal_meal_id_seq; Type: SEQUENCE OWNED BY; Schema: lifta_schema; Owner: neondb_owner
--

ALTER SEQUENCE lifta_schema.meal_meal_id_seq OWNED BY lifta_schema.meal.meal_id;


--
-- TOC entry 239 (class 1259 OID 57430)
-- Name: meals_diet; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.meals_diet (
    trainee_id integer NOT NULL,
    meal_id integer NOT NULL,
    day character varying(12) NOT NULL,
    type character varying(25) NOT NULL,
    CONSTRAINT meals_diet_day_check CHECK (((day)::text = ANY ((ARRAY['Sunday'::character varying, 'Monday'::character varying, 'Tuesday'::character varying, 'Wednesday'::character varying, 'Thursday'::character varying, 'Friday'::character varying, 'Saturday'::character varying])::text[])))
);


ALTER TABLE lifta_schema.meals_diet OWNER TO neondb_owner;

--
-- TOC entry 225 (class 1259 OID 57362)
-- Name: message; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.message (
    message_id integer NOT NULL,
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    content character varying(256) NOT NULL,
    "time" timestamp with time zone NOT NULL,
    subscription_id integer
);


ALTER TABLE lifta_schema.message OWNER TO neondb_owner;

--
-- TOC entry 224 (class 1259 OID 57361)
-- Name: message_message_id_seq; Type: SEQUENCE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE SEQUENCE lifta_schema.message_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE lifta_schema.message_message_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 224
-- Name: message_message_id_seq; Type: SEQUENCE OWNED BY; Schema: lifta_schema; Owner: neondb_owner
--

ALTER SEQUENCE lifta_schema.message_message_id_seq OWNED BY lifta_schema.message.message_id;


--
-- TOC entry 241 (class 1259 OID 57437)
-- Name: package; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.package (
    package_id integer NOT NULL,
    trainer_id integer NOT NULL,
    name character varying NOT NULL,
    description text,
    price double precision NOT NULL,
    is_active boolean NOT NULL,
    duration integer NOT NULL,
    type character varying(30) NOT NULL
);


ALTER TABLE lifta_schema.package OWNER TO neondb_owner;

--
-- TOC entry 240 (class 1259 OID 57436)
-- Name: package_package_id_seq; Type: SEQUENCE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE SEQUENCE lifta_schema.package_package_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE lifta_schema.package_package_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 240
-- Name: package_package_id_seq; Type: SEQUENCE OWNED BY; Schema: lifta_schema; Owner: neondb_owner
--

ALTER SEQUENCE lifta_schema.package_package_id_seq OWNED BY lifta_schema.package.package_id;


--
-- TOC entry 223 (class 1259 OID 57353)
-- Name: review; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.review (
    review_id integer NOT NULL,
    trainer_id integer NOT NULL,
    trainee_id integer NOT NULL,
    content character varying NOT NULL,
    stars integer NOT NULL
);


ALTER TABLE lifta_schema.review OWNER TO neondb_owner;

--
-- TOC entry 222 (class 1259 OID 57352)
-- Name: review_review_id_seq; Type: SEQUENCE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE SEQUENCE lifta_schema.review_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE lifta_schema.review_review_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 222
-- Name: review_review_id_seq; Type: SEQUENCE OWNED BY; Schema: lifta_schema; Owner: neondb_owner
--

ALTER SEQUENCE lifta_schema.review_review_id_seq OWNED BY lifta_schema.review.review_id;


--
-- TOC entry 221 (class 1259 OID 57345)
-- Name: subscription; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.subscription (
    subscription_id integer NOT NULL,
    trainee_id integer NOT NULL,
    package_id integer NOT NULL,
    start_date date,
    end_date date,
    status character varying(10) DEFAULT 'Pending'::character varying NOT NULL
);


ALTER TABLE lifta_schema.subscription OWNER TO neondb_owner;

--
-- TOC entry 220 (class 1259 OID 57344)
-- Name: subscription_subscription_id_seq; Type: SEQUENCE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE SEQUENCE lifta_schema.subscription_subscription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE lifta_schema.subscription_subscription_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 220
-- Name: subscription_subscription_id_seq; Type: SEQUENCE OWNED BY; Schema: lifta_schema; Owner: neondb_owner
--

ALTER SEQUENCE lifta_schema.subscription_subscription_id_seq OWNED BY lifta_schema.subscription.subscription_id;


--
-- TOC entry 216 (class 1259 OID 24587)
-- Name: trainee; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.trainee (
    trainee_id integer NOT NULL,
    food_allergies character varying(256) NOT NULL,
    weight double precision NOT NULL,
    height double precision NOT NULL,
    goal character varying NOT NULL,
    workout_preferences character varying(20) NOT NULL,
    coach_id integer,
    nutritionist_id integer,
    CONSTRAINT trainee_workout_preferences_check CHECK (((workout_preferences)::text = ANY ((ARRAY['Any'::character varying, 'Home'::character varying, 'Gym'::character varying])::text[])))
);


ALTER TABLE lifta_schema.trainee OWNER TO neondb_owner;

--
-- TOC entry 217 (class 1259 OID 24595)
-- Name: trainer; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.trainer (
    trainer_id integer NOT NULL,
    experience_years integer NOT NULL,
    client_limit integer NOT NULL
);


ALTER TABLE lifta_schema.trainer OWNER TO neondb_owner;

--
-- TOC entry 215 (class 1259 OID 24579)
-- Name: users; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.users (
    user_id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    first_name character varying(20) NOT NULL,
    last_name character varying(20) NOT NULL,
    bio character varying(500),
    photo character varying,
    birth_date date,
    phone_number character(11),
    gender character(1),
    type character varying(10) NOT NULL,
    is_banned boolean DEFAULT false NOT NULL
);


ALTER TABLE lifta_schema.users OWNER TO neondb_owner;

--
-- TOC entry 214 (class 1259 OID 24578)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE SEQUENCE lifta_schema.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE lifta_schema.users_user_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: lifta_schema; Owner: neondb_owner
--

ALTER SEQUENCE lifta_schema.users_user_id_seq OWNED BY lifta_schema.users.user_id;


--
-- TOC entry 230 (class 1259 OID 57383)
-- Name: workout; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.workout (
    workout_id integer NOT NULL,
    trainer_id integer NOT NULL,
    name character varying(25) NOT NULL,
    _note character varying(256)
);


ALTER TABLE lifta_schema.workout OWNER TO neondb_owner;

--
-- TOC entry 228 (class 1259 OID 57377)
-- Name: workout_exercise; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.workout_exercise (
    workout_id integer NOT NULL,
    exercise_id integer NOT NULL,
    sets integer,
    reps integer
);


ALTER TABLE lifta_schema.workout_exercise OWNER TO neondb_owner;

--
-- TOC entry 231 (class 1259 OID 57389)
-- Name: workout_log; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.workout_log (
    trainee_id integer NOT NULL,
    workout_id integer NOT NULL,
    date date NOT NULL,
    "isDone" boolean NOT NULL
);


ALTER TABLE lifta_schema.workout_log OWNER TO neondb_owner;

--
-- TOC entry 229 (class 1259 OID 57382)
-- Name: workout_workout_id_seq; Type: SEQUENCE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE SEQUENCE lifta_schema.workout_workout_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE lifta_schema.workout_workout_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 229
-- Name: workout_workout_id_seq; Type: SEQUENCE OWNED BY; Schema: lifta_schema; Owner: neondb_owner
--

ALTER SEQUENCE lifta_schema.workout_workout_id_seq OWNED BY lifta_schema.workout.workout_id;


--
-- TOC entry 232 (class 1259 OID 57394)
-- Name: workouts_schedule; Type: TABLE; Schema: lifta_schema; Owner: neondb_owner
--

CREATE TABLE lifta_schema.workouts_schedule (
    workout_id integer NOT NULL,
    trainee_id integer NOT NULL,
    day character varying(12) NOT NULL,
    CONSTRAINT workouts_schedule_day_check CHECK (((day)::text = ANY ((ARRAY['Sunday'::character varying, 'Monday'::character varying, 'Tuesday'::character varying, 'Wednesday'::character varying, 'Thursday'::character varying, 'Friday'::character varying, 'Saturday'::character varying])::text[])))
);


ALTER TABLE lifta_schema.workouts_schedule OWNER TO neondb_owner;

--
-- TOC entry 3253 (class 2604 OID 24604)
-- Name: certificate certificate_id; Type: DEFAULT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.certificate ALTER COLUMN certificate_id SET DEFAULT nextval('lifta_schema.certification_certification_id_seq'::regclass);


--
-- TOC entry 3258 (class 2604 OID 57372)
-- Name: exercise exercise_id; Type: DEFAULT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.exercise ALTER COLUMN exercise_id SET DEFAULT nextval('lifta_schema.exercise_exercise_id_seq'::regclass);


--
-- TOC entry 3260 (class 2604 OID 57404)
-- Name: ingredient ingredient_id; Type: DEFAULT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.ingredient ALTER COLUMN ingredient_id SET DEFAULT nextval('lifta_schema.ingredient_ingredient_id_seq'::regclass);


--
-- TOC entry 3261 (class 2604 OID 57419)
-- Name: meal meal_id; Type: DEFAULT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.meal ALTER COLUMN meal_id SET DEFAULT nextval('lifta_schema.meal_meal_id_seq'::regclass);


--
-- TOC entry 3257 (class 2604 OID 57365)
-- Name: message message_id; Type: DEFAULT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.message ALTER COLUMN message_id SET DEFAULT nextval('lifta_schema.message_message_id_seq'::regclass);


--
-- TOC entry 3262 (class 2604 OID 57440)
-- Name: package package_id; Type: DEFAULT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.package ALTER COLUMN package_id SET DEFAULT nextval('lifta_schema.package_package_id_seq'::regclass);


--
-- TOC entry 3256 (class 2604 OID 57356)
-- Name: review review_id; Type: DEFAULT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.review ALTER COLUMN review_id SET DEFAULT nextval('lifta_schema.review_review_id_seq'::regclass);


--
-- TOC entry 3254 (class 2604 OID 57348)
-- Name: subscription subscription_id; Type: DEFAULT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.subscription ALTER COLUMN subscription_id SET DEFAULT nextval('lifta_schema.subscription_subscription_id_seq'::regclass);


--
-- TOC entry 3251 (class 2604 OID 24582)
-- Name: users user_id; Type: DEFAULT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.users ALTER COLUMN user_id SET DEFAULT nextval('lifta_schema.users_user_id_seq'::regclass);


--
-- TOC entry 3259 (class 2604 OID 57386)
-- Name: workout workout_id; Type: DEFAULT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.workout ALTER COLUMN workout_id SET DEFAULT nextval('lifta_schema.workout_workout_id_seq'::regclass);


--
-- TOC entry 3275 (class 2606 OID 24608)
-- Name: certificate certification_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.certificate
    ADD CONSTRAINT certification_pkey PRIMARY KEY (certificate_id);


--
-- TOC entry 3283 (class 2606 OID 57376)
-- Name: exercise exercise_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY (exercise_id);


--
-- TOC entry 3293 (class 2606 OID 57408)
-- Name: ingredient ingredient_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.ingredient
    ADD CONSTRAINT ingredient_pkey PRIMARY KEY (ingredient_id);


--
-- TOC entry 3295 (class 2606 OID 57413)
-- Name: meal_ingredient meal_ingredient_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.meal_ingredient
    ADD CONSTRAINT meal_ingredient_pkey PRIMARY KEY (meal_id, ingredient_id);


--
-- TOC entry 3299 (class 2606 OID 114689)
-- Name: meal_log meal_log_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.meal_log
    ADD CONSTRAINT meal_log_pkey PRIMARY KEY (trainee_id, date, type);


--
-- TOC entry 3297 (class 2606 OID 57424)
-- Name: meal meal_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.meal
    ADD CONSTRAINT meal_pkey PRIMARY KEY (meal_id);


--
-- TOC entry 3301 (class 2606 OID 106499)
-- Name: meals_diet meals_diet_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.meals_diet
    ADD CONSTRAINT meals_diet_pkey PRIMARY KEY (trainee_id, day, type);


--
-- TOC entry 3281 (class 2606 OID 57367)
-- Name: message message_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (message_id);


--
-- TOC entry 3303 (class 2606 OID 57444)
-- Name: package package_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.package
    ADD CONSTRAINT package_pkey PRIMARY KEY (package_id);


--
-- TOC entry 3279 (class 2606 OID 147457)
-- Name: review review_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (review_id, trainer_id, trainee_id);


--
-- TOC entry 3277 (class 2606 OID 57351)
-- Name: subscription subscription_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.subscription
    ADD CONSTRAINT subscription_pkey PRIMARY KEY (subscription_id);


--
-- TOC entry 3271 (class 2606 OID 24594)
-- Name: trainee trainee_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.trainee
    ADD CONSTRAINT trainee_pkey PRIMARY KEY (trainee_id);


--
-- TOC entry 3273 (class 2606 OID 24599)
-- Name: trainer trainer_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.trainer
    ADD CONSTRAINT trainer_pkey PRIMARY KEY (trainer_id);


--
-- TOC entry 3305 (class 2606 OID 81925)
-- Name: package unique_coach_package; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.package
    ADD CONSTRAINT unique_coach_package UNIQUE (trainer_id, name);


--
-- TOC entry 3267 (class 2606 OID 32769)
-- Name: users unique_email; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- TOC entry 3269 (class 2606 OID 24586)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3285 (class 2606 OID 57381)
-- Name: workout_exercise workout_exercise_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.workout_exercise
    ADD CONSTRAINT workout_exercise_pkey PRIMARY KEY (workout_id, exercise_id);


--
-- TOC entry 3289 (class 2606 OID 106501)
-- Name: workout_log workout_log_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.workout_log
    ADD CONSTRAINT workout_log_pkey PRIMARY KEY (trainee_id, date);


--
-- TOC entry 3287 (class 2606 OID 57388)
-- Name: workout workout_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.workout
    ADD CONSTRAINT workout_pkey PRIMARY KEY (workout_id);


--
-- TOC entry 3291 (class 2606 OID 106497)
-- Name: workouts_schedule workouts_schedule_pkey; Type: CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.workouts_schedule
    ADD CONSTRAINT workouts_schedule_pkey PRIMARY KEY (trainee_id, day);


--
-- TOC entry 3310 (class 2606 OID 24713)
-- Name: certificate certification_trainer_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.certificate
    ADD CONSTRAINT certification_trainer_id_fkey FOREIGN KEY (trainer_id) REFERENCES lifta_schema.trainer(trainer_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3318 (class 2606 OID 57515)
-- Name: exercise exercise_coach_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.exercise
    ADD CONSTRAINT exercise_coach_id_fkey FOREIGN KEY (trainer_id) REFERENCES lifta_schema.trainer(trainer_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3326 (class 2606 OID 98305)
-- Name: ingredient fk_ingredient_trainer; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.ingredient
    ADD CONSTRAINT fk_ingredient_trainer FOREIGN KEY (trainer_id) REFERENCES lifta_schema.users(user_id);


--
-- TOC entry 3315 (class 2606 OID 172032)
-- Name: message fk_subs; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.message
    ADD CONSTRAINT fk_subs FOREIGN KEY (subscription_id) REFERENCES lifta_schema.subscription(subscription_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3328 (class 2606 OID 57505)
-- Name: meal_ingredient meal_ingredient_ingredient_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.meal_ingredient
    ADD CONSTRAINT meal_ingredient_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES lifta_schema.ingredient(ingredient_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3329 (class 2606 OID 57510)
-- Name: meal_ingredient meal_ingredient_meal_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.meal_ingredient
    ADD CONSTRAINT meal_ingredient_meal_id_fkey FOREIGN KEY (meal_id) REFERENCES lifta_schema.meal(meal_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3331 (class 2606 OID 57530)
-- Name: meal_log meal_log_meal_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.meal_log
    ADD CONSTRAINT meal_log_meal_id_fkey FOREIGN KEY (meal_id) REFERENCES lifta_schema.meal(meal_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3332 (class 2606 OID 57535)
-- Name: meal_log meal_log_trainee_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.meal_log
    ADD CONSTRAINT meal_log_trainee_id_fkey FOREIGN KEY (trainee_id) REFERENCES lifta_schema.trainee(trainee_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3330 (class 2606 OID 57545)
-- Name: meal meal_nutritionist_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.meal
    ADD CONSTRAINT meal_nutritionist_id_fkey FOREIGN KEY (nutritionist_id) REFERENCES lifta_schema.trainer(trainer_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3333 (class 2606 OID 57460)
-- Name: meals_diet meals_diet_meal_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.meals_diet
    ADD CONSTRAINT meals_diet_meal_id_fkey FOREIGN KEY (meal_id) REFERENCES lifta_schema.meal(meal_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3334 (class 2606 OID 57455)
-- Name: meals_diet meals_diet_trainee_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.meals_diet
    ADD CONSTRAINT meals_diet_trainee_id_fkey FOREIGN KEY (trainee_id) REFERENCES lifta_schema.trainee(trainee_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3316 (class 2606 OID 57490)
-- Name: message message_receiver_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.message
    ADD CONSTRAINT message_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES lifta_schema.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3317 (class 2606 OID 57485)
-- Name: message message_sender_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.message
    ADD CONSTRAINT message_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES lifta_schema.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3335 (class 2606 OID 57550)
-- Name: package package_trainer_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.package
    ADD CONSTRAINT package_trainer_id_fkey FOREIGN KEY (trainer_id) REFERENCES lifta_schema.trainer(trainer_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3313 (class 2606 OID 122880)
-- Name: review review_trainee_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.review
    ADD CONSTRAINT review_trainee_id_fkey FOREIGN KEY (trainee_id) REFERENCES lifta_schema.trainee(trainee_id) ON DELETE CASCADE;


--
-- TOC entry 3314 (class 2606 OID 57475)
-- Name: review review_trainer_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.review
    ADD CONSTRAINT review_trainer_id_fkey FOREIGN KEY (trainer_id) REFERENCES lifta_schema.trainer(trainer_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3311 (class 2606 OID 57470)
-- Name: subscription subscription_package_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.subscription
    ADD CONSTRAINT subscription_package_id_fkey FOREIGN KEY (package_id) REFERENCES lifta_schema.package(package_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3312 (class 2606 OID 57465)
-- Name: subscription subscription_trainee_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.subscription
    ADD CONSTRAINT subscription_trainee_id_fkey FOREIGN KEY (trainee_id) REFERENCES lifta_schema.trainee(trainee_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3306 (class 2606 OID 24698)
-- Name: trainee trainee_coach_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.trainee
    ADD CONSTRAINT trainee_coach_id_fkey FOREIGN KEY (coach_id) REFERENCES lifta_schema.trainer(trainer_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3307 (class 2606 OID 24703)
-- Name: trainee trainee_nutritionist_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.trainee
    ADD CONSTRAINT trainee_nutritionist_id_fkey FOREIGN KEY (nutritionist_id) REFERENCES lifta_schema.trainer(trainer_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3308 (class 2606 OID 24693)
-- Name: trainee trainee_trainee_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.trainee
    ADD CONSTRAINT trainee_trainee_id_fkey FOREIGN KEY (trainee_id) REFERENCES lifta_schema.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3327 (class 2606 OID 155648)
-- Name: ingredient trainer_fk; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.ingredient
    ADD CONSTRAINT trainer_fk FOREIGN KEY (trainer_id) REFERENCES lifta_schema.trainer(trainer_id);


--
-- TOC entry 3309 (class 2606 OID 24708)
-- Name: trainer trainer_trainer_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.trainer
    ADD CONSTRAINT trainer_trainer_id_fkey FOREIGN KEY (trainer_id) REFERENCES lifta_schema.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3321 (class 2606 OID 57540)
-- Name: workout workout_coach_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.workout
    ADD CONSTRAINT workout_coach_id_fkey FOREIGN KEY (trainer_id) REFERENCES lifta_schema.trainer(trainer_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3319 (class 2606 OID 57500)
-- Name: workout_exercise workout_exercise_exercise_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.workout_exercise
    ADD CONSTRAINT workout_exercise_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES lifta_schema.exercise(exercise_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3320 (class 2606 OID 57495)
-- Name: workout_exercise workout_exercise_workout_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.workout_exercise
    ADD CONSTRAINT workout_exercise_workout_id_fkey FOREIGN KEY (workout_id) REFERENCES lifta_schema.workout(workout_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3322 (class 2606 OID 57520)
-- Name: workout_log workout_log_trainee_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.workout_log
    ADD CONSTRAINT workout_log_trainee_id_fkey FOREIGN KEY (trainee_id) REFERENCES lifta_schema.trainee(trainee_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3323 (class 2606 OID 57525)
-- Name: workout_log workout_log_workout_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.workout_log
    ADD CONSTRAINT workout_log_workout_id_fkey FOREIGN KEY (workout_id) REFERENCES lifta_schema.workout(workout_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3324 (class 2606 OID 57450)
-- Name: workouts_schedule workouts_schedule_trainee_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.workouts_schedule
    ADD CONSTRAINT workouts_schedule_trainee_id_fkey FOREIGN KEY (trainee_id) REFERENCES lifta_schema.trainee(trainee_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3325 (class 2606 OID 57445)
-- Name: workouts_schedule workouts_schedule_workout_id_fkey; Type: FK CONSTRAINT; Schema: lifta_schema; Owner: neondb_owner
--

ALTER TABLE ONLY lifta_schema.workouts_schedule
    ADD CONSTRAINT workouts_schedule_workout_id_fkey FOREIGN KEY (workout_id) REFERENCES lifta_schema.workout(workout_id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2025-01-29 01:58:24

--
-- PostgreSQL database dump complete
--

