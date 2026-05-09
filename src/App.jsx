import React, { useEffect, useMemo, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock,
  ExternalLink,
  Flame,
  Heart,
  MapPin,
  Menu,
  Mic,
  Minus,
  Navigation,
  Plus,
  Save,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  Truck,
  Utensils,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { defaultSchedule, parseScheduleText, sanitizeSchedule } from "./scheduleTools";

gsap.registerPlugin(ScrollTrigger);

const asset = (name) => `/assets/${name}`;

const navItems = [
  ["Menu", "#menu"],
  ["Tracker", "#tracker"],
  ["Pickup", "#schedule"],
  ["Reviews", "/reviews"],
  ["Catering", "/catering"],
];

const sources = {
  streetFoodFinder: "https://streetfoodfinder.com/JrsTacos",
  facebook: "https://www.facebook.com/p/Jrs-Tacos-100086683935294/",
  instagram: "https://www.instagram.com/jrstacos26/",
  tiktok: "https://www.tiktok.com/@jrstacos26",
  bestFoodTrucks: "https://www.bestfoodtrucks.com/truck/jr-s-tacos/menu",
  cloverMenu: "https://jrs-tacos-saint-peters.cloveronline.com/menu/all",
  stlFoodTrucks: "https://stlouisfoodtrucks.org/",
  googleReviews: "https://www.google.com/search?q=Jr%27s+Tacos+5+Auchly+Ln+St+Peters+MO+reviews",
  googleMapsEmbed:
    "https://www.google.com/maps?q=Jr%27s%20Tacos%205%20Auchly%20Ln%2C%20St%20Peters%2C%20MO%2063376&output=embed",
};

const contactPhone = "+16365798569";
const siteUrl = "https://jrstacosstl.com";
const seoImage = `${siteUrl}/assets/tacos-hero.jpg`;
const siteMode = "coming-soon";
const comingSoonMeta = {
  title: "Coming Soon | Juniors Tacos",
  description: "Juniors Tacos official site is coming soon.",
  image: `${siteUrl}/assets/coming-soon-bg.jpg`,
};

const seoPages = {
  "/": {
    title: "Juniors Tacos | Taco Truck in St. Peters, MO",
    description:
      "Juniors Tacos is a taco truck in St. Peters, MO serving street tacos, burritos, quesadillas, nachos, Jarritos, desserts, pickup, and catering.",
    canonicalPath: "/",
  },
  "/catering": {
    title: "Taco Truck Catering in St. Peters, MO | Juniors Tacos",
    description:
      "Book Juniors Tacos for taco truck catering in St. Peters, St. Charles County, and the St. Louis area. Request street tacos, nachos, quesadillas, Jarritos, and private event service.",
    canonicalPath: "/catering",
  },
  "/reviews": {
    title: "Juniors Tacos Reviews | Best Taco Truck Notes in St. Peters",
    description:
      "Read customer reviews for Juniors Tacos, a St. Peters taco truck serving street tacos, quesadillas, nachos, burritos, and catering around the St. Louis area.",
    canonicalPath: "/reviews",
  },
};

function getCanonicalUrl(path) {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "");
  return normalizedPath === "/" ? `${siteUrl}/` : `${siteUrl}${normalizedPath}`;
}

function upsertHeadElement(selector, createElement, attributes = {}) {
  const element = document.querySelector(selector) || createElement();

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  if (!element.parentNode) {
    document.head.appendChild(element);
  }

  return element;
}

function ComingSoonPage() {
  useEffect(() => {
    document.documentElement.lang = "en";
    document.title = comingSoonMeta.title;

    upsertHeadElement('meta[name="description"]', () => document.createElement("meta"), {
      name: "description",
      content: comingSoonMeta.description,
    });
    upsertHeadElement('link[rel="canonical"]', () => document.createElement("link"), {
      rel: "canonical",
      href: `${siteUrl}/`,
    });
    upsertHeadElement('meta[property="og:title"]', () => document.createElement("meta"), {
      property: "og:title",
      content: comingSoonMeta.title,
    });
    upsertHeadElement('meta[property="og:description"]', () => document.createElement("meta"), {
      property: "og:description",
      content: comingSoonMeta.description,
    });
    upsertHeadElement('meta[property="og:image"]', () => document.createElement("meta"), {
      property: "og:image",
      content: comingSoonMeta.image,
    });
    upsertHeadElement('meta[property="og:image:alt"]', () => document.createElement("meta"), {
      property: "og:image:alt",
      content: "Juniors Tacos team smiling from the pickup window",
    });
    upsertHeadElement('meta[name="twitter:title"]', () => document.createElement("meta"), {
      name: "twitter:title",
      content: comingSoonMeta.title,
    });
    upsertHeadElement('meta[name="twitter:description"]', () => document.createElement("meta"), {
      name: "twitter:description",
      content: comingSoonMeta.description,
    });
    upsertHeadElement('meta[name="twitter:image"]', () => document.createElement("meta"), {
      name: "twitter:image",
      content: comingSoonMeta.image,
    });

    const structuredDataScript = upsertHeadElement("#site-structured-data", () => {
      const script = document.createElement("script");
      script.id = "site-structured-data";
      script.type = "application/ld+json";
      return script;
    });

    structuredDataScript.textContent = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: comingSoonMeta.title,
        description: comingSoonMeta.description,
        image: comingSoonMeta.image,
        inLanguage: "en-US",
      },
      null,
      2,
    );
  }, []);

  return (
    <>
      <main className="coming-soon-page" aria-labelledby="coming-soon-title">
        <img className="coming-soon-bg" src={asset("coming-soon-bg.jpg")} alt="" aria-hidden="true" />
        <div className="coming-soon-tint" aria-hidden="true" />
        <div className="coming-soon-content">
          <h1 className="coming-soon-title" id="coming-soon-title" aria-label="Coming Soon">
            <span>Coming</span>
            <span>Soon</span>
          </h1>
        </div>
      </main>
      <Analytics />
    </>
  );
}

function buildStructuredData(routePath, language = "en") {
  const canonicalUrl = getCanonicalUrl(routePath);
  const page = seoPages[routePath] || seoPages["/"];
  const inLanguage = language === "es" ? "es-MX" : "en-US";
  const pageTitle = translateCopy(page.title, language);
  const pageDescription = translateCopy(page.description, language);

  const graph = [
    {
      "@type": "Restaurant",
      "@id": `${siteUrl}/#restaurant`,
      name: "Jr's Tacos",
      alternateName: "Juniors Tacos",
      url: `${siteUrl}/`,
      logo: `${siteUrl}/assets/jr-taco-logo.jpg`,
      image: [
        `${siteUrl}/assets/tacos-hero.jpg`,
        `${siteUrl}/assets/nachos-share.jpg`,
        `${siteUrl}/assets/quesadilla-table.jpg`,
      ],
      telephone: contactPhone,
      priceRange: "$",
      servesCuisine: ["Mexican", "Street tacos", "Tacos", "Quesadillas", "Nachos"],
      menu: sources.cloverMenu,
      address: {
        "@type": "PostalAddress",
        streetAddress: "5 Auchly Ln",
        addressLocality: "St. Peters",
        addressRegion: "MO",
        postalCode: "63376",
        addressCountry: "US",
      },
      areaServed: ["St. Peters, MO", "Saint Peters, MO", "St. Charles County, MO", "St. Louis, MO"],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Thursday", "Friday", "Saturday"],
          opens: "10:30",
          closes: "19:30",
        },
      ],
      sameAs: [sources.facebook, sources.instagram, sources.tiktok, sources.streetFoodFinder],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Juniors Tacos",
      url: `${siteUrl}/`,
      publisher: {
        "@id": `${siteUrl}/#restaurant`,
      },
      inLanguage,
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: pageTitle,
      description: pageDescription,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#restaurant`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: seoImage,
      },
      inLanguage,
    },
  ];

  if (routePath === "/catering") {
    graph.push({
      "@type": "Service",
      "@id": `${siteUrl}/catering#service`,
      name: "Taco truck catering",
      serviceType: "Food truck catering",
      provider: {
        "@id": `${siteUrl}/#restaurant`,
      },
      areaServed: ["St. Peters, MO", "St. Charles County, MO", "St. Louis, MO"],
      url: `${siteUrl}/catering`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

const cloverItem = (path) => `https://${path}`;

const categories = [
  "Popular",
  "Tacos",
  "Burritos",
  "Nachos",
  "Quesadillas",
  "Drinks",
  "Postre Desserts",
  "Tamales",
  "Sopes",
];

const tacoOptions = ["No onion", "No cilantro", "Add cheese +$0.25", "Add sour cream +$0.25", "Extra meat +$1.99"];
const burritoOptions = [
  "No beans",
  "No corn",
  "No sour cream",
  "No pico",
  "Fajitas",
  "Rice",
  "Extra meat +$1.99",
  "Extra sour cream +$0.49",
  "Extra cheese +$0.99",
];
const nachosOptions = [
  "Add asada +$1.99",
  "Add al pastor +$1.99",
  "Add ground beef +$1.99",
  "Add lengua +$2.49",
  "Add chicken +$1.99",
  "Add chorizo +$1.99",
  "No jalapenos",
];
const nachosSupremeOptions = [
  "No beans",
  "No corn",
  "No sour cream",
  "No pico",
  "No jalapenos",
  "No ground beef",
  "Extra meat +$1.99",
  "Extra sour cream +$0.49",
  "Extra cheese +$0.99",
];
const quesadillaOptions = [
  "No fajitas",
  "No sour cream",
  "No lettuce",
  "No pico de gallo",
  "Extra cheese +$1.00",
  "Extra meat +$1.99",
  "Extra sour cream +$0.49",
];
const cornOptions = ["Mexican mayo", "Cotija cheese", "Crushed Takis", "Lime"];

const menuItems = [
  {
    id: "CQVBM4H8TAF00",
    name: "Pollo Taco Chicken",
    category: "Tacos",
    price: 4,
    image: asset("tacos-hero.jpg"),
    badge: "Taco",
    description: "Corn tortilla, chicken, topped off with onion and cilantro.",
    options: tacoOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/pollo-taco-chicken-CQVBM4H8TAF00"),
    favorite: true,
  },
  {
    id: "C49SBY0FGFK4P",
    name: "El Pastor Taco Season Pork",
    category: "Tacos",
    price: 4,
    image: asset("tacos-hero.jpg"),
    badge: "Taco",
    description: "Corn tortilla, season pork topped off with onion and cilantro.",
    options: tacoOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/el-pastor-taco-season-pork-C49SBY0FGFK4P"),
    favorite: true,
  },
  {
    id: "7ZK3355XP9XVJ",
    name: "Lengua Taco Beef Tongue",
    category: "Tacos",
    price: 4.5,
    image: asset("asada-gemini.png"),
    badge: "Taco",
    description: "Corn tortilla, beef tongue, topped off with onion and cilantro.",
    options: tacoOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/lengua-taco-beef-tongue-7ZK3355XP9XVJ"),
    favorite: false,
  },
  {
    id: "TVAMSS0E38BYC",
    name: "Asada Taco Steak",
    category: "Tacos",
    price: 4,
    image: asset("asada-chatgpt.png"),
    badge: "Taco",
    description: "Corn tortilla, grilled steak, topped off with onion and cilantro.",
    options: tacoOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/asada-taco-steak-TVAMSS0E38BYC"),
    favorite: true,
  },
  {
    id: "NW0H1EPC3SBWR",
    name: "Chorizo Taco Season Sausage",
    category: "Tacos",
    price: 4,
    image: asset("tacos-hero.jpg"),
    badge: "Taco",
    description: "Corn tortilla, chorizo season pork sausage, topped off with onion and cilantro.",
    options: tacoOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/chorizo-taco-season-sausage-NW0H1EPC3SBWR"),
    favorite: false,
  },
  {
    id: "HE9K731BNXKXJ",
    name: "Asada/Steak Burrito JR.",
    category: "Burritos",
    price: 15,
    image: asset("burrito-close.jpg"),
    badge: "Burrito",
    description: "12 inch flour tortilla with asada, melted cheese, fajitas, rice, pico, corn, black beans, and sour cream.",
    options: burritoOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/asadasteak-burrito-jr-HE9K731BNXKXJ"),
    favorite: true,
  },
  {
    id: "5SXGF1A4MFHEC",
    name: "Pollo/Chicken Burrito JR.",
    category: "Burritos",
    price: 15,
    image: asset("burrito-close.jpg"),
    badge: "Burrito",
    description: "12 inch flour tortilla with chicken, melted cheese, fajitas, rice, pico, corn, black beans, and sour cream.",
    options: burritoOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/pollochicken-burrito-jr-5SXGF1A4MFHEC"),
    favorite: false,
  },
  {
    id: "MQN8XN6WQ5BNE",
    name: "Al Pastor/Season Pork Burrito JR.",
    category: "Burritos",
    price: 15,
    image: asset("burrito-close.jpg"),
    badge: "Burrito",
    description: "12 inch flour tortilla with al pastor, melted cheese, fajitas, rice, pico, corn, black beans, and sour cream.",
    options: burritoOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/al-pastorseason-pork-burrito-jr-MQN8XN6WQ5BNE"),
    favorite: false,
  },
  {
    id: "7J1RJF7W9KPZ2",
    name: "Chorizo/Season Sausage Burrito JR.",
    category: "Burritos",
    price: 15,
    image: asset("burrito-close.jpg"),
    badge: "Burrito",
    description: "12 inch flour tortilla with chorizo, melted cheese, fajitas, rice, pico, corn, black beans, and sour cream.",
    options: burritoOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/chorizoseason-sausage-burrito-jr-7J1RJF7W9KPZ2"),
    favorite: false,
  },
  {
    id: "M3BNBVY2JY14E",
    name: "Lengua/Beef Tongue Burrito JR.",
    category: "Burritos",
    price: 16,
    image: asset("burrito-close.jpg"),
    badge: "Burrito",
    description: "12 inch flour tortilla with beef tongue, melted cheese, fajitas, rice, pico, corn, black beans, and sour cream.",
    options: burritoOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/lenguabeef-tongue-burrito-jr-M3BNBVY2JY14E"),
    favorite: false,
  },
  {
    id: "J1WDW2E30NC0M",
    name: "Nachos Supreme",
    category: "Nachos",
    price: 14,
    image: asset("nachos-supreme.png"),
    badge: "Shareable",
    description: "Corn tortilla chips, cheese sauce, ground beef, pico de gallo, corn, black beans, sour cream, and jalapenos.",
    options: nachosSupremeOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/nachos-supreme-J1WDW2E30NC0M"),
    favorite: true,
  },
  {
    id: "A4H75V301VBWC",
    name: "Dori Nachos",
    category: "Nachos",
    price: 7,
    image: asset("nachos-share.jpg"),
    badge: "Snack",
    description: "Nacho chips topped off with cheese sauce and jalapenos.",
    options: nachosOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/dori-nachos-A4H75V301VBWC"),
    favorite: false,
  },
  {
    id: "GR2FZJVQVCM3T",
    name: "Dori Nachos Supreme",
    category: "Nachos",
    price: 14,
    image: asset("nachos-share.jpg"),
    badge: "Shareable",
    description: "Dorito chips, cheese sauce, ground beef, pico de gallo, corn, black beans, sour cream, and jalapenos.",
    options: nachosSupremeOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/dori-nachos-supreme-GR2FZJVQVCM3T"),
    favorite: false,
  },
  {
    id: "TVKMX9ZZ2EW8C",
    name: "Nachos",
    category: "Nachos",
    price: 7,
    image: asset("nachos-share.jpg"),
    badge: "Snack",
    description: "Tortilla chips with cheese sauce and jalapenos.",
    options: nachosOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/nachos-TVKMX9ZZ2EW8C"),
    favorite: false,
  },
  {
    id: "CVVJZK10W0BCA",
    name: "Mexican Street Corn",
    category: "Nachos",
    price: 6,
    image: asset("mexican-street-corn.png"),
    badge: "Street corn",
    description: "Mexican street corn with mayo, cotija cheese, crushed Takis, and lime options.",
    options: cornOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/mexican-street-corn-CVVJZK10W0BCA"),
    favorite: true,
  },
  {
    id: "XNXC01D92Q6FC",
    name: "Pollo Quesadilla Chicken",
    category: "Quesadillas",
    price: 14,
    image: asset("quesadilla-table.jpg"),
    badge: "Cheesy",
    description: "Flour tortilla with chicken, melted cheese, and fajitas. Lettuce, pico de gallo, and sour cream on the side.",
    options: quesadillaOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/pollo-quesadilla-chicken-XNXC01D92Q6FC"),
    favorite: true,
  },
  {
    id: "0VYXAKY1PCNSJ",
    name: "Al Pastor Quesadilla Season Pork",
    category: "Quesadillas",
    price: 14,
    image: asset("quesadilla-table.jpg"),
    badge: "Cheesy",
    description: "Flour tortilla with season pork, melted cheese, and fajitas. Lettuce, pico de gallo, and sour cream on the side.",
    options: quesadillaOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/al-pastor-quesadilla-season-pork-0VYXAKY1PCNSJ"),
    favorite: false,
  },
  {
    id: "AK0HC1AP09PV2",
    name: "Lengua Quesadilla Beef Tongue",
    category: "Quesadillas",
    price: 15,
    image: asset("quesadilla-table.jpg"),
    badge: "Cheesy",
    description: "Flour tortilla with beef tongue, melted cheese, and fajitas. Lettuce, pico de gallo, and sour cream on the side.",
    options: quesadillaOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/lengua-quesadilla-beef-tongue-AK0HC1AP09PV2"),
    favorite: false,
  },
  {
    id: "6SX0AV3K86GQA",
    name: "Asada Quesadilla Steak",
    category: "Quesadillas",
    price: 14,
    image: asset("quesadilla-table.jpg"),
    badge: "Cheesy",
    description: "Flour tortilla with steak, melted cheese, and fajitas. Lettuce, pico de gallo, and sour cream outside.",
    options: quesadillaOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/asada-quesadilla-steak-6SX0AV3K86GQA"),
    favorite: true,
  },
  {
    id: "T2D1QVVXBWTQA",
    name: "Chorizo/Season Sausage Quesadilla",
    category: "Quesadillas",
    price: 14,
    image: asset("quesadilla-table.jpg"),
    badge: "Cheesy",
    description: "Flour tortilla with chorizo, melted cheese, and fajitas. Lettuce, pico de gallo, and sour cream on the side.",
    options: quesadillaOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/chorizoseason-sausage-quesadilla-T2D1QVVXBWTQA"),
    favorite: false,
  },
  {
    id: "BZ2FM86Y55SX4",
    name: "Cheese Quesadilla",
    category: "Quesadillas",
    price: 8.99,
    image: asset("quesadilla-table.jpg"),
    badge: "Cheesy",
    description: "Flour tortilla with cheese.",
    options: quesadillaOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/cheese-quesadilla-BZ2FM86Y55SX4"),
    favorite: false,
  },
  {
    id: "26ABYNERNWEGC",
    name: "Veggie Quesadilla",
    category: "Quesadillas",
    price: 13,
    image: asset("quesadilla-table.jpg"),
    badge: "Veggie",
    description: "Flour tortilla with melted cheese, fajitas, black beans, and corn. Lettuce, pico, and sour cream outside.",
    options: quesadillaOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/veggie-quesadilla-26ABYNERNWEGC"),
    favorite: false,
  },
  {
    id: "90MRC5FZ19NV0",
    name: "Coca",
    category: "Drinks",
    price: 2,
    image: asset("jarritos-green.jpg"),
    badge: "Cold",
    description: "Classic Coca-Cola.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/coca-90MRC5FZ19NV0"),
    favorite: false,
  },
  {
    id: "6F45ACXQWM5R2",
    name: "Agua/Water",
    category: "Drinks",
    price: 2,
    image: asset("jarritos-green.jpg"),
    badge: "Cold",
    description: "Bottled water.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/aguawater-6F45ACXQWM5R2"),
    favorite: false,
  },
  {
    id: "H2AGXE3G0YJR2",
    name: "Orange",
    category: "Drinks",
    price: 3.5,
    image: asset("jarritos-green.jpg"),
    badge: "Unavailable",
    description: "Orange drink.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/orange-H2AGXE3G0YJR2"),
    available: false,
    favorite: false,
  },
  {
    id: "0KK62E4DM79HR",
    name: "Sprite",
    category: "Drinks",
    price: 2,
    image: asset("jarritos-green.jpg"),
    badge: "Cold",
    description: "Sprite.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/sprite-0KK62E4DM79HR"),
    favorite: false,
  },
  {
    id: "DP5HXHK91PEA8",
    name: "Jarrito Pineapple",
    category: "Drinks",
    price: 3.5,
    image: asset("jarritos-green.jpg"),
    badge: "Jarrito",
    description: "Jarritos pineapple soda.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/jarrito-pineapple-DP5HXHK91PEA8"),
    favorite: false,
  },
  {
    id: "1MNMXMZPCZH1T",
    name: "Jarrito Fruit Punch",
    category: "Drinks",
    price: 3.5,
    image: asset("jarritos-green.jpg"),
    badge: "Jarrito",
    description: "Jarritos fruit punch soda.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/jarrito-fruit-punch-1MNMXMZPCZH1T"),
    favorite: false,
  },
  {
    id: "RAJYBH48NXV2T",
    name: "Mundet Apple Soda",
    category: "Drinks",
    price: 2,
    image: asset("jarritos-green.jpg"),
    badge: "Cold",
    description: "Mundet apple soda.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/mundet-apple-soda-RAJYBH48NXV2T"),
    favorite: false,
  },
  {
    id: "YQNTN3GZ1MHZ6",
    name: "Jarrito Mandarin",
    category: "Drinks",
    price: 3.5,
    image: asset("jarritos-green.jpg"),
    badge: "Jarrito",
    description: "Jarritos mandarin soda.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/jarrito-mandarin-YQNTN3GZ1MHZ6"),
    favorite: true,
  },
  {
    id: "034GCR1G8PBVG",
    name: "Diet",
    category: "Drinks",
    price: 2,
    image: asset("jarritos-green.jpg"),
    badge: "Cold",
    description: "Diet soda.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/diet-034GCR1G8PBVG"),
    favorite: false,
  },
  {
    id: "BZ7PNWR9K6WQT",
    name: "Dr. Pepper",
    category: "Drinks",
    price: 2,
    image: asset("jarritos-green.jpg"),
    badge: "Cold",
    description: "Dr. Pepper.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/dr-pepper-BZ7PNWR9K6WQT"),
    favorite: false,
  },
  {
    id: "9Y9S9P35SX64R",
    name: "Jarritos Lime",
    category: "Drinks",
    price: 3.5,
    image: asset("jarritos-green.jpg"),
    badge: "Jarrito",
    description: "Jarritos lime soda.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/jarritos-lime-9Y9S9P35SX64R"),
    favorite: false,
  },
  {
    id: "AVPB8ZVBQY0K8",
    name: "Jarrito Tamarindo",
    category: "Drinks",
    price: 3.5,
    image: asset("jarritos-green.jpg"),
    badge: "Unavailable",
    description: "Jarritos tamarind soda.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/jarrito-tamarindo-AVPB8ZVBQY0K8"),
    available: false,
    favorite: false,
  },
  {
    id: "YN4EFVV716146",
    name: "Jarrito Grape Fruit",
    category: "Drinks",
    price: 3.5,
    image: asset("jarritos-green.jpg"),
    badge: "Jarrito",
    description: "Jarritos grapefruit soda.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/jarrito-grape-fruit-YN4EFVV716146"),
    favorite: false,
  },
  {
    id: "ZMFBRWXT41AZE",
    name: "Tree Leches",
    category: "Postre Desserts",
    price: 5,
    image: asset("tacos-hero.jpg"),
    badge: "Dessert",
    description: "Tres leches dessert.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/tree-leches-ZMFBRWXT41AZE"),
    favorite: false,
  },
  {
    id: "P3Z0R6SPCRBWA",
    name: "Chocolate Tres Leches",
    category: "Postre Desserts",
    price: 5,
    image: asset("tacos-hero.jpg"),
    badge: "Dessert",
    description: "Chocolate tres leches dessert.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/chocolate-tres-leches-P3Z0R6SPCRBWA"),
    favorite: false,
  },
  {
    id: "275Q2V6B3N9K2",
    name: "Tamal de Pollo",
    category: "Tamales",
    price: 3.99,
    image: asset("tacos-hero.jpg"),
    badge: "Unavailable",
    description: "Corn dough masa filled with chicken in green salsa.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/tamal-de-pollo-275Q2V6B3N9K2"),
    available: false,
    favorite: false,
  },
  {
    id: "CYDNA637NYNVE",
    name: "Tamal de Puerco",
    category: "Tamales",
    price: 3.99,
    image: asset("tacos-hero.jpg"),
    badge: "Unavailable",
    description: "Corn dough masa filled with pork in red salsa.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/tamal-de-puerco-CYDNA637NYNVE"),
    available: false,
    favorite: false,
  },
  {
    id: "G5M056QNVV9GR",
    name: "Tamal de Fresa",
    category: "Tamales",
    price: 3.49,
    image: asset("tacos-hero.jpg"),
    badge: "Unavailable",
    description: "Corn sweet red dough masa filled with raisin.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/tamal-de-fresa-G5M056QNVV9GR"),
    available: false,
    favorite: false,
  },
  {
    id: "X6CXMAXA4T60M",
    name: "Tamal de Pina",
    category: "Tamales",
    price: 3.49,
    image: asset("tacos-hero.jpg"),
    badge: "Unavailable",
    description: "Corn sweet yellow dough masa filled with raisin.",
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/tamal-de-pina-X6CXMAXA4T60M"),
    available: false,
    favorite: false,
  },
  {
    id: "7X42EFQGNEGK0",
    name: "Sope de Asada",
    category: "Sopes",
    price: 5.99,
    image: asset("quesadilla-table.jpg"),
    badge: "Unavailable",
    description: "Thick corn tortilla spread with beans, steak, lettuce, sour cream, pico de gallo, and cotija cheese.",
    options: quesadillaOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/sope-de-asada-7X42EFQGNEGK0"),
    available: false,
    favorite: false,
  },
  {
    id: "FE5KACTCFFDAT",
    name: "Sope de AlPastor",
    category: "Sopes",
    price: 5.99,
    image: asset("quesadilla-table.jpg"),
    badge: "Unavailable",
    description: "Thick corn tortilla spread with beans, season pork, lettuce, sour cream, pico de gallo, and cotija cheese.",
    options: quesadillaOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/sope-de-alpastor-FE5KACTCFFDAT"),
    available: false,
    favorite: false,
  },
  {
    id: "E54PFWDTPZEDE",
    name: "Sope de Chorizo",
    category: "Sopes",
    price: 5.99,
    image: asset("quesadilla-table.jpg"),
    badge: "Unavailable",
    description: "Thick corn tortilla spread with beans, Mexican sausage, lettuce, sour cream, pico de gallo, and cotija cheese.",
    options: quesadillaOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/sope-de-chorizo-E54PFWDTPZEDE"),
    available: false,
    favorite: false,
  },
  {
    id: "5BTB0VDHS2C96",
    name: "Sope de Pollo",
    category: "Sopes",
    price: 5.99,
    image: asset("quesadilla-table.jpg"),
    badge: "Unavailable",
    description: "Thick corn tortilla spread with beans, chicken, lettuce, sour cream, pico de gallo, and cotija cheese.",
    options: quesadillaOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/sope-de-pollo-5BTB0VDHS2C96"),
    available: false,
    favorite: false,
  },
  {
    id: "QSBH5BKGNYF20",
    name: "Sope de Lengua",
    category: "Sopes",
    price: 5.99,
    image: asset("quesadilla-table.jpg"),
    badge: "Unavailable",
    description: "Thick corn tortilla spread with beans, beef tongue, lettuce, sour cream, pico de gallo, and cotija cheese.",
    options: quesadillaOptions,
    orderUrl: cloverItem("jrs-tacos-saint-peters.cloveronline.com/menu/sope-de-lengua-QSBH5BKGNYF20"),
    available: false,
    favorite: false,
  },
];

const offers = [
  {
    eyebrow: "Truck Favorite",
    title: "A St. Peters taco truck for any taco night.",
    copy: "Real Clover pricing is live here: street tacos, burritos, nachos, quesadillas, drinks, desserts, tamales, and sopes.",
    action: "See the menu",
    icon: Flame,
  },
  {
    eyebrow: "Pickup",
    title: "Order online through Clover.",
    copy: "Pickup ordering is enabled for the Saint Peters location, with secure checkout handled by Clover.",
    action: "Order on Clover",
    icon: Sparkles,
  },
  {
    eyebrow: "Hours",
    title: "Tacos near St. Peters, Thursday through Saturday.",
    copy: "Clover lists pickup hours from 10:30 AM to 7:30 PM on Thursday, Friday, and Saturday.",
    action: "See pickup info",
    icon: Truck,
  },
];

const reviews = [
  "Online ordering powered by Clover",
  "Pickup: Thu-Sat, 10:30am-7:30pm",
  "Saint Peters, MO",
];

const googleReviewCards = [
  {
    name: "Jimmie Miller",
    meta: "Local Guide",
    quote: "The most excellent tacos and quesadillas in the area. Family owned and they are friendly.",
    tag: "Tacos + quesadillas",
  },
  {
    name: "Blake Eastwood",
    meta: "6 months ago",
    quote: "BEST. TRUCK. EVER. JR's and his food truck crew are super awesome.",
    tag: "Food truck crew",
  },
  {
    name: "Patty S",
    meta: "8 months ago",
    quote: "I wish I could find a Mexican restaurant with steak tacos this good.",
    tag: "Steak tacos",
  },
];

const localSearchCards = [
  {
    title: "Taco truck in St. Peters",
    copy: "Juniors Tacos serves authentic Mexican street tacos, burritos, quesadillas, nachos, tamales, sopes, desserts, and Jarritos for St. Peters pickup.",
  },
  {
    title: "Tacos near me",
    copy: "If you are near St. Peters, St. Charles, Cottleville, or the west St. Louis area, use the live tracker to find the truck or order pickup through Clover.",
  },
  {
    title: "Best taco truck energy",
    copy: "Customers call out the steak tacos, quesadillas, friendly family service, and fast food-truck experience in Google reviews.",
  },
];

const languageStorageKey = "juniors-tacos-language";

const spanishCopy = {
  "Juniors Tacos | St. Louis Food Truck": "Juniors Tacos | Food truck en St. Louis",
  "Juniors Tacos is a St. Louis Mexican food truck serving street tacos, burritos, quesadillas, nachos, desserts, drinks, and catering.":
    "Juniors Tacos es un food truck mexicano en St. Louis que sirve tacos, burritos, quesadillas, nachos, postres, bebidas y catering.",
  Menu: "Menú",
  Offers: "Promos",
  Pickup: "Recoger",
  Order: "Ordenar",
  Story: "Historia",
  "Primary navigation": "Navegación principal",
  "Site sections": "Secciones del sitio",
  "Open navigation": "Abrir navegación",
  "Close navigation": "Cerrar navegación",
  "Jr's Tacos logo": "Logo de Jr's Tacos",
  "Switch site language to Spanish": "Cambiar el sitio a español",
  "Switch site language to English": "Cambiar el sitio a inglés",
  "Language toggle": "Selector de idioma",
  "Saint Peters": "Saint Peters",
  "Order now": "Ordenar ahora",
  "Authentic Mexican food truck": "Food truck mexicano auténtico",
  "Real Clover menu prices for tacos, burritos, quesadillas, supreme nachos, sweet tres leches, tamales, sopes, and cold Jarritos in Saint Peters.":
    "Precios reales del menú de Clover para tacos, burritos, quesadillas, nachos supreme, tres leches, tamales, sopes y Jarritos fríos en Saint Peters.",
  "Explore menu": "Ver menú",
  "Pickup info": "Info para recoger",
  "Online pickup through Clover: Thu-Sat, 10:30am-7:30pm":
    "Recoge tu orden por Clover: jue-sab, 10:30am-7:30pm",
  "Featured taco plate": "Plato destacado de tacos",
  "Two tacos on a black plate with lime": "Dos tacos en un plato negro con limon",
  "Quick order": "Orden rápida",
  "Tacos, nachos, Jarritos. Done.": "Tacos, nachos y Jarritos. Listo.",
  "Open Clover": "Abrir Clover",
  "Catch the truck this week.": "Encuentra el truck esta semana.",
  "Order online": "Ordenar en línea",
  "Owner admin preview": "Vista previa del admin",
  "Location Schedule Admin": "Admin del horario de ubicaciones",
  "Type or dictate the weekly stops, review the draft, then publish the schedule into the public pickup cards.":
    "Escribe o dicta las paradas de la semana, revisa el borrador y publica el horario en las tarjetas publicas.",
  "Weekly update": "Actualizacion semanal",
  "Tuesday at O'Fallon Brewery 11am-2pm": "Martes en O'Fallon Brewery 11am-2pm",
  "Backend admin passcode": "Codigo de admin del backend",
  "Required for shared live publishing": "Necesario para publicar cambios compartidos",
  Dictate: "Dictar",
  "Stop listening": "Dejar de escuchar",
  "Generate draft": "Generar borrador",
  Review: "Revisar",
  "Draft stops": "Paradas del borrador",
  "Add stop": "Agregar parada",
  Day: "Dia",
  Date: "Fecha",
  Time: "Hora",
  Place: "Lugar",
  Address: "Direccion",
  Note: "Nota",
  "No draft yet.": "Todavia no hay borrador.",
  "Schedule Published": "Horario publicado",
  "Publishing...": "Publicando...",
  "Publish schedule": "Publicar horario",
  "Reset default": "Restablecer",
  "Ready to draft a weekly location update.": "Listo para crear el borrador semanal.",
  "Listening for a schedule update...": "Escuchando una actualizacion del horario...",
  "Dictation added. Generate a draft when ready.": "Dictado agregado. Genera el borrador cuando estes listo.",
  "Dictation stopped before a schedule update was captured.":
    "El dictado se detuvo antes de capturar una actualizacion.",
  "Add a schedule update before generating a draft.": "Agrega una actualizacion antes de generar un borrador.",
  "Building a draft schedule...": "Creando el borrador del horario...",
  "Draft ready from schedule parser. Review before publishing.":
    "Borrador listo desde el parser del horario. Revisalo antes de publicar.",
  "Draft ready from the local parser. Review before publishing.":
    "Borrador listo desde el parser local. Revisalo antes de publicar.",
  "Manual stop added to the draft.": "Parada manual agregada al borrador.",
  "Stop removed from the draft.": "Parada eliminada del borrador.",
  "Generate or add at least one stop before publishing.":
    "Genera o agrega al menos una parada antes de publicar.",
  "Published in this browser. Add the backend admin passcode to publish shared live updates.":
    "Publicado en este navegador. Agrega el codigo de admin para publicar cambios compartidos.",
  "The shared backend did not accept this schedule yet.":
    "El backend compartido todavia no acepto este horario.",
  "Published. The shared live pickup schedule has been updated.":
    "Publicado. El horario compartido para recoger ya fue actualizado.",
  "Published in this browser. Shared backend publishing is not available in local preview.":
    "Publicado en este navegador. La publicacion compartida no esta disponible en la vista local.",
  "Schedule reset to the default Clover pickup information.":
    "El horario se restablecio con la informacion predeterminada de Clover.",
  "Voice dictation is not available in this browser.": "El dictado por voz no esta disponible en este navegador.",
  "New stop": "Nueva parada",
  "Address TBD": "Direccion por confirmar",
  "Time TBD": "Hora por confirmar",
  "Street tacos": "Tacos callejeros",
  "Nachos supreme": "Nachos supreme",
  "Tres leches": "Tres leches",
  Catering: "Catering",
  "Fresh drops": "Novedades",
  "Big-deal energy, taco truck soul.": "Gran energia, alma de taco truck.",
  "Start with street tacos, share the nachos, chase it with Jarritos, then keep the schedule close for the next stop.":
    "Empieza con tacos callejeros, comparte los nachos, acompanalo con Jarritos y ten el horario a la mano para la proxima parada.",
  "Truck Favorite": "Favorito del truck",
  "Taco night without waiting for Tuesday.": "Noche de tacos sin esperar al martes.",
  "Real Clover pricing is live here: tacos, burritos, nachos, quesadillas, drinks, desserts, tamales, and sopes.":
    "Aqui estan los precios reales de Clover: tacos, burritos, nachos, quesadillas, bebidas, postres, tamales y sopes.",
  "See the menu": "Ver el menu",
  "Order online through Clover.": "Ordena en linea por Clover.",
  "Pickup ordering is enabled for the Saint Peters location, with secure checkout handled by Clover.":
    "La orden para recoger esta disponible en Saint Peters, con pago seguro por Clover.",
  "Order on Clover": "Ordenar en Clover",
  Hours: "Horario",
  "Thursday through Saturday.": "Jueves a sabado.",
  "Clover lists pickup hours from 10:30 AM to 7:30 PM on Thursday, Friday, and Saturday.":
    "Clover muestra horario para recoger de 10:30 AM a 7:30 PM jueves, viernes y sabado.",
  "See pickup info": "Ver info para recoger",
  "Featured food": "Comida destacada",
  "Cut quesadilla with salsa": "Quesadilla cortada con salsa",
  "Made for the window": "Hecho para la ventanilla",
  "Hot griddles, melty cheese, salsa on standby.": "Comal caliente, queso derretido y salsa lista.",
  "From the first lime squeeze to the last chip, Juniors keeps the good stuff simple: warm tortillas, loaded trays, cold drinks, and enough flavor to make a quick stop feel like a plan.":
    "Desde el primer toque de limon hasta el ultimo totopo, Juniors mantiene lo bueno simple: tortillas calientes, charolas cargadas, bebidas frias y sabor para convertir una parada rapida en plan.",
  "From the first lime squeeze to the last chip, Juniors keeps the good stuff simple: warm tortillas, loaded trays, cold drinks, and enough flavor to make tacos near St. Peters feel like a plan.":
    "Desde el primer toque de limon hasta el ultimo totopo, Juniors mantiene lo bueno simple: tortillas calientes, charolas cargadas, bebidas frias y bastante sabor para que los tacos cerca de St. Peters se sientan como un plan.",
  Mexican: "Mexicana",
  "Thu-Sat": "Jue-Sab",
  "Clover pickup": "Recoger por Clover",
  "The menu": "El menú",
  "Pick your lane. Then add the good stuff.": "Elige tu antojo. Luego agrega lo bueno.",
  "Real Clover menu items, prices, options, and availability. Final checkout happens on Clover.":
    "Artículos, precios, opciones y disponibilidad reales de Clover. El pago final se hace en Clover.",
  "Menu categories": "Categorías del menú",
  Popular: "Populares",
  Tacos: "Tacos",
  Burritos: "Burritos",
  Nachos: "Nachos",
  Quesadillas: "Quesadillas",
  Drinks: "Bebidas",
  "Postre Desserts": "Postres",
  Tamales: "Tamales",
  Sopes: "Sopes",
  "Search menu": "Buscar en el menú",
  Unavailable: "No disponible",
  Shareable: "Para compartir",
  Snack: "Botana",
  "Street corn": "Elote",
  Cheesy: "Con queso",
  Veggie: "Vegetariana",
  Cold: "Fria",
  Jarrito: "Jarrito",
  Dessert: "Postre",
  "Order this item on Clover": "Ordenar este artículo en Clover",
  "Currently unavailable on Clover": "Actualmente no disponible en Clover",
  "No menu items matched that search.": "Ningun articulo coincide con esa busqueda.",
  Add: "Agregar",
  Remove: "Quitar",
  options: "opciones",
  more: "mas",
  "Order tray": "Charola de orden",
  "Your tray": "Tu charola",
  item: "artículo",
  items: "artículos",
  "Ready when you are": "Lista cuando tu quieras",
  "Add available favorites here for an estimate, then place the real order on Clover.":
    "Agrega favoritos disponibles para una estimacion y luego haz la orden real en Clover.",
  "Estimated total": "Total estimado",
  "Place order on Clover": "Hacer orden en Clover",
  "Neighborhood flavor": "Sabor de barrio",
  "Authentic Mexican street food, with the kind of logo you remember.":
    "Comida callejera mexicana autentica, con un logo que se recuerda.",
  "Juniors Tacos is listed as a Saint Peters Mexican food truck with pickup ordering through Clover. This page keeps the browsing friendly while every order button sends customers to Clover for the real item, options, availability, payment, and pickup timing.":
    "Juniors Tacos aparece como food truck mexicano en Saint Peters con ordenes para recoger por Clover. Esta pagina facilita explorar el menu y cada boton de orden lleva a Clover para articulos, opciones, disponibilidad, pago y hora de recogida reales.",
  "Online ordering powered by Clover": "Ordenes en linea con Clover",
  "Pickup: Thu-Sat, 10:30am-7:30pm": "Recoger: jue-sab, 10:30am-7:30pm",
  "Jr's Tacos smiling green logo": "Logo verde sonriente de Jr's Tacos",
  "Browse here. Checkout safely on Clover.": "Explora aqui. Paga seguro en Clover.",
  "The local tray gives a quick estimate, then Clover handles modifiers, scheduled pickup, Apple Pay, Google Pay, gift cards, and card checkout.":
    "La charola local da una estimacion rapida; Clover maneja modificadores, recogida programada, Apple Pay, Google Pay, tarjetas de regalo y pago con tarjeta.",
  "Order pickup": "Ordenar para recoger",
  "Facebook page": "Pagina de Facebook",
  "Saint Peters Mexican food truck": "Food truck mexicano en Saint Peters",
  "Clover menu": "Menu de Clover",
  "St. Louis Food Trucks": "Food trucks de St. Louis",
  Thu: "Jue",
  Fri: "Vie",
  Sat: "Sab",
  Mon: "Lun",
  Tue: "Mar",
  Wed: "Mie",
  Sun: "Dom",
  Online: "En linea",
  "Pickup ordering": "Orden para recoger",
  "Clover checkout": "Pago en Clover",
  "Pickup only. Delivery and curbside are currently disabled in Clover.":
    "Solo para recoger. Entrega y curbside estan desactivados en Clover.",
  "Online ordering": "Orden en línea",
  "10 min lead": "10 min de espera",
  "No onion": "Sin cebolla",
  "No cilantro": "Sin cilantro",
  "Add cheese +$0.25": "Agregar queso +$0.25",
  "Add sour cream +$0.25": "Agregar crema +$0.25",
  "Extra meat +$1.99": "Carne extra +$1.99",
  "No beans": "Sin frijoles",
  "No corn": "Sin elote",
  "No sour cream": "Sin crema",
  "No pico": "Sin pico",
  Fajitas: "Fajitas",
  Rice: "Arroz",
  "Extra sour cream +$0.49": "Crema extra +$0.49",
  "Extra cheese +$0.99": "Queso extra +$0.99",
  "Add asada +$1.99": "Agregar asada +$1.99",
  "Add al pastor +$1.99": "Agregar al pastor +$1.99",
  "Add ground beef +$1.99": "Agregar carne molida +$1.99",
  "Add lengua +$2.49": "Agregar lengua +$2.49",
  "Add chicken +$1.99": "Agregar pollo +$1.99",
  "Add chorizo +$1.99": "Agregar chorizo +$1.99",
  "No jalapenos": "Sin jalapenos",
  "No ground beef": "Sin carne molida",
  "No fajitas": "Sin fajitas",
  "No lettuce": "Sin lechuga",
  "No pico de gallo": "Sin pico de gallo",
  "Extra cheese +$1.00": "Queso extra +$1.00",
  "Mexican mayo": "Mayo mexicana",
  "Cotija cheese": "Queso cotija",
  "Crushed Takis": "Takis triturados",
  Lime: "Limon",
  "Pollo Taco Chicken": "Taco de pollo",
  "El Pastor Taco Season Pork": "Taco al pastor",
  "Lengua Taco Beef Tongue": "Taco de lengua",
  "Asada Taco Steak": "Taco de asada",
  "Chorizo Taco Season Sausage": "Taco de chorizo",
  "Asada/Steak Burrito JR.": "Burrito JR. de asada",
  "Pollo/Chicken Burrito JR.": "Burrito JR. de pollo",
  "Al Pastor/Season Pork Burrito JR.": "Burrito JR. al pastor",
  "Chorizo/Season Sausage Burrito JR.": "Burrito JR. de chorizo",
  "Lengua/Beef Tongue Burrito JR.": "Burrito JR. de lengua",
  "Nachos Supreme": "Nachos Supreme",
  "Dori Nachos": "Dori Nachos",
  "Dori Nachos Supreme": "Dori Nachos Supreme",
  "Mexican Street Corn": "Elote mexicano",
  "Pollo Quesadilla Chicken": "Quesadilla de pollo",
  "Al Pastor Quesadilla Season Pork": "Quesadilla al pastor",
  "Lengua Quesadilla Beef Tongue": "Quesadilla de lengua",
  "Asada Quesadilla Steak": "Quesadilla de asada",
  "Chorizo/Season Sausage Quesadilla": "Quesadilla de chorizo",
  "Cheese Quesadilla": "Quesadilla de queso",
  "Veggie Quesadilla": "Quesadilla vegetariana",
  Coca: "Coca",
  "Agua/Water": "Agua",
  Orange: "Naranja",
  Sprite: "Sprite",
  "Jarrito Pineapple": "Jarrito de pina",
  "Jarrito Fruit Punch": "Jarrito fruit punch",
  "Mundet Apple Soda": "Refresco Mundet de manzana",
  "Jarrito Mandarin": "Jarrito de mandarina",
  Diet: "Diet",
  "Dr. Pepper": "Dr. Pepper",
  "Jarritos Lime": "Jarritos de limon",
  "Jarrito Tamarindo": "Jarrito de tamarindo",
  "Jarrito Grape Fruit": "Jarrito de toronja",
  "Tree Leches": "Tres leches",
  "Chocolate Tres Leches": "Tres leches de chocolate",
  "Tamal de Pollo": "Tamal de pollo",
  "Tamal de Puerco": "Tamal de puerco",
  "Tamal de Fresa": "Tamal de fresa",
  "Tamal de Pina": "Tamal de pina",
  "Sope de Asada": "Sope de asada",
  "Sope de AlPastor": "Sope de al pastor",
  "Sope de Chorizo": "Sope de chorizo",
  "Sope de Pollo": "Sope de pollo",
  "Sope de Lengua": "Sope de lengua",
  "Corn tortilla, chicken, topped off with onion and cilantro.":
    "Tortilla de maiz con pollo, cebolla y cilantro.",
  "Corn tortilla, season pork topped off with onion and cilantro.":
    "Tortilla de maiz con cerdo al pastor, cebolla y cilantro.",
  "Corn tortilla, beef tongue, topped off with onion and cilantro.":
    "Tortilla de maiz con lengua, cebolla y cilantro.",
  "Corn tortilla, grilled steak, topped off with onion and cilantro.":
    "Tortilla de maiz con asada, cebolla y cilantro.",
  "Corn tortilla, chorizo season pork sausage, topped off with onion and cilantro.":
    "Tortilla de maiz con chorizo, cebolla y cilantro.",
  "12 inch flour tortilla with asada, melted cheese, fajitas, rice, pico, corn, black beans, and sour cream.":
    "Tortilla de harina de 12 pulgadas con asada, queso derretido, fajitas, arroz, pico, elote, frijoles negros y crema.",
  "12 inch flour tortilla with chicken, melted cheese, fajitas, rice, pico, corn, black beans, and sour cream.":
    "Tortilla de harina de 12 pulgadas con pollo, queso derretido, fajitas, arroz, pico, elote, frijoles negros y crema.",
  "12 inch flour tortilla with al pastor, melted cheese, fajitas, rice, pico, corn, black beans, and sour cream.":
    "Tortilla de harina de 12 pulgadas con al pastor, queso derretido, fajitas, arroz, pico, elote, frijoles negros y crema.",
  "12 inch flour tortilla with chorizo, melted cheese, fajitas, rice, pico, corn, black beans, and sour cream.":
    "Tortilla de harina de 12 pulgadas con chorizo, queso derretido, fajitas, arroz, pico, elote, frijoles negros y crema.",
  "12 inch flour tortilla with beef tongue, melted cheese, fajitas, rice, pico, corn, black beans, and sour cream.":
    "Tortilla de harina de 12 pulgadas con lengua, queso derretido, fajitas, arroz, pico, elote, frijoles negros y crema.",
  "Corn tortilla chips, cheese sauce, ground beef, pico de gallo, corn, black beans, sour cream, and jalapenos.":
    "Totopos de maiz con queso, carne molida, pico de gallo, elote, frijoles negros, crema y jalapenos.",
  "Nacho chips topped off with cheese sauce and jalapenos.":
    "Chips para nachos cubiertos con queso y jalapenos.",
  "Dorito chips, cheese sauce, ground beef, pico de gallo, corn, black beans, sour cream, and jalapenos.":
    "Doritos con queso, carne molida, pico de gallo, elote, frijoles negros, crema y jalapenos.",
  "Tortilla chips with cheese sauce and jalapenos.": "Totopos con queso y jalapenos.",
  "Mexican street corn with mayo, cotija cheese, crushed Takis, and lime options.":
    "Elote mexicano con mayo, queso cotija, Takis triturados y opcion de limon.",
  "Flour tortilla with chicken, melted cheese, and fajitas. Lettuce, pico de gallo, and sour cream on the side.":
    "Tortilla de harina con pollo, queso derretido y fajitas. Lechuga, pico de gallo y crema al lado.",
  "Flour tortilla with season pork, melted cheese, and fajitas. Lettuce, pico de gallo, and sour cream on the side.":
    "Tortilla de harina con cerdo al pastor, queso derretido y fajitas. Lechuga, pico de gallo y crema al lado.",
  "Flour tortilla with beef tongue, melted cheese, and fajitas. Lettuce, pico de gallo, and sour cream on the side.":
    "Tortilla de harina con lengua, queso derretido y fajitas. Lechuga, pico de gallo y crema al lado.",
  "Flour tortilla with steak, melted cheese, and fajitas. Lettuce, pico de gallo, and sour cream outside.":
    "Tortilla de harina con asada, queso derretido y fajitas. Lechuga, pico de gallo y crema afuera.",
  "Flour tortilla with chorizo, melted cheese, and fajitas. Lettuce, pico de gallo, and sour cream on the side.":
    "Tortilla de harina con chorizo, queso derretido y fajitas. Lechuga, pico de gallo y crema al lado.",
  "Flour tortilla with cheese.": "Tortilla de harina con queso.",
  "Flour tortilla with melted cheese, fajitas, black beans, and corn. Lettuce, pico, and sour cream outside.":
    "Tortilla de harina con queso derretido, fajitas, frijoles negros y elote. Lechuga, pico y crema afuera.",
  "Classic Coca-Cola.": "Coca-Cola clasica.",
  "Bottled water.": "Agua embotellada.",
  "Orange drink.": "Bebida de naranja.",
  "Jarritos pineapple soda.": "Refresco Jarritos de pina.",
  "Jarritos fruit punch soda.": "Refresco Jarritos fruit punch.",
  "Mundet apple soda.": "Refresco Mundet de manzana.",
  "Jarritos mandarin soda.": "Refresco Jarritos de mandarina.",
  "Diet soda.": "Refresco diet.",
  "Jarritos lime soda.": "Refresco Jarritos de limon.",
  "Jarritos tamarind soda.": "Refresco Jarritos de tamarindo.",
  "Jarritos grapefruit soda.": "Refresco Jarritos de toronja.",
  "Tres leches dessert.": "Postre de tres leches.",
  "Chocolate tres leches dessert.": "Postre de tres leches de chocolate.",
  "Corn dough masa filled with chicken in green salsa.": "Masa de maiz rellena de pollo en salsa verde.",
  "Corn dough masa filled with pork in red salsa.": "Masa de maiz rellena de puerco en salsa roja.",
  "Corn sweet red dough masa filled with raisin.": "Masa dulce roja de maiz rellena con pasa.",
  "Corn sweet yellow dough masa filled with raisin.": "Masa dulce amarilla de maiz rellena con pasa.",
  "Thick corn tortilla spread with beans, steak, lettuce, sour cream, pico de gallo, and cotija cheese.":
    "Tortilla gruesa de maiz con frijoles, asada, lechuga, crema, pico de gallo y queso cotija.",
  "Thick corn tortilla spread with beans, season pork, lettuce, sour cream, pico de gallo, and cotija cheese.":
    "Tortilla gruesa de maiz con frijoles, al pastor, lechuga, crema, pico de gallo y queso cotija.",
  "Thick corn tortilla spread with beans, Mexican sausage, lettuce, sour cream, pico de gallo, and cotija cheese.":
    "Tortilla gruesa de maiz con frijoles, chorizo mexicano, lechuga, crema, pico de gallo y queso cotija.",
  "Thick corn tortilla spread with beans, chicken, lettuce, sour cream, pico de gallo, and cotija cheese.":
    "Tortilla gruesa de maiz con frijoles, pollo, lechuga, crema, pico de gallo y queso cotija.",
  "Thick corn tortilla spread with beans, beef tongue, lettuce, sour cream, pico de gallo, and cotija cheese.":
    "Tortilla gruesa de maiz con frijoles, lengua, lechuga, crema, pico de gallo y queso cotija.",
  "Juniors Tacos | Taco Truck in St. Peters, MO": "Juniors Tacos | Taco truck en St. Peters, MO",
  "Juniors Tacos is a taco truck in St. Peters, MO serving street tacos, burritos, quesadillas, nachos, Jarritos, desserts, pickup, and catering.":
    "Juniors Tacos es un taco truck en St. Peters, MO que sirve tacos callejeros, burritos, quesadillas, nachos, Jarritos, postres, pedidos para recoger y catering.",
  "Taco Truck Catering in St. Peters, MO | Juniors Tacos":
    "Catering de taco truck en St. Peters, MO | Juniors Tacos",
  "Book Juniors Tacos for taco truck catering in St. Peters, St. Charles County, and the St. Louis area. Request street tacos, nachos, quesadillas, Jarritos, and private event service.":
    "Reserva Juniors Tacos para catering de taco truck en St. Peters, el condado de St. Charles y el area de St. Louis. Pide tacos callejeros, nachos, quesadillas, Jarritos y servicio para eventos privados.",
  "Juniors Tacos Reviews | Best Taco Truck Notes in St. Peters":
    "Resenas de Juniors Tacos | Comentarios del taco truck en St. Peters",
  "Read customer reviews for Juniors Tacos, a St. Peters taco truck serving street tacos, quesadillas, nachos, burritos, and catering around the St. Louis area.":
    "Lee resenas de clientes de Juniors Tacos, un taco truck de St. Peters que sirve tacos callejeros, quesadillas, nachos, burritos y catering en el area de St. Louis.",
  Reviews: "Resenas",
  Tracker: "Rastreador",
  "A St. Peters taco truck for any taco night.": "Un taco truck de St. Peters para cualquier noche de tacos.",
  "Real Clover pricing is live here: street tacos, burritos, nachos, quesadillas, drinks, desserts, tamales, and sopes.":
    "Aqui estan los precios reales de Clover: tacos callejeros, burritos, nachos, quesadillas, bebidas, postres, tamales y sopes.",
  "Tacos near St. Peters, Thursday through Saturday.": "Tacos cerca de St. Peters, de jueves a sabado.",
  "Saint Peters, MO": "Saint Peters, MO",
  "Local Guide": "Guia local",
  "The most excellent tacos and quesadillas in the area. Family owned and they are friendly.":
    "Los mejores tacos y quesadillas del area. Es un negocio familiar y son muy amables.",
  "Tacos + quesadillas": "Tacos + quesadillas",
  "6 months ago": "Hace 6 meses",
  "BEST. TRUCK. EVER. JR's and his food truck crew are super awesome.":
    "El mejor truck de todos. JR y su equipo del food truck son increibles.",
  "Food truck crew": "Equipo del food truck",
  "8 months ago": "Hace 8 meses",
  "I wish I could find a Mexican restaurant with steak tacos this good.":
    "Ojala encontrara un restaurante mexicano con tacos de asada tan buenos.",
  "Steak tacos": "Tacos de asada",
  "Taco truck in St. Peters": "Taco truck en St. Peters",
  "Juniors Tacos serves authentic Mexican street tacos, burritos, quesadillas, nachos, tamales, sopes, desserts, and Jarritos for St. Peters pickup.":
    "Juniors Tacos sirve tacos callejeros mexicanos, burritos, quesadillas, nachos, tamales, sopes, postres y Jarritos para recoger en St. Peters.",
  "Tacos near me": "Tacos cerca de mi",
  "If you are near St. Peters, St. Charles, Cottleville, or the west St. Louis area, use the live tracker to find the truck or order pickup through Clover.":
    "Si estas cerca de St. Peters, St. Charles, Cottleville o el oeste de St. Louis, usa el rastreador en vivo para encontrar el truck u ordenar por Clover.",
  "Best taco truck energy": "La mejor energia de taco truck",
  "Customers call out the steak tacos, quesadillas, friendly family service, and fast food-truck experience in Google reviews.":
    "En Google los clientes destacan los tacos de asada, las quesadillas, el servicio familiar amable y la experiencia rapida de food truck.",
  "Corporate Lunch": "Almuerzo corporativo",
  Birthday: "Cumpleanos",
  Wedding: "Boda",
  "School/University": "Escuela/Universidad",
  "Neighborhood / HOA": "Vecindario / HOA",
  Graduation: "Graduacion",
  Fundraiser: "Recaudacion de fondos",
  "Private Party": "Fiesta privada",
  "Truck service": "Servicio con truck",
  "Bring the window, the griddle, and the line-worthy energy to your event.":
    "Lleva la ventanilla, el comal y la energia que hace fila a tu evento.",
  "Best for offices, breweries, school nights, and community stops.":
    "Ideal para oficinas, cervecerias, noches escolares y paradas comunitarias.",
  "Taco bar": "Barra de tacos",
  "Tacos, toppings, salsas, rice, beans, chips, and drinks set up for easy serving.":
    "Tacos, toppings, salsas, arroz, frijoles, chips y bebidas preparados para servir facil.",
  "A smooth fit for meetings, birthdays, and casual receptions.":
    "Una buena opcion para reuniones, cumpleanos y recepciones casuales.",
  "Nacho table": "Mesa de nachos",
  "A shareable spread with nachos supreme, quesadillas, Jarritos, and dessert add-ons.":
    "Una mesa para compartir con nachos supreme, quesadillas, Jarritos y postres extra.",
  "Made for big snack energy without slowing down the party.":
    "Hecha para antojos grandes sin frenar la fiesta.",
  "Juniors catering": "Catering de Juniors",
  "Let Juniors cater to you.": "Deja que Juniors lleve el catering.",
  "Bring authentic Mexican street tacos, nachos, quesadillas, Jarritos, and truck-service energy to your next office lunch, party, school event, or wedding.":
    "Lleva tacos callejeros mexicanos, nachos, quesadillas, Jarritos y energia de taco truck a tu proximo almuerzo de oficina, fiesta, evento escolar o boda.",
  "Start a request": "Iniciar solicitud",
  "Loaded nachos tray": "Charola de nachos cargados",
  "Quesadilla and salsa spread": "Quesadillas y salsas",
  "Book the truck": "Reserva el truck",
  "Taco truck catering with a real St. Louis street-food feel.":
    "Catering de taco truck con sabor real de comida callejera de St. Louis.",
  "Tell the team what kind of event you are planning, how many people are coming, and where the truck or setup needs to be. The request form below keeps the first message organized so booking starts clean.":
    "Cuéntale al equipo que tipo de evento planeas, cuantas personas vendran y donde debe estar el truck o la preparacion. El formulario organiza el primer mensaje para que la reserva empiece clara.",
  Truck: "Truck",
  "On-site service": "Servicio en sitio",
  Events: "Eventos",
  "Private and public": "Privados y publicos",
  "Tacos, nachos, drinks": "Tacos, nachos, bebidas",
  "Catering styles": "Estilos de catering",
  "Choose the setup that fits the day.": "Elige el formato que va con tu dia.",
  "Use these as a starting point. The form lets you add the details that make the event yours.":
    "Usa estas opciones como punto de partida. El formulario te deja agregar los detalles que hacen tuyo el evento.",
  "Request catering": "Solicitar catering",
  "Send the team the essentials.": "Envia al equipo lo esencial.",
  "The form collects the booking details first. If the shared backend is connected, it saves the request; otherwise it prepares a clean text message and StreetFoodFinder handoff.":
    "El formulario primero reune los detalles de la reserva. Si el backend compartido esta conectado, guarda la solicitud; si no, prepara un mensaje de texto claro y un pase a StreetFoodFinder.",
  "Prefer direct contact?": "Prefieres contacto directo?",
  "Why are you looking for a food truck?": "Para que necesitas un food truck?",
  Name: "Nombre",
  "Your name": "Tu nombre",
  Phone: "Telefono",
  Email: "Correo",
  "you@example.com": "tu@ejemplo.com",
  Guests: "Invitados",
  "Event location": "Lugar del evento",
  "Venue, address, or neighborhood": "Salon, direccion o vecindario",
  "Service style": "Estilo de servicio",
  "Anything else?": "Algo mas?",
  "Tell us about parking, timing, dietary notes, or special requests.":
    "Cuéntanos sobre estacionamiento, horarios, notas de dieta o solicitudes especiales.",
  "Sending request...": "Enviando solicitud...",
  "Sending...": "Enviando...",
  "Submit request": "Enviar solicitud",
  "Text request": "Enviar por texto",
  "Open booking page": "Abrir pagina de reservas",
  "Request sent. Juniors has your catering details.": "Solicitud enviada. Juniors ya tiene tus detalles de catering.",
  "Request details are ready. Send them by text or finish booking on StreetFoodFinder.":
    "Los detalles de la solicitud estan listos. Envialos por texto o termina la reserva en StreetFoodFinder.",
  "Google reviews": "Resenas de Google",
  "Folks find the truck once, then start planning the next stop.":
    "La gente encuentra el truck una vez y luego empieza a planear la siguiente parada.",
  "5.0 Google rating": "Calificacion 5.0 en Google",
  "21 Google reviews": "21 resenas de Google",
  "Here are a few notes people have left after grabbing tacos, quesadillas, and late-day truck food from Jr's Tacos.":
    "Aqui hay algunos comentarios de personas que probaron tacos, quesadillas y comida del truck de Jr's Tacos.",
  "Read Google reviews": "Leer resenas de Google",
  "Leave a review": "Dejar una resena",
  "What people say": "Lo que dice la gente",
  "The kind of reviews that make our day.": "El tipo de resenas que nos alegran el dia.",
  "A few favorites are pulled out here. For the newest stars, photos, and full comments, the Google listing is one tap away.":
    "Aqui destacamos algunas favoritas. Para las estrellas, fotos y comentarios mas recientes, la ficha de Google esta a un toque.",
  "Find us on Google": "Encuentranos en Google",
  "Want the full review roll? Start with the map.": "Quieres todas las resenas? Empieza con el mapa.",
  "The map keeps the address, directions, rating, and review link close by. Tap through to Google anytime for the latest comments from the people who have eaten with us.":
    "El mapa mantiene cerca la direccion, indicaciones, calificacion y enlace de resenas. Entra a Google cuando quieras para ver los comentarios mas recientes.",
  "Open full Google reviews": "Abrir todas las resenas de Google",
  "Google profile": "Perfil de Google",
  "Truck tracker": "Rastreador del truck",
  "Live stops, pulled from StreetFoodFinder.": "Paradas en vivo desde StreetFoodFinder.",
  "This live window follows Jr's Tacos on StreetFoodFinder, so schedule changes, public stops, and booking details stay current without a manual homepage edit.":
    "Esta ventana sigue a Jr's Tacos en StreetFoodFinder, asi los cambios de horario, paradas publicas y detalles de reserva se mantienen actualizados sin editar la pagina principal.",
  "Open full tracker": "Abrir rastreador completo",
  "Book catering": "Reservar catering",
  "StreetFoodFinder live": "StreetFoodFinder en vivo",
  "Local taco search": "Busqueda local de tacos",
  "Looking for the best taco truck near St. Peters?": "Buscas el mejor taco truck cerca de St. Peters?",
  "Juniors Tacos keeps the essentials easy to find: current truck stops, pickup ordering, catering requests, and a menu built around authentic Mexican street-food favorites.":
    "Juniors Tacos hace facil encontrar lo esencial: paradas actuales, ordenes para recoger, solicitudes de catering y un menu de favoritos mexicanos de comida callejera.",
  "Catch the taco truck in St. Peters this week.": "Encuentra el taco truck en St. Peters esta semana.",
  "Juniors Tacos is a taco truck in St. Peters serving real Clover menu prices for street tacos, burritos, quesadillas, supreme nachos, sweet tres leches, tamales, sopes, and cold Jarritos.":
    "Juniors Tacos es un taco truck en St. Peters con precios reales de Clover para tacos callejeros, burritos, quesadillas, nachos supreme, tres leches, tamales, sopes y Jarritos frios.",
  "Start with street tacos, share the nachos, chase it with Jarritos, then keep the live St. Peters taco truck schedule close for the next stop.":
    "Empieza con tacos callejeros, comparte los nachos, acompanalo con Jarritos y ten cerca el horario en vivo del taco truck de St. Peters para la siguiente parada.",
  "Real taco truck menu items, prices, options, and availability. Final checkout happens on Clover.":
    "Articulos, precios, opciones y disponibilidad reales del taco truck. El pago final se hace en Clover.",
  "from Juniors Tacos taco truck": "del taco truck Juniors Tacos",
  "Authentic Mexican street food from a St. Peters taco truck.":
    "Comida callejera mexicana autentica de un taco truck de St. Peters.",
  "Juniors Tacos is listed as a Saint Peters Mexican food truck with pickup ordering through Clover. This page keeps taco truck browsing friendly while every order button sends customers to Clover for the real item, options, availability, payment, and pickup timing.":
    "Juniors Tacos aparece como food truck mexicano en Saint Peters con ordenes para recoger por Clover. Esta pagina facilita explorar el taco truck y cada boton de orden lleva a Clover para articulos, opciones, disponibilidad, pago y horario de recogida reales.",
  "Google buzz": "Comentarios de Google",
  "Five-star notes for tacos near St. Peters.": "Comentarios de cinco estrellas para tacos cerca de St. Peters.",
  "A quick taste of the Google feedback for anyone comparing taco trucks in St. Peters. The full reviews page links visitors to the current Google listing.":
    "Una muestra rapida de los comentarios de Google para quien compara taco trucks en St. Peters. La pagina completa de resenas enlaza a la ficha actual de Google.",
  "See reviews": "Ver resenas",
  "Open Google": "Abrir Google",
  "Bring the taco truck to the party.": "Lleva el taco truck a la fiesta.",
  "Use the catering page to collect event details, pick a service style, and hand the request to the Juniors team cleanly.":
    "Usa la pagina de catering para reunir detalles del evento, elegir un estilo de servicio y enviar la solicitud al equipo de Juniors de forma clara.",
  "Start catering request": "Iniciar solicitud de catering",
  "Taco truck": "Taco truck",
  "St. Peters, MO": "St. Peters, MO",
  "Tacos near St. Peters, priced from the Clover menu.": "Tacos cerca de St. Peters con precios del menu de Clover.",
};

function translateCopy(value, language) {
  if (!value || language === "en") {
    return value;
  }

  return spanishCopy[value] || value;
}

function loadStoredLanguage() {
  if (typeof window === "undefined") {
    return "en";
  }

  return window.localStorage.getItem(languageStorageKey) === "es" ? "es" : "en";
}

function formatPrice(price) {
  return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

function getFilteredItems(category) {
  if (category === "Popular") {
    return menuItems.filter((item) => item.favorite);
  }

  return menuItems.filter((item) => item.category === category);
}

const scheduleStorageKey = "juniors-tacos-location-schedule";
const sampleSchedulePrompt =
  "Tuesday at O'Fallon Brewery 11am-2pm\nThursday at Saint Peters City Hall 5pm-8pm\nSaturday at Farmers Market 10am-3pm";

function loadStoredSchedule() {
  if (typeof window === "undefined") {
    return defaultSchedule;
  }

  try {
    const storedSchedule = JSON.parse(window.localStorage.getItem(scheduleStorageKey) || "null");
    return Array.isArray(storedSchedule) && storedSchedule.length ? sanitizeSchedule(storedSchedule) : defaultSchedule;
  } catch {
    return defaultSchedule;
  }
}

function formatScheduleDate(date, language = "en") {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(language === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" }).format(
    parsedDate,
  );
}

const cateringEventTypes = [
  "Corporate Lunch",
  "Birthday",
  "Wedding",
  "School/University",
  "Neighborhood / HOA",
  "Graduation",
  "Fundraiser",
  "Private Party",
];

const cateringPackages = [
  {
    title: "Truck service",
    copy: "Bring the window, the griddle, and the line-worthy energy to your event.",
    detail: "Best for offices, breweries, school nights, and community stops.",
  },
  {
    title: "Taco bar",
    copy: "Tacos, toppings, salsas, rice, beans, chips, and drinks set up for easy serving.",
    detail: "A smooth fit for meetings, birthdays, and casual receptions.",
  },
  {
    title: "Nacho table",
    copy: "A shareable spread with nachos supreme, quesadillas, Jarritos, and dessert add-ons.",
    detail: "Made for big snack energy without slowing down the party.",
  },
];

const initialCateringForm = {
  eventType: "Corporate Lunch",
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  guests: "",
  location: "",
  serviceStyle: "Truck service",
  message: "",
};

function buildCateringSummary(formData) {
  return [
    "Jr's Tacos catering request",
    `Event type: ${formData.eventType}`,
    `Name: ${formData.name}`,
    `Phone: ${formData.phone}`,
    `Email: ${formData.email || "Not provided"}`,
    `Date/time: ${formData.date || "TBD"} ${formData.time || ""}`.trim(),
    `Guests: ${formData.guests || "TBD"}`,
    `Location: ${formData.location || "TBD"}`,
    `Service style: ${formData.serviceStyle}`,
    `Notes: ${formData.message || "None"}`,
  ].join("\n");
}

function CateringPage({ t }) {
  const [formData, setFormData] = useState(initialCateringForm);
  const [formStatus, setFormStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");
  const requestSummary = buildCateringSummary(formData);
  const encodedSummary = encodeURIComponent(requestSummary);

  const updateFormData = (field, value) => {
    setFormStatus("idle");
    setFormMessage("");
    setFormData((currentFormData) => ({ ...currentFormData, [field]: value }));
  };

  const submitCateringRequest = async (event) => {
    event.preventDefault();

    const cleanFormData = {
      ...formData,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      guests: formData.guests.trim(),
      location: formData.location.trim(),
      message: formData.message.trim(),
    };

    setFormStatus("sending");
    window.localStorage.setItem(
      "juniors-tacos-catering-request",
      JSON.stringify({ ...cleanFormData, submittedAt: new Date().toISOString() }),
    );

    try {
      const response = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanFormData),
      });
      const data = await response.json();

      if (response.ok && data.persisted) {
        setFormStatus("sent");
        setFormMessage("Request sent. Juniors has your catering details.");
        return;
      }

      setFormStatus("ready");
      setFormMessage("Request details are ready. Send them by text or finish booking on StreetFoodFinder.");
    } catch {
      setFormStatus("ready");
      setFormMessage("Request details are ready. Send them by text or finish booking on StreetFoodFinder.");
    }
  };

  return (
    <main className="catering-page" id="top">
      <section className="catering-hero" aria-labelledby="catering-page-title">
        <div className="catering-hero-bg" aria-hidden="true">
          <img src={asset("tacos-hero.jpg")} alt="" />
        </div>
        <div className="catering-hero-copy reveal">
          <p className="eyebrow">{t("Juniors catering")}</p>
          <h1 id="catering-page-title">{t("Let Juniors cater to you.")}</h1>
          <p>
            {t(
              "Bring authentic Mexican street tacos, nachos, quesadillas, Jarritos, and truck-service energy to your next office lunch, party, school event, or wedding.",
            )}
          </p>
          <div className="catering-actions">
            <a className="primary-btn" href="#catering-request">
              {t("Start a request")}
              <ArrowRight size={18} />
            </a>
            <a className="secondary-btn" href={sources.streetFoodFinder} target="_blank" rel="noreferrer">
              StreetFoodFinder
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="catering-intro">
        <div className="catering-food-stack reveal">
          <img src={asset("nachos-share.jpg")} alt={t("Loaded nachos tray")} />
          <img src={asset("quesadilla-table.jpg")} alt={t("Quesadilla and salsa spread")} />
        </div>
        <div className="catering-intro-copy reveal">
          <p className="eyebrow">{t("Book the truck")}</p>
          <h2>{t("Taco truck catering with a real St. Louis street-food feel.")}</h2>
          <p>
            {t(
              "Tell the team what kind of event you are planning, how many people are coming, and where the truck or setup needs to be. The request form below keeps the first message organized so booking starts clean.",
            )}
          </p>
          <div className="catering-stat-row">
            <span>
              <strong>{t("Truck")}</strong>
              {t("On-site service")}
            </span>
            <span>
              <strong>{t("Menu")}</strong>
              {t("Tacos, nachos, drinks")}
            </span>
            <span>
              <strong>{t("Events")}</strong>
              {t("Private and public")}
            </span>
          </div>
        </div>
      </section>

      <section className="catering-packages" aria-labelledby="catering-packages-title">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">{t("Catering styles")}</p>
            <h2 id="catering-packages-title">{t("Choose the setup that fits the day.")}</h2>
          </div>
          <p>{t("Use these as a starting point. The form lets you add the details that make the event yours.")}</p>
        </div>
        <div className="catering-package-grid">
          {cateringPackages.map((item) => (
            <article className="catering-package-card reveal" key={item.title}>
              <Truck size={26} />
              <h3>{t(item.title)}</h3>
              <p>{t(item.copy)}</p>
              <span>{t(item.detail)}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="catering-request-section" id="catering-request" aria-labelledby="catering-request-title">
        <div className="catering-request-copy reveal">
          <p className="eyebrow">{t("Request catering")}</p>
          <h2 id="catering-request-title">{t("Send the team the essentials.")}</h2>
          <p>
            {t(
              "The form collects the booking details first. If the shared backend is connected, it saves the request; otherwise it prepares a clean text message and StreetFoodFinder handoff.",
            )}
          </p>
          <div className="request-contact-card">
            <span>{t("Prefer direct contact?")}</span>
            <a href={`tel:${contactPhone}`}>{contactPhone.replace("+1", "")}</a>
          </div>
        </div>

        <form className="catering-form reveal" onSubmit={submitCateringRequest}>
          <fieldset>
            <legend>{t("Why are you looking for a food truck?")}</legend>
            <div className="event-type-grid">
              {cateringEventTypes.map((eventType) => (
                <label className="radio-option" key={eventType}>
                  <input
                    type="radio"
                    name="eventType"
                    value={eventType}
                    checked={formData.eventType === eventType}
                    onChange={(event) => updateFormData("eventType", event.target.value)}
                  />
                  <span>{t(eventType)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="form-grid">
            <label>
              <span>{t("Name")}</span>
              <input
                required
                value={formData.name}
                onChange={(event) => updateFormData("name", event.target.value)}
                placeholder={t("Your name")}
              />
            </label>
            <label>
              <span>{t("Phone")}</span>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(event) => updateFormData("phone", event.target.value)}
                placeholder="(636) 555-0123"
              />
            </label>
            <label>
              <span>{t("Email")}</span>
              <input
                type="email"
                value={formData.email}
                onChange={(event) => updateFormData("email", event.target.value)}
                placeholder={t("you@example.com")}
              />
            </label>
            <label>
              <span>{t("Guests")}</span>
              <input
                inputMode="numeric"
                value={formData.guests}
                onChange={(event) => updateFormData("guests", event.target.value)}
                placeholder="75"
              />
            </label>
            <label>
              <span>{t("Date")}</span>
              <input type="date" value={formData.date} onChange={(event) => updateFormData("date", event.target.value)} />
            </label>
            <label>
              <span>{t("Time")}</span>
              <input type="time" value={formData.time} onChange={(event) => updateFormData("time", event.target.value)} />
            </label>
            <label className="wide-field">
              <span>{t("Event location")}</span>
              <input
                value={formData.location}
                onChange={(event) => updateFormData("location", event.target.value)}
                placeholder={t("Venue, address, or neighborhood")}
              />
            </label>
            <label className="wide-field">
              <span>{t("Service style")}</span>
              <select value={formData.serviceStyle} onChange={(event) => updateFormData("serviceStyle", event.target.value)}>
                {cateringPackages.map((item) => (
                  <option value={item.title} key={item.title}>
                    {t(item.title)}
                  </option>
                ))}
              </select>
            </label>
            <label className="wide-field">
              <span>{t("Anything else?")}</span>
              <textarea
                value={formData.message}
                onChange={(event) => updateFormData("message", event.target.value)}
                rows={5}
                placeholder={t("Tell us about parking, timing, dietary notes, or special requests.")}
              />
            </label>
          </div>

          <div className={`form-status ${formStatus !== "idle" ? "is-visible" : ""}`} aria-live="polite">
            {formStatus === "sending" ? t("Sending request...") : t(formMessage)}
          </div>

          <div className="catering-form-actions">
            <button className="primary-btn" type="submit" disabled={formStatus === "sending"}>
              {formStatus === "sending" ? t("Sending...") : t("Submit request")}
              <ArrowRight size={18} />
            </button>
            <a className="secondary-btn" href={`sms:${contactPhone}?&body=${encodedSummary}`}>
              {t("Text request")}
              <Navigation size={18} />
            </a>
            <a className="secondary-btn" href={sources.streetFoodFinder} target="_blank" rel="noreferrer">
              {t("Open booking page")}
              <ExternalLink size={18} />
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}

function GoogleStars({ label = "5 star rating" }) {
  return (
    <span className="google-stars" aria-label={label}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star size={18} fill="currentColor" key={index} />
      ))}
    </span>
  );
}

function GoogleReviewCard({ review, t }) {
  return (
    <article className="google-review-card">
      <div className="google-review-card-head">
        <div className="review-avatar" aria-hidden="true">
          {review.name.slice(0, 1)}
        </div>
        <div>
          <h3>{review.name}</h3>
          <span>{t(review.meta)}</span>
        </div>
      </div>
      <GoogleStars />
      <p>{t(review.quote)}</p>
      <strong>{t(review.tag)}</strong>
    </article>
  );
}

function ReviewsPage({ t }) {
  return (
    <main className="reviews-page" id="top">
      <section className="reviews-hero" aria-labelledby="reviews-page-title">
        <div className="reviews-hero-bg" aria-hidden="true">
          <img src={asset("quesadilla-table.jpg")} alt="" />
        </div>
        <div className="reviews-hero-copy reveal">
          <p className="eyebrow">{t("Google reviews")}</p>
          <h1 id="reviews-page-title">{t("Folks find the truck once, then start planning the next stop.")}</h1>
          <div className="reviews-rating-line">
            <strong>5.0</strong>
            <GoogleStars label={t("5.0 Google rating")} />
            <span>{t("21 Google reviews")}</span>
          </div>
          <p>
            {t(
              "Here are a few notes people have left after grabbing tacos, quesadillas, and late-day truck food from Jr's Tacos.",
            )}
          </p>
          <div className="catering-actions">
            <a className="primary-btn" href={sources.googleReviews} target="_blank" rel="noreferrer">
              {t("Read Google reviews")}
              <ExternalLink size={18} />
            </a>
            <a className="secondary-btn" href={sources.googleReviews} target="_blank" rel="noreferrer">
              {t("Leave a review")}
              <Star size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="reviews-feature-section" aria-labelledby="reviews-feature-title">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">{t("What people say")}</p>
            <h2 id="reviews-feature-title">{t("The kind of reviews that make our day.")}</h2>
          </div>
          <p>
            {t(
              "A few favorites are pulled out here. For the newest stars, photos, and full comments, the Google listing is one tap away.",
            )}
          </p>
        </div>
        <div className="google-review-grid">
          {googleReviewCards.map((review) => (
            <GoogleReviewCard review={review} t={t} key={review.name} />
          ))}
        </div>
      </section>

      <section className="google-live-section" aria-labelledby="google-live-title">
        <div className="google-live-copy reveal">
          <p className="eyebrow">{t("Find us on Google")}</p>
          <h2 id="google-live-title">{t("Want the full review roll? Start with the map.")}</h2>
          <p>
            {t(
              "The map keeps the address, directions, rating, and review link close by. Tap through to Google anytime for the latest comments from the people who have eaten with us.",
            )}
          </p>
          <a className="primary-btn" href={sources.googleReviews} target="_blank" rel="noreferrer">
            {t("Open full Google reviews")}
            <ExternalLink size={18} />
          </a>
        </div>
        <div className="google-map-shell reveal">
          <div className="tracker-frame-toolbar">
            <span>{t("Google profile")}</span>
            <strong>Jr's Tacos</strong>
          </div>
          <iframe
            title="Jr's Tacos Google Maps listing"
            src={sources.googleMapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}

function FullSite() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pathName, setPathName] = useState(() => (typeof window === "undefined" ? "/" : window.location.pathname));
  const [language, setLanguage] = useState(loadStoredLanguage);
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [cart, setCart] = useState({});
  const [query, setQuery] = useState("");
  const [scheduleStops, setScheduleStops] = useState(loadStoredSchedule);
  const [adminText, setAdminText] = useState(sampleSchedulePrompt);
  const [draftSchedule, setDraftSchedule] = useState([]);
  const [adminStatus, setAdminStatus] = useState("Ready to draft a weekly location update.");
  const [adminToken, setAdminToken] = useState("");
  const [publishState, setPublishState] = useState("idle");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const isSpanish = language === "es";
  const routePath = pathName.replace(/\/$/, "") || "/";
  const isCateringPage = routePath === "/catering";
  const isReviewsPage = routePath === "/reviews";
  const isSubPage = isCateringPage || isReviewsPage;
  const t = (value) => translateCopy(value, language);
  const toggleLanguage = () => setLanguage((currentLanguage) => (currentLanguage === "es" ? "en" : "es"));
  const resolveNavHref = (href) => (href.startsWith("#") && isSubPage ? `/${href}` : href);

  const filteredMenu = useMemo(() => {
    const base = getFilteredItems(activeCategory);
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      return base;
    }

    return base.filter((item) => {
      const translatedValues = [
        item.name,
        item.description,
        item.category,
        translateCopy(item.name, language),
        translateCopy(item.description, language),
        translateCopy(item.category, language),
        ...(item.options || []).flatMap((option) => [option, translateCopy(option, language)]),
      ];

      return translatedValues.join(" ").toLowerCase().includes(trimmedQuery);
    });
  }, [activeCategory, language, query]);

  const cartLines = useMemo(() => {
    return Object.entries(cart)
      .map(([id, quantity]) => {
        const item = menuItems.find((menuItem) => menuItem.id === id);
        return item ? { ...item, quantity } : null;
      })
      .filter(Boolean);
  }, [cart]);

  const totalItems = cartLines.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartLines.reduce((sum, item) => sum + item.quantity * item.price, 0);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/schedule")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (isMounted && data?.schedule?.length) {
          const hasLocalSchedule = Boolean(window.localStorage.getItem(scheduleStorageKey));

          if (data.source !== "default" || !hasLocalSchedule) {
            setScheduleStops(sanitizeSchedule(data.schedule));
          }
        }
      })
      .catch(() => {
        // The Vite dev server does not run Vercel Functions. Local schedule state keeps previews usable.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    const updatePathName = () => setPathName(window.location.pathname);

    window.addEventListener("popstate", updatePathName);
    return () => window.removeEventListener("popstate", updatePathName);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView();
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [isCateringPage]);

  useEffect(() => {
    const seoPage = seoPages[routePath] || seoPages["/"];
    const title = translateCopy(seoPage.title, language);
    const description = translateCopy(seoPage.description, language);
    const canonicalUrl = getCanonicalUrl(seoPage.canonicalPath);

    document.documentElement.lang = isSpanish ? "es" : "en";
    document.title = title;
    window.localStorage.setItem(languageStorageKey, language);

    upsertHeadElement('meta[name="description"]', () => document.createElement("meta"), {
      name: "description",
      content: description,
    });
    upsertHeadElement('meta[name="robots"]', () => document.createElement("meta"), {
      name: "robots",
      content: "index, follow, max-image-preview:large",
    });
    upsertHeadElement('link[rel="canonical"]', () => document.createElement("link"), {
      rel: "canonical",
      href: canonicalUrl,
    });
    upsertHeadElement('meta[property="og:title"]', () => document.createElement("meta"), {
      property: "og:title",
      content: title,
    });
    upsertHeadElement('meta[property="og:description"]', () => document.createElement("meta"), {
      property: "og:description",
      content: description,
    });
    upsertHeadElement('meta[property="og:type"]', () => document.createElement("meta"), {
      property: "og:type",
      content: "website",
    });
    upsertHeadElement('meta[property="og:site_name"]', () => document.createElement("meta"), {
      property: "og:site_name",
      content: "Juniors Tacos",
    });
    upsertHeadElement('meta[property="og:url"]', () => document.createElement("meta"), {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertHeadElement('meta[property="og:image"]', () => document.createElement("meta"), {
      property: "og:image",
      content: seoImage,
    });
    upsertHeadElement('meta[property="og:image:alt"]', () => document.createElement("meta"), {
      property: "og:image:alt",
      content: "Two street tacos from Juniors Tacos in St. Peters, Missouri",
    });
    upsertHeadElement('meta[name="twitter:card"]', () => document.createElement("meta"), {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertHeadElement('meta[name="twitter:title"]', () => document.createElement("meta"), {
      name: "twitter:title",
      content: title,
    });
    upsertHeadElement('meta[name="twitter:description"]', () => document.createElement("meta"), {
      name: "twitter:description",
      content: description,
    });
    upsertHeadElement('meta[name="twitter:image"]', () => document.createElement("meta"), {
      name: "twitter:image",
      content: seoImage,
    });

    const structuredDataScript = upsertHeadElement(
      'script#site-structured-data',
      () => document.createElement("script"),
      {
        id: "site-structured-data",
        type: "application/ld+json",
      },
    );
    structuredDataScript.textContent = JSON.stringify(buildStructuredData(routePath, language));
  }, [isSpanish, language, routePath]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      if (!isSubPage) {
        const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        heroTimeline
          .from(".nav-shell", { yPercent: -120, duration: 0.85 })
          .from(".hero-kicker", { autoAlpha: 0, y: 24, duration: 0.7 }, "-=0.28")
          .from(".hero-word", { autoAlpha: 0, yPercent: 110, rotate: 3, stagger: 0.08, duration: 0.9 }, "-=0.35")
          .from(".hero-copy, .hero-actions, .hero-note", { autoAlpha: 0, y: 28, stagger: 0.12, duration: 0.72 }, "-=0.42")
          .from(".hero-plate", { autoAlpha: 0, scale: 0.82, rotate: -9, duration: 0.9 }, "-=0.82")
          .from(".order-card", { autoAlpha: 0, x: 50, duration: 0.75 }, "-=0.62");

        gsap.to(".hero-plate", {
          y: -34,
          rotate: 4,
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".floating-chip", {
          y: "random(-18, 18)",
          x: "random(-12, 12)",
          rotate: "random(-12, 12)",
          repeat: -1,
          yoyo: true,
          duration: "random(2.4, 4.6)",
          ease: "sine.inOut",
          stagger: 0.18,
        });
      }

      ScrollTrigger.batch(".reveal", {
        start: "top 84%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.09,
          });
        },
      });

      gsap.utils.toArray(".parallax-img").forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      if (!isSubPage) {
        gsap.to(".marquee-track", {
          xPercent: -50,
          repeat: -1,
          duration: 24,
          ease: "none",
        });
      }
    }, rootRef);

    return () => context.revert();
  }, [isSubPage]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || isSubPage) {
      return;
    }

    gsap.fromTo(
      ".menu-card",
      { autoAlpha: 0, y: 24, scale: 0.985 },
      { autoAlpha: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.45, ease: "power2.out" },
    );
  }, [activeCategory, isSubPage, query]);

  const closeMenu = () => setMenuOpen(false);

  const updateCart = (id, delta) => {
    setCart((currentCart) => {
      const quantity = Math.max(0, (currentCart[id] || 0) + delta);
      const nextCart = { ...currentCart };

      if (quantity === 0) {
        delete nextCart[id];
      } else {
        nextCart[id] = quantity;
      }

      return nextCart;
    });
  };

  const buildScheduleDraft = async () => {
    const trimmedText = adminText.trim();
    setPublishState("idle");

    if (!trimmedText) {
      setAdminStatus("Add a schedule update before generating a draft.");
      return;
    }

    setAdminStatus("Building a draft schedule...");

    try {
      const response = await fetch("/api/parse-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmedText }),
      });

      if (response.ok) {
        const data = await response.json();
        const generatedSchedule = sanitizeSchedule(data.schedule);

        if (generatedSchedule.length) {
          setDraftSchedule(generatedSchedule);
          setAdminStatus(`Draft ready from ${data.source || "schedule parser"}. Review before publishing.`);
          return;
        }
      }
    } catch {
      // Vite's dev server does not run Vercel Functions, so the local parser keeps the prototype usable.
    }

    const localDraft = parseScheduleText(trimmedText);
    setDraftSchedule(localDraft);
    setAdminStatus("Draft ready from the local parser. Review before publishing.");
  };

  const updateDraftStop = (id, field, value) => {
    setPublishState("idle");
    setDraftSchedule((currentDraft) =>
      currentDraft.map((stop) => (stop.id === id ? { ...stop, [field]: value } : stop)),
    );
  };

  const addDraftStop = () => {
    setPublishState("idle");
    setDraftSchedule((currentDraft) => [
      ...currentDraft,
      {
        id: `manual-${Date.now()}`,
        day: "Day",
        date: "",
        place: "New stop",
        address: "Address TBD",
        time: "Time TBD",
        note: "",
      },
    ]);
    setAdminStatus("Manual stop added to the draft.");
  };

  const removeDraftStop = (id) => {
    setPublishState("idle");
    setDraftSchedule((currentDraft) => currentDraft.filter((stop) => stop.id !== id));
    setAdminStatus("Stop removed from the draft.");
  };

  const publishDraftSchedule = async () => {
    const cleanDraft = sanitizeSchedule(draftSchedule);

    if (!cleanDraft.length) {
      setPublishState("idle");
      setAdminStatus("Generate or add at least one stop before publishing.");
      return;
    }

    setPublishState("publishing");
    setScheduleStops(cleanDraft);
    window.localStorage.setItem(scheduleStorageKey, JSON.stringify(cleanDraft));

    if (!adminToken.trim()) {
      setPublishState("idle");
      setAdminStatus("Published in this browser. Add the backend admin passcode to publish shared live updates.");
      return;
    }

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": adminToken.trim(),
        },
        body: JSON.stringify({ schedule: cleanDraft }),
      });
      const data = await response.json();

      if (!response.ok) {
        setPublishState("idle");
        setAdminStatus(data.error || "The shared backend did not accept this schedule yet.");
        return;
      }

      setPublishState("success");
      setAdminStatus("Published. The shared live pickup schedule has been updated.");
    } catch {
      setPublishState("idle");
      setAdminStatus("Published in this browser. Shared backend publishing is not available in local preview.");
    }
  };

  const resetSchedule = () => {
    setPublishState("idle");
    setScheduleStops(defaultSchedule);
    setDraftSchedule([]);
    window.localStorage.removeItem(scheduleStorageKey);
    setAdminStatus("Schedule reset to the default Clover pickup information.");
  };

  const dictateSchedule = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setAdminStatus("Voice dictation is not available in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = isSpanish ? "es-MX" : "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setAdminStatus("Listening for a schedule update...");
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript || "")
        .join(" ")
        .trim();

      if (transcript) {
        setPublishState("idle");
        setAdminText((currentText) => `${currentText.trim()}\n${transcript}`.trim());
        setAdminStatus("Dictation added. Generate a draft when ready.");
      }
    };

    recognition.onerror = () => {
      setAdminStatus("Dictation stopped before a schedule update was captured.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="site-shell" ref={rootRef}>
      <nav className="nav-shell" aria-label={t("Primary navigation")}>
        <a className="brand-mark" href={isSubPage ? "/" : "#top"} onClick={closeMenu}>
          <img src={asset("jr-taco-logo.jpg")} alt={t("Jr's Tacos logo")} />
          <span>
            Juniors <strong>Tacos</strong>
          </span>
        </a>

        <div className="nav-links" aria-label={t("Site sections")}>
          {navItems.map(([label, href]) => (
            <a href={resolveNavHref(href)} key={label}>
              {t(label)}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className={`language-switch ${isSpanish ? "is-spanish" : "is-english"}`}
            type="button"
            aria-label={isSpanish ? t("Switch site language to English") : t("Switch site language to Spanish")}
            aria-pressed={isSpanish}
            title={isSpanish ? t("Switch site language to English") : t("Switch site language to Spanish")}
            onClick={toggleLanguage}
          >
            <span className="language-switch-option language-switch-en">EN</span>
            <span className="language-switch-option language-switch-es">ES</span>
            <span className="language-switch-thumb" aria-hidden="true" />
          </button>
          <a className="ghost-pill" href={sources.cloverMenu} target="_blank" rel="noreferrer">
            <MapPin size={17} />
            {t("Saint Peters")}
          </a>
          <a className="order-pill" href={sources.cloverMenu} target="_blank" rel="noreferrer">
            <ShoppingBag size={17} />
            {t("Order now")}
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? t("Close navigation") : t("Open navigation")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`mobile-drawer ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-drawer-inner">
          {navItems.map(([label, href]) => (
            <a href={resolveNavHref(href)} key={label} onClick={closeMenu}>
              {t(label)}
              <ChevronRight size={20} />
            </a>
          ))}
          <a href={sources.facebook} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Facebook
            <ExternalLink size={19} />
          </a>
        </div>
      </div>

      {isCateringPage ? (
        <CateringPage t={t} />
      ) : isReviewsPage ? (
        <ReviewsPage t={t} />
      ) : (
        <main id="top">
          <section className="hero">
            <div className="hero-bg" aria-hidden="true">
              <div className="gradient-wash" />
              <span className="floating-chip chip-one" />
              <span className="floating-chip chip-two" />
              <span className="floating-chip chip-three" />
              <span className="floating-chip chip-four" />
            </div>

            <div className="hero-content">
              <div className="hero-copy-block">
                <p className="hero-kicker">
                  <span />
                  {t("Authentic Mexican food truck")}
                </p>
                <h1 className="hero-title" aria-label="Juniors Tacos">
                  <span className="hero-line">
                    <span className="hero-word">Juniors</span>
                  </span>
                  <span className="hero-line accent-line">
                    <span className="hero-word">Tacos</span>
                  </span>
                </h1>
                <p className="hero-copy">
                  {t(
                    "Juniors Tacos is a taco truck in St. Peters serving real Clover menu prices for street tacos, burritos, quesadillas, supreme nachos, sweet tres leches, tamales, sopes, and cold Jarritos.",
                  )}
                </p>
                <div className="hero-actions">
                  <a className="primary-btn" href="#menu">
                    {t("Explore menu")}
                    <ArrowRight size={18} />
                  </a>
                  <a className="secondary-btn" href="#schedule">
                    {t("Pickup info")}
                    <Navigation size={18} />
                  </a>
                </div>
                <div className="hero-note">
                  <Star size={18} />
                  <span>{t("Online pickup through Clover: Thu-Sat, 10:30am-7:30pm")}</span>
                </div>
              </div>

              <div className="hero-plate" aria-label={t("Featured taco plate")}>
                <div className="plate-image">
                  <img src={asset("hero-items.png")} alt={t("Two tacos on a black plate with lime")} />
                </div>
                <div className="plate-badge">
                  <span>{t("Tacos")}</span>
                  <strong>$4</strong>
                </div>
              </div>

              <aside className="order-card">
                <div>
                  <p className="eyebrow">{t("Quick order")}</p>
                  <h2>{t("Tacos, nachos, Jarritos. Done.")}</h2>
                </div>
                <a href={sources.cloverMenu} className="order-card-link" target="_blank" rel="noreferrer">
                  {t("Open Clover")}
                  <ExternalLink size={18} />
                </a>
              </aside>
            </div>
          </section>

          <section className="pickup-video-section" id="schedule" aria-labelledby="schedule-title">
            <video className="pickup-video-bg" autoPlay muted loop playsInline aria-hidden="true">
              <source src={asset("hero-video.mp4")} type="video/mp4" />
            </video>
            <div className="pickup-video-overlay" aria-hidden="true" />
            <div className="truck-finder reveal">
              <div className="finder-copy">
                <p className="eyebrow">{t("Pickup info")}</p>
                <h2 id="schedule-title">{t("Catch the taco truck in St. Peters this week.")}</h2>
              </div>
              <div className="finder-list">
                {scheduleStops.map((stop) => (
                  <article className="stop-card" key={`${stop.day}-${stop.place}`}>
                    <div>
                      <span>{[t(stop.day), formatScheduleDate(stop.date, language)].filter(Boolean).join(" ")}</span>
                      <h3>{t(stop.place)}</h3>
                      <p>{t(stop.address)}</p>
                      {stop.note ? <em>{t(stop.note)}</em> : null}
                    </div>
                    <strong>
                      <Clock size={16} />
                      {t(stop.time)}
                    </strong>
                  </article>
                ))}
              </div>
              <a className="finder-link" href={sources.cloverMenu} target="_blank" rel="noreferrer">
                {t("Order online")}
                <ExternalLink size={18} />
              </a>
            </div>
          </section>

          <section className="tracker-section" id="tracker" aria-labelledby="tracker-title">
            <div className="tracker-copy reveal">
              <p className="eyebrow">{t("Truck tracker")}</p>
              <h2 id="tracker-title">{t("Live stops, pulled from StreetFoodFinder.")}</h2>
              <p>
                {t(
                  "This live window follows Jr's Tacos on StreetFoodFinder, so schedule changes, public stops, and booking details stay current without a manual homepage edit.",
                )}
              </p>
              <div className="tracker-actions">
                <a className="primary-btn" href={sources.streetFoodFinder} target="_blank" rel="noreferrer">
                  {t("Open full tracker")}
                  <ExternalLink size={18} />
                </a>
                <a className="secondary-btn" href="/catering">
                  {t("Book catering")}
                  <Truck size={18} />
                </a>
              </div>
            </div>

            <div className="tracker-frame-shell reveal">
              <div className="tracker-frame-toolbar">
                <span>{t("StreetFoodFinder live")}</span>
                <strong>Jr's Tacos</strong>
              </div>
              <iframe
                title="Jr's Tacos live StreetFoodFinder schedule"
                src={sources.streetFoodFinder}
                allow="geolocation"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>

          <section className="local-search-section" aria-labelledby="local-search-title">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">{t("Local taco search")}</p>
                <h2 id="local-search-title">{t("Looking for the best taco truck near St. Peters?")}</h2>
              </div>
              <p>
                {t(
                  "Juniors Tacos keeps the essentials easy to find: current truck stops, pickup ordering, catering requests, and a menu built around authentic Mexican street-food favorites.",
                )}
              </p>
            </div>
            <div className="local-search-grid">
              {localSearchCards.map((item) => (
                <article className="local-search-card reveal" key={item.title}>
                  <MapPin size={22} />
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.copy)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="admin-section" id="admin" aria-labelledby="admin-title">
            <div className="admin-shell">
              <div className="section-heading admin-heading">
                <div>
                  <p className="eyebrow">{t("Owner admin preview")}</p>
                  <h2 id="admin-title">{t("Location Schedule Admin")}</h2>
                </div>
                <p>{t("Type or dictate the weekly stops, review the draft, then publish the schedule into the public pickup cards.")}</p>
              </div>

              <div className="admin-grid">
                <div className="admin-panel">
                  <label className="admin-field">
                    <span>{t("Weekly update")}</span>
                    <textarea
                      value={adminText}
                      onChange={(event) => setAdminText(event.target.value)}
                      rows={8}
                      placeholder={t("Tuesday at O'Fallon Brewery 11am-2pm")}
                    />
                  </label>

                  <label className="admin-field compact-field">
                    <span>{t("Backend admin passcode")}</span>
                    <input
                      type="password"
                      value={adminToken}
                      onChange={(event) => setAdminToken(event.target.value)}
                      placeholder={t("Required for shared live publishing")}
                    />
                  </label>

                  <div className="admin-actions">
                    <button className="secondary-btn" type="button" onClick={dictateSchedule}>
                      <Mic size={18} />
                      {isListening ? t("Stop listening") : t("Dictate")}
                    </button>
                    <button className="primary-btn" type="button" onClick={buildScheduleDraft}>
                      <Sparkles size={18} />
                      {t("Generate draft")}
                    </button>
                  </div>

                  <p className="admin-status">{t(adminStatus)}</p>
                </div>

                <div className="admin-panel">
                  <div className="admin-panel-head">
                    <div>
                      <p className="eyebrow">{t("Review")}</p>
                      <h3>{t("Draft stops")}</h3>
                    </div>
                    <button className="secondary-btn compact-btn" type="button" onClick={addDraftStop}>
                      <Plus size={17} />
                      {t("Add stop")}
                    </button>
                  </div>

                  <div className="draft-list">
                    {draftSchedule.length ? (
                      draftSchedule.map((stop) => (
                        <article className="draft-stop" key={stop.id}>
                          <div className="draft-stop-head">
                            <strong>{t(stop.place)}</strong>
                            <button
                              type="button"
                              aria-label={`${t("Remove")} ${t(stop.place)}`}
                              onClick={() => removeDraftStop(stop.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="draft-fields">
                            <label>
                              <span>{t("Day")}</span>
                              <input
                                value={stop.day}
                                onChange={(event) => updateDraftStop(stop.id, "day", event.target.value)}
                              />
                            </label>
                            <label>
                              <span>{t("Date")}</span>
                              <input
                                type="date"
                                value={stop.date}
                                onChange={(event) => updateDraftStop(stop.id, "date", event.target.value)}
                              />
                            </label>
                            <label>
                              <span>{t("Time")}</span>
                              <input
                                value={stop.time}
                                onChange={(event) => updateDraftStop(stop.id, "time", event.target.value)}
                              />
                            </label>
                            <label>
                              <span>{t("Place")}</span>
                              <input
                                value={stop.place}
                                onChange={(event) => updateDraftStop(stop.id, "place", event.target.value)}
                              />
                            </label>
                            <label className="wide-field">
                              <span>{t("Address")}</span>
                              <input
                                value={stop.address}
                                onChange={(event) => updateDraftStop(stop.id, "address", event.target.value)}
                              />
                            </label>
                            <label className="wide-field">
                              <span>{t("Note")}</span>
                              <input
                                value={stop.note}
                                onChange={(event) => updateDraftStop(stop.id, "note", event.target.value)}
                              />
                            </label>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="admin-empty">
                        <CalendarDays size={28} />
                        <span>{t("No draft yet.")}</span>
                      </div>
                    )}
                  </div>

                  <div className="admin-actions admin-actions-bottom">
                    <button
                      className={`primary-btn publish-btn ${publishState === "success" ? "is-published" : ""}`}
                      type="button"
                      onClick={publishDraftSchedule}
                      disabled={publishState === "publishing"}
                    >
                      <Save size={18} />
                      {publishState === "success"
                        ? t("Schedule Published")
                        : publishState === "publishing"
                          ? t("Publishing...")
                          : t("Publish schedule")}
                    </button>
                    <button className="secondary-btn" type="button" onClick={resetSchedule}>
                      {t("Reset default")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              {["Street tacos", "Quesadillas", "Nachos supreme", "Jarritos", "Tres leches", "Catering"].map((item) => (
                <span key={item}>{t(item)}</span>
              ))}
              {["Street tacos", "Quesadillas", "Nachos supreme", "Jarritos", "Tres leches", "Catering"].map((item) => (
                <span key={`${item}-repeat`}>{t(item)}</span>
              ))}
            </div>
          </div>

          <section className="offers-section" id="offers" aria-labelledby="offers-title">
            <div className="section-heading reveal">
              <p className="eyebrow">{t("Fresh drops")}</p>
              <h2 id="offers-title">{t("Big-deal energy, taco truck soul.")}</h2>
              <p>{t("Start with street tacos, share the nachos, chase it with Jarritos, then keep the live St. Peters taco truck schedule close for the next stop.")}</p>
            </div>

            <div className="offer-grid">
              {offers.map((offer, index) => {
                const Icon = offer.icon;
                return (
                  <article className="offer-card reveal" style={{ "--delay": `${index * 90}ms` }} key={offer.title}>
                    <div className="offer-icon">
                      <Icon size={24} />
                    </div>
                    <p>{t(offer.eyebrow)}</p>
                    <h3>{t(offer.title)}</h3>
                    <span>{t(offer.copy)}</span>
                    <a
                      href={index === 1 ? sources.cloverMenu : index === 2 ? "#schedule" : "#menu"}
                      target={index === 1 ? "_blank" : undefined}
                      rel={index === 1 ? "noreferrer" : undefined}
                    >
                      {t(offer.action)}
                      {index === 1 ? <ExternalLink size={18} /> : <ArrowRight size={18} />}
                    </a>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="feature-band" aria-label={t("Featured food")}>
            <div className="feature-media reveal">
              <img className="parallax-img" src={asset("chicken-bacon-ranch-quesdilla.png")} alt={t("Cut quesadilla with salsa")} />
            </div>
            <div className="feature-copy reveal">
              <p className="eyebrow">{t("Made for the window")}</p>
              <h2>{t("Hot griddles, melty cheese, salsa on standby.")}</h2>
              <p>{t("From the first lime squeeze to the last chip, Juniors keeps the good stuff simple: warm tortillas, loaded trays, cold drinks, and enough flavor to make tacos near St. Peters feel like a plan.")}</p>
              <div className="feature-stats">
                <span>
                  <strong>{t("Taco truck")}</strong>
                  {t("St. Peters, MO")}
                </span>
                <span>
                  <strong>{t("Thu-Sat")}</strong>
                  {t("Clover pickup")}
                </span>
                <span>
                  <strong>$4</strong>
                  {t("Street tacos")}
                </span>
              </div>
            </div>
          </section>

          <section className="menu-section" id="menu" aria-labelledby="menu-title">
            <div className="section-heading reveal">
              <p className="eyebrow">{t("The menu")}</p>
              <h2 id="menu-title">{t("Tacos near St. Peters, priced from the Clover menu.")}</h2>
              <p>{t("Real taco truck menu items, prices, options, and availability. Final checkout happens on Clover.")}</p>
            </div>

            <div className="menu-toolbar reveal">
              <div className="category-tabs" role="tablist" aria-label={t("Menu categories")}>
                {categories.map((category) => (
                  <button
                    className={activeCategory === category ? "is-active" : ""}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                    key={category}
                  >
                    {t(category)}
                  </button>
                ))}
              </div>

              <label className="menu-search">
                <Search size={18} />
                <input
                  type="search"
                  placeholder={t("Search menu")}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
            </div>

            <div className="menu-layout">
              <div className="menu-grid" aria-live="polite">
                {filteredMenu.length > 0 ? (
                  filteredMenu.map((item) => (
                    <article className={`menu-card ${item.available === false ? "is-unavailable" : ""}`} key={item.id}>
                      <div className="menu-card-image">
                        <img src={item.image} alt={`${t(item.name)} ${t("from Juniors Tacos taco truck")}`} />
                        <span>{item.available === false ? t("Unavailable") : t(item.badge)}</span>
                      </div>
                      <div className="menu-card-body">
                        <div className="menu-card-title">
                          <div>
                            <p>{t(item.category)}</p>
                            <h3>{t(item.name)}</h3>
                          </div>
                          <strong>{formatPrice(item.price)}</strong>
                        </div>
                        <p>{t(item.description)}</p>
                        {item.options?.length ? (
                          <div className="option-list" aria-label={`${t(item.name)} ${t("options")}`}>
                            {item.options.slice(0, 5).map((option) => (
                              <span key={option}>{t(option)}</span>
                            ))}
                            {item.options.length > 5 ? (
                              <span>
                                +{item.options.length - 5} {t("more")}
                              </span>
                            ) : null}
                          </div>
                        ) : null}
                        <div className="quantity-row">
                          <button
                            type="button"
                            aria-label={`${t("Remove")} ${t(item.name)}`}
                            onClick={() => updateCart(item.id, -1)}
                            disabled={!cart[item.id] || item.available === false}
                          >
                            <Minus size={16} />
                          </button>
                          <span>{cart[item.id] || 0}</span>
                          <button
                            type="button"
                            aria-label={`${t("Add")} ${t(item.name)}`}
                            onClick={() => updateCart(item.id, 1)}
                            disabled={item.available === false}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        {item.available === false ? (
                          <span className="item-order-link disabled">{t("Currently unavailable on Clover")}</span>
                        ) : (
                          <a className="item-order-link" href={item.orderUrl} target="_blank" rel="noreferrer">
                            {t("Order this item on Clover")}
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="empty-menu">
                    <Utensils size={30} />
                    <p>{t("No menu items matched that search.")}</p>
                  </div>
                )}
              </div>

              <aside className="cart-panel reveal" aria-label={t("Order tray")}>
                <div className="cart-panel-head">
                  <div>
                    <p className="eyebrow">{t("Your tray")}</p>
                    <h3>{totalItems ? `${totalItems} ${t(totalItems > 1 ? "items" : "item")}` : t("Ready when you are")}</h3>
                  </div>
                  <ShoppingBag size={24} />
                </div>

                {cartLines.length > 0 ? (
                  <div className="cart-lines">
                    {cartLines.map((item) => (
                      <div className="cart-line" key={item.id}>
                        <span>
                          {item.quantity}x {t(item.name)}
                        </span>
                        <strong>{formatPrice(item.quantity * item.price)}</strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="cart-empty">{t("Add available favorites here for an estimate, then place the real order on Clover.")}</p>
                )}

                <div className="cart-total">
                  <span>{t("Estimated total")}</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <a className="primary-btn full-btn" href={sources.cloverMenu} target="_blank" rel="noreferrer">
                  {t("Place order on Clover")}
                  <ExternalLink size={18} />
                </a>
              </aside>
            </div>
          </section>

          <section className="story-section" id="story">
            <div className="story-copy reveal">
              <p className="eyebrow">{t("Neighborhood flavor")}</p>
              <h2>{t("Authentic Mexican street food from a St. Peters taco truck.")}</h2>
              <p>{t("Juniors Tacos is listed as a Saint Peters Mexican food truck with pickup ordering through Clover. This page keeps taco truck browsing friendly while every order button sends customers to Clover for the real item, options, availability, payment, and pickup timing.")}</p>
              <div className="review-strip">
                {reviews.map((review) => (
                  <span key={review}>
                    <Heart size={16} />
                    {t(review)}
                  </span>
                ))}
              </div>
            </div>
            <div className="logo-showcase reveal">
              <img src={asset("jr-taco-logo.jpg")} alt={t("Jr's Tacos smiling green logo")} />
            </div>
          </section>

          <section className="home-reviews-section" aria-labelledby="home-reviews-title">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">{t("Google buzz")}</p>
                <h2 id="home-reviews-title">{t("Five-star notes for tacos near St. Peters.")}</h2>
              </div>
              <p>
                {t(
                  "A quick taste of the Google feedback for anyone comparing taco trucks in St. Peters. The full reviews page links visitors to the current Google listing.",
                )}
              </p>
            </div>
            <div className="home-review-strip">
              {googleReviewCards.map((review) => (
                <GoogleReviewCard review={review} t={t} key={review.name} />
              ))}
            </div>
            <div className="home-review-actions reveal">
              <a className="primary-btn" href="/reviews">
                {t("See reviews")}
                <ArrowRight size={18} />
              </a>
              <a className="secondary-btn" href={sources.googleReviews} target="_blank" rel="noreferrer">
                {t("Open Google")}
                <ExternalLink size={18} />
              </a>
            </div>
          </section>

          <section className="catering-section" id="catering" aria-labelledby="catering-title">
            <div className="catering-bg">
              <img className="parallax-img" src={asset("nachos-share.jpg")} alt="" />
            </div>
            <div className="catering-content reveal">
              <p className="eyebrow">{t("Catering")}</p>
              <h2 id="catering-title">{t("Bring the taco truck to the party.")}</h2>
              <p>{t("Use the catering page to collect event details, pick a service style, and hand the request to the Juniors team cleanly.")}</p>
              <div className="catering-actions">
                <a className="primary-btn" href="/catering">
                  {t("Start catering request")}
                  <CalendarDays size={18} />
                </a>
                <a className="secondary-btn" href={sources.streetFoodFinder} target="_blank" rel="noreferrer">
                  StreetFoodFinder
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </section>
        </main>
      )}

      <footer className="footer">
        <div className="footer-brand">
          <img src={asset("jr-taco-logo.jpg")} alt="" />
          <div>
            <strong>Juniors Tacos</strong>
            <span>{t("Saint Peters Mexican food truck")}</span>
          </div>
        </div>
        <div className="footer-links">
          <a href={sources.cloverMenu} target="_blank" rel="noreferrer">
            {t("Clover menu")}
          </a>
          <a href="/reviews">{t("Reviews")}</a>
          <a href="/catering">{t("Catering")}</a>
          <a href={sources.streetFoodFinder} target="_blank" rel="noreferrer">
            StreetFoodFinder
          </a>
          <a href={sources.stlFoodTrucks} target="_blank" rel="noreferrer">
            {t("St. Louis Food Trucks")}
          </a>
          <span className="footer-socials" aria-label="Social media">
            <a className="social-link facebook-link" href={sources.facebook} target="_blank" rel="noreferrer" aria-label="Juniors Tacos on Facebook">
              <svg viewBox="0 0 512 512" aria-hidden="true" focusable="false">
                <path d="M211.9 197.4h-36.7v59.9h36.7v175.8h70.5V256.5h49.2l5.2-59.1h-54.4s0-22.1 0-33.7c0-13.9 2.8-19.5 16.3-19.5h38.2V82.9s-40.2 0-48.8 0c-52.5 0-76.1 23.1-76.1 67.3-.1 38.6-.1 47.2-.1 47.2z" />
              </svg>
            </a>
            <a className="social-link instagram-link" href={sources.instagram} target="_blank" rel="noreferrer" aria-label="Juniors Tacos on Instagram">
              <svg viewBox="0 0 512 512" aria-hidden="true" focusable="false">
                <path d="M256 109.3c47.8 0 53.4.2 72.3 1 17.4.8 26.9 3.7 33.2 6.2 8.4 3.2 14.3 7.1 20.6 13.4 6.3 6.3 10.1 12.2 13.4 20.6 2.5 6.3 5.4 15.8 6.2 33.2.9 18.9 1 24.5 1 72.3s-.2 53.4-1 72.3c-.8 17.4-3.7 26.9-6.2 33.2-3.2 8.4-7.1 14.3-13.4 20.6-6.3 6.3-12.2 10.1-20.6 13.4-6.3 2.5-15.8 5.4-33.2 6.2-18.9.9-24.5 1-72.3 1s-53.4-.2-72.3-1c-17.4-.8-26.9-3.7-33.2-6.2-8.4-3.2-14.3-7.1-20.6-13.4-6.3-6.3-10.1-12.2-13.4-20.6-2.5-6.3-5.4-15.8-6.2-33.2-.9-18.9-1-24.5-1-72.3s.2-53.4 1-72.3c.8-17.4 3.7-26.9 6.2-33.2 3.2-8.4 7.1-14.3 13.4-20.6 6.3-6.3 12.2-10.1 20.6-13.4 6.3-2.5 15.8-5.4 33.2-6.2 18.9-.8 24.5-1 72.3-1M256 77.1c-48.6 0-54.7.2-73.8 1.1-19 .9-32.1 3.9-43.4 8.3-11.8 4.6-21.7 10.7-31.7 20.6-9.9 9.9-16.1 19.9-20.6 31.7-4.4 11.4-7.4 24.4-8.3 43.4-.9 19.1-1.1 25.2-1.1 73.8s.2 54.7 1.1 73.8c.9 19 3.9 32.1 8.3 43.4 4.6 11.8 10.7 21.7 20.6 31.7 9.9 9.9 19.9 16.1 31.7 20.6 11.4 4.4 24.4 7.4 43.4 8.3 19.1.9 25.2 1.1 73.8 1.1s54.7-.2 73.8-1.1c19-.9 32.1-3.9 43.4-8.3 11.8-4.6 21.7-10.7 31.7-20.6 9.9-9.9 16.1-19.9 20.6-31.7 4.4-11.4 7.4-24.4 8.3-43.4.9-19.1 1.1-25.2 1.1-73.8s-.2-54.7-1.1-73.8c-.9-19-3.9-32.1-8.3-43.4-4.6-11.8-10.7-21.7-20.6-31.7-9.9-9.9-19.9-16.1-31.7-20.6-11.4-4.4-24.4-7.4-43.4-8.3-19.1-.9-25.2-1.1-73.8-1.1z" />
                <path d="M256 164.1c-50.7 0-91.9 41.1-91.9 91.9s41.1 91.9 91.9 91.9 91.9-41.1 91.9-91.9-41.2-91.9-91.9-91.9zm0 151.5c-32.9 0-59.6-26.7-59.6-59.6s26.7-59.6 59.6-59.6 59.6 26.7 59.6 59.6-26.7 59.6-59.6 59.6z" />
                <circle cx="351.5" cy="160.5" r="21.5" />
              </svg>
            </a>
            <a className="social-link tiktok-link" href={sources.tiktok} target="_blank" rel="noreferrer" aria-label="Juniors Tacos on TikTok">
              <svg viewBox="0 0 448 512" aria-hidden="true" focusable="false">
                <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.2v178.7A162.6 162.6 0 1 1 185 188.3v89.9a74.6 74.6 0 1 0 52.2 71.2V0h88a121.2 121.2 0 0 0 1.9 22.2 122.2 122.2 0 0 0 53.9 80.2 121.4 121.4 0 0 0 67 20.1z" />
              </svg>
            </a>
          </span>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}

function App() {
  if (siteMode === "coming-soon") {
    return <ComingSoonPage />;
  }

  return <FullSite />;
}

export default App;
