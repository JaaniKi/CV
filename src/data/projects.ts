import type { MinorProject, Project } from "@/lib/types";

// Projektien kuvat ja videot: laita tiedostot kansioon public/projects/<id>/
// ja lisää ne media-listaan. Ensimmäinen media on kansikuva.
//
//   media: [
//     { type: "video", src: "/projects/music-quiz/demo.mp4", poster: "/projects/music-quiz/poster.png" },
//     { type: "image", src: "/projects/music-quiz/lobby.png", alt: "Pelihuoneen aula" },
//     { type: "youtube", id: "dQw4w9WgXcQ" },
//     { type: "embed", url: "https://music-quiz.onrender.com" },
//   ],
//
// Video kannattaa pakata pieneksi (mp4 / H.264, alle ~10 Mt), koska kansivideo toistuu automaattisesti.
// featured: true nostaa projektin isoksi esittelyksi listan kärkeen.

export const projects: Project[] = [
  {
    id: "heartwise",
    title: "HeartWise 2.0",
    year: "2026",
    context: {
      fi: "Ohjelmistoprojekti · Tampereen yliopisto · asiakkaana Solita",
      en: "Software project · Tampere University · client: Solita",
    },
    description: {
      fi: "Tekoälyavustaja sepelvaltimotautipotilaille. Vastaukset perustuvat hoitosuosituksiin, ja epävarmat tapaukset ohjataan terveydenhuollon ammattilaiselle.",
      en: "An AI assistant for coronary artery disease patients. Answers are grounded in clinical guidelines, and uncertain cases are escalated to a healthcare professional.",
    },
    longDescription: {
      fi: "Web-sovellus, joka auttaa sepelvaltimotautia sairastavia saamaan luotettavaa tietoa ja arvioimaan, milloin kannattaa ottaa yhteyttä ammattilaiseen. Chatbot hakee tietoa suomalaisista ja eurooppalaisista hoitosuosituksista ja muodostaa vastauksen kielimallilla. Jos kysymykseen ei voi vastata turvallisesti, keskustelu siirtyy hoitajalle, joka vastaa siihen omassa näkymässään. Toteutimme prototyypin tiiminä kahden viikon sprinteissä, ja sitä testasivat Tampereen Sydänsairaalan hoitajat.",
      en: "A web application that helps people living with coronary artery disease find reliable information and judge when to contact a professional. The chatbot retrieves information from Finnish and European cardiac care guidelines and generates answers with a language model. When a question can't be answered safely, the conversation is handed over to a nurse who replies in their own view. We built the prototype as a team in two-week sprints, and it was tested by nurses from Tampere Heart Hospital.",
    },
    role: {
      fi: "Junior-kehittäjä, pääosin backend",
      en: "Junior developer, mainly backend",
    },
    contributions: [
      {
        title: { fi: "Viestiluokittelija", en: "Message classifier" },
        text: {
          fi: "Luokittelee potilaan viestit joko chatbotin vastattaviksi (RAG) tai ammattilaisen tarkistettaviksi.",
          en: "Classifies patient messages as either safe for the chatbot to answer (RAG) or needing professional review.",
        },
      },
      {
        title: { fi: "Hätätilanteiden tunnistus", en: "Emergency detection" },
        text: {
          fi: "Ensimmäinen versio moduulista, joka tunnistaa kiireelliset ja kriisiin viittaavat viestit.",
          en: "Built the first version of the module that detects urgent and crisis-related messages.",
        },
      },
      {
        title: { fi: "Yhteenveto ammattilaiselle", en: "Summary for professionals" },
        text: {
          fi: "Tarkistettavaksi merkitystä keskustelusta syntyy jäsennelty yhteenveto: mitä potilas kysyi, lääketieteellisesti olennaiset tiedot ja siirron syy. Lisäksi RAG-putki tuottaa vastausluonnoksen, jonka ammattilainen voi tarkistaa ja hyväksyä.",
          en: "Flagged conversations get a structured summary: what the patient asked, medically relevant details and the reason for escalation. The RAG pipeline also drafts a reply the professional can review and approve.",
        },
      },
      {
        title: { fi: "Käypä hoito -suositukset", en: "Current Care Guidelines" },
        text: {
          fi: "Suunnittelin ja toteutin ominaisuuden, joka hakee tietokannasta sopivan hoitosuosituksen ennen kuin keskustelu siirretään ammattilaiselle. Kielimalli valitsee osuvimman suosituksen ja poimii siitä olennaisimmat lauseet, ja vastaukseen liitetään linkki alkuperäiseen PDF-lähteeseen.",
          en: "Designed and built a feature that retrieves a matching evidence-based guideline from the knowledge base before escalating to a professional. An LLM picks the best match and extracts the most relevant sentences, and the answer links to the official source PDF.",
        },
      },
      {
        title: { fi: "Keskustelujen otsikointi", en: "Chat titles" },
        text: {
          fi: "Tekoäly tiivistää jokaiselle keskustelulle kuvaavan otsikon.",
          en: "AI-generated descriptive titles for conversations.",
        },
      },
      {
        title: { fi: "Muuta", en: "Other" },
        text: {
          fi: "Pääosin backend-kehitystä, jonkin verran frontendia sekä bugikorjauksia ja pienempiä parannuksia koko projektin ajan.",
          en: "Mostly backend work, some frontend, and bug fixes and smaller improvements throughout the project.",
        },
      },
    ],
    highlights: [
      {
        fi: "RAG-putki: gemini-embedding-001 -upotukset ChromaDB:ssä, vastaukset Gemini 2.5 Flash-Lite -mallilla",
        en: "RAG pipeline: gemini-embedding-001 embeddings in ChromaDB, answers from Gemini 2.5 Flash-Lite",
      },
      {
        fi: "Human-in-the-loop: keskustelu siirtyy ammattilaiselle, kun tekoäly ei voi vastata turvallisesti",
        en: "Human-in-the-loop: conversations are escalated to a professional when the AI can't answer safely",
      },
      {
        fi: "Kaksi käyttäjäroolia: potilaan chat-näkymä ja ammattilaisen käsittelynäkymä",
        en: "Two user roles: a patient chat view and a professional's handling view",
      },
      {
        fi: "Docker Compose -ympäristö, automaattiset testit ja CI GitHub Actionsilla",
        en: "Docker Compose environment, automated tests and CI with GitHub Actions",
      },
    ],
    // Demovideo: tallenna tiedosto polkuun public/projects/heartwise/demo.mp4.
    // Kunnes tiedosto on olemassa, kannessa näkyy projektin nimi.
    // Halutessasi lisää kansikuva: poster: "/projects/heartwise/poster.png"
    media: [{ type: "video", src: "/projects/heartwise/demo.mp4" }],
    techStack: [
      "Vue 3",
      "Python",
      "FastAPI",
      "MongoDB",
      "ChromaDB",
      "Gemini API",
      "Google Cloud Storage",
      "Docker",
      "GitHub Actions",
    ],
    repoUrl: "https://github.com/slt-prior-org/SLT-PRIOR",
    featured: true,
  },
  {
    id: "music-quiz",
    title: "Music Quiz",
    year: "2025",
    description: {
      fi: "Reaaliaikainen moninpeli, jossa kuunnellaan kappaleiden esikatseluja ja kilpaillaan, kuka tunnistaa kappaleen nopeimmin.",
      en: "A real-time multiplayer game where players listen to song previews and race to guess the right track.",
    },
    longDescription: {
      fi: "Pelaajat liittyvät huoneeseen, jossa isäntä hallitsee peliä aulasta käsin. Jokaisella kierroksella soi lyhyt esikatselu kappaleesta, ja mitä nopeammin oikea vastaus tulee, sitä enemmän pisteitä. Tulostaulu päivittyy jokaisen kierroksen jälkeen. Pelitila synkronoidaan kaikille pelaajille reaaliajassa Socket.IO:lla, ja sovellus toimii myös mobiilissa.",
      en: "Players join a room where the host controls the game from the lobby. Each round plays a short song preview, and faster correct answers earn more points. The scoreboard updates after every round. Game state is synced to all players in real time with Socket.IO, and the app works on mobile too.",
    },
    highlights: [
      {
        fi: "Moninpelihuoneet, aula ja isännän ohjaimet",
        en: "Multiplayer rooms with a lobby and host controls",
      },
      {
        fi: "Aikaan perustuva pisteytys ja kierroksittain päivittyvä tulostaulu",
        en: "Time-based scoring and a live scoreboard updated every round",
      },
      {
        fi: "Reaaliaikainen tilan synkronointi Socket.IO:lla",
        en: "Real-time state sync with Socket.IO",
      },
      {
        fi: "Docker-kontti ja julkaisu Renderiin",
        en: "Dockerized and deployed on Render",
      },
    ],
    // Tallenna tiedostot näillä nimillä kansioon public/projects/music-quiz/
    // Ensimmäinen (video) on kansi ja toistuu kortissa automaattisesti.
    media: [
      { type: "video", src: "/projects/music-quiz/demo.mp4" },
      { type: "image", src: "/projects/music-quiz/screenshot-1.png", alt: "Music Quiz" },
      { type: "image", src: "/projects/music-quiz/screenshot-2.png", alt: "Music Quiz" },
      { type: "image", src: "/projects/music-quiz/screenshot-3.png", alt: "Music Quiz" },
    ],
    techStack: ["Next.js", "TypeScript", "Socket.IO", "Tailwind CSS", "Node.js", "Docker"],
    repoUrl: "https://github.com/JaaniKi/Projects/tree/main/music-quiz",
    liveUrl: "https://music-quiz-yw03.onrender.com",
    liveNote: {
      fi: "Ilmainen palvelin voi käynnistyä noin 45 sekuntia.",
      en: "The free server may take about 45 seconds to wake up.",
    },
    featured: false,
  },
  {
    id: "bestdeals",
    title: "Bestdeals",
    year: "2025",
    context: {
      fi: "Ryhmäprojekti · neljän hengen tiimi",
      en: "Group project · team of four",
    },
    description: {
      fi: "Työpöytäsovellus, joka etsii videopeleille edullisimmat tarjoukset eri kaupoista.",
      en: "A desktop app that finds the best video game deals across stores.",
    },
    longDescription: {
      fi: "Qt-pohjainen työpöytäsovellus, joka yhdistää RAWG-rajapinnan pelitiedot CheapSharkin hintatietoihin. Käyttäjä voi hakea pelejä nimellä, katsoa niiden tiedot (julkaisupäivä, lajityypit, alustat, Metacritic-arvio) ja vertailla ajankohtaisia tarjouksia kaupoittain halvimmasta alkaen. Koska rajapinnat nimeävät pelit eri tavoin, tarjoukset yhdistetään oikeaan peliin normalisoimalla nimet ja vertaamalla niitä Levenshtein-etäisyydellä.",
      en: "A Qt desktop application that combines game metadata from the RAWG API with price data from CheapShark. Users can search games by title, view details (release date, genres, platforms, Metacritic rating) and compare current deals across stores, sorted by lowest price. Because the two APIs name games differently, deals are matched to the right game by normalizing titles and comparing them with Levenshtein distance.",
    },
    highlights: [
      {
        fi: "Kerrosarkkitehtuuri: käyttöliittymä (MainWindow, GameCard, DealCard), API-kerros ja apufunktiot",
        en: "Layered architecture: GUI (MainWindow, GameCard, DealCard), API layer and utilities",
      },
      {
        fi: "Tarjousten yhdistäminen peleihin nimien normalisoinnilla ja Levenshtein-etäisyydellä",
        en: "Deal-to-game matching with title normalization and Levenshtein distance",
      },
      {
        fi: "Pikkukuvat ladataan asynkronisesti, joten käyttöliittymä pysyy responsiivisena",
        en: "Asynchronous thumbnail loading keeps the UI responsive",
      },
    ],
    media: [{ type: "image", src: "/projects/bestdeals/screenshot.png" }],
    techStack: ["C++17", "Qt 6", "libcurl", "nlohmann/json", "CMake", "RAWG API", "CheapShark API"],
    repoUrl: "https://github.com/JaaniKi/Projects/tree/main/bestdeals",
    featured: false,
  },
  {
    id: "password-game",
    title: "Password Puzzle",
    year: "2025",
    description: {
      fi: "Humoristinen selainpeli, jossa salasana on itse pulma: yhden salasanan on täytettävä yhä oudompia sääntöjä.",
      en: "A humoristic browser game where the password is the puzzle: one password has to satisfy increasingly strange rules.",
    },
    longDescription: {
      fi: "Pelaaja kirjoittaa yhden salasanan, jonka on täytettävä kaikki näkyvät säännöt yhtä aikaa. Uusi sääntö paljastuu vasta, kun kaikki aiemmat ovat kunnossa. Sääntöjä on parikymmentä ja ne vaihtelevat numeroiden summasta ja roomalaisista numeroista morsekoodiin, Fibonaccin lukujonoon, päivän horoskooppimerkkiin ja palindromiin. Osa säännöistä vaatii ensin minipelin ratkaisemista, kuten sokkelon tai matopelin, jossa kerätään sanan kirjaimet. Satunnaistetut arvot tekevät jokaisesta pelikerrasta erilaisen.",
      en: "The player types a single password that has to satisfy every visible rule at the same time. A new rule is revealed only once all previous ones pass. There are around twenty rules, ranging from digit sums and Roman numerals to Morse code, the Fibonacci sequence, today's zodiac sign and a palindrome. Some rules require solving a mini-game first, such as a maze or a Snake game where you collect the letters of a word. Randomized values make every playthrough different.",
    },
    highlights: [
      {
        fi: "Sääntömoottori, joka tarkistaa salasanan jokaisella näppäilyllä ja paljastaa säännöt yksi kerrallaan",
        en: "A rule engine that validates the password on every keystroke and reveals rules one at a time",
      },
      {
        fi: "Minipelit React-komponentteina, esimerkiksi oma matopeli näppäimistöohjauksella",
        en: "Mini-games as React components, including a custom keyboard-controlled Snake game",
      },
      {
        fi: "Satunnaistetut tehtävät, joten ratkaisua ei voi opetella ulkoa",
        en: "Randomized challenges, so the solution can't be memorized",
      },
    ],
    // Kuvakaappaus näkyy vain kortissa; projekti-ikkunassa on pelkkä pelattava demo
    cover: {
      src: "/projects/password-game/screenshot.png",
      alt: "Password Puzzle: salasanakenttä ja ensimmäinen sääntö",
    },
    media: [{ type: "embed", url: "https://password-puzzle-game.netlify.app/" }],
    techStack: ["React", "JavaScript", "CSS", "Netlify"],
    repoUrl: "https://github.com/JaaniKi/Projects/tree/main/React_projects/password-game",
    liveUrl: "https://password-puzzle-game.netlify.app/",
    featured: false,
  },
];

const REPO = "https://github.com/JaaniKi/Projects/tree/main";
const source = { fi: "Lähdekoodi", en: "Source" };

// Pienemmät projektit: näkyvät tiiviinä listana pääprojektien alla
export const minorProjects: MinorProject[] = [
  {
    id: "ai-chatbots",
    title: "AI Chatbots",
    year: "2025",
    description: {
      fi: "Kaksi OpenAI API:n päälle rakennettua chatbottia: yleinen keskusteleva botti, joka muistaa keskusteluhistorian, sekä verkkosivulle upotettava asiakaspalvelun ponnahdusikkuna pikakysymyksineen. Järjestelmäkehote rajaa asiakaspalvelubotin vastaamaan vain tuotteisiin ja tilauksiin liittyviin kysymyksiin, ja API-avain pysyy palvelimella.",
      en: "Two chatbots built on the OpenAI API: a general conversational bot that keeps the conversation history, and an embeddable customer service pop-up for a website with quick-question buttons. A system prompt limits the support bot to product and order questions, and the API key stays on the server.",
    },
    techStack: ["OpenAI API", "Node.js", "Express", "JavaScript"],
    links: [
      { label: { fi: "Chatbot", en: "Chatbot" }, url: `${REPO}/AI_chatbots/AI-chatbot` },
      {
        label: { fi: "Asiakaspalvelubotti", en: "Support bot" },
        url: `${REPO}/AI_chatbots/AI-popUp_chatbot`,
      },
    ],
  },
  {
    id: "chess",
    title: "Chess",
    year: "2025",
    description: {
      fi: "Graafinen, yksinkertaistettu shakki: sallitut siirrot korostetaan, ja voittaja on se, joka kaappaa ensin vastustajan kuninkaan. Alun perin kurssitehtävä, jota jatkokehitin itsenäisesti.",
      en: "A graphical, simplified chess game: legal moves are highlighted, and the first to capture the opponent's king wins. Started as a course assignment and extended independently.",
    },
    techStack: ["C++", "Qt"],
    links: [{ label: source, url: `${REPO}/chess` }],
  },
  {
    id: "weather",
    title: "Weather",
    year: "2025",
    description: {
      fi: "Sääsovellus: kaupunkihaku, nykyinen sää, seitsemän päivän ennuste ja tuntikohtainen ennuste valitulle päivälle.",
      en: "A weather app: city search, current conditions, a seven-day forecast and an hourly forecast for the selected day.",
    },
    techStack: ["React", "Open-Meteo API"],
    links: [{ label: source, url: `${REPO}/React_projects/weather` }],
  },
  {
    id: "photography-portfolio",
    title: "Photography Portfolio",
    year: "2025",
    description: {
      fi: "Portfolio omille valokuvilleni: kategoriasuodatus ja suurennusnäkymä, jossa kuvia selataan nuolinäppäimillä.",
      en: "A portfolio for my own photography: category filters and a lightbox you can browse with the arrow keys.",
    },
    techStack: ["React"],
    links: [{ label: source, url: `${REPO}/React_projects/photography-portfolio` }],
  },
  {
    id: "bookstore",
    title: "BookStore",
    year: "2025",
    description: {
      fi: "Kirjakaupan varastonhallinta: kirjojen lisäys, haku, myynti ja saldon seuranta, vähäinen varasto korostettuna. Toteutettu kahdesti, Reactin omalla tilalla ja Redux Toolkitilla.",
      en: "Bookstore inventory management: add, search and sell books and track stock, with low stock highlighted. Built twice, with React state and with Redux Toolkit.",
    },
    techStack: ["React", "Redux Toolkit"],
    links: [
      { label: { fi: "React", en: "React" }, url: `${REPO}/React_projects/BookStore` },
      { label: { fi: "Redux", en: "Redux" }, url: `${REPO}/React_projects/BookStore_redux` },
    ],
  },
];
