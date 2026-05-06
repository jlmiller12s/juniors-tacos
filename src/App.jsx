import React, { useEffect, useMemo, useRef, useState } from "react";
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
  ["Offers", "#offers"],
  ["Pickup", "#schedule"],
  ["Order", "#catering"],
  ["Story", "#story"],
];

const sources = {
  streetFoodFinder: "https://streetfoodfinder.com/JrsTacos",
  facebook: "https://www.facebook.com/p/Jrs-Tacos-100086683935294/",
  bestFoodTrucks: "https://www.bestfoodtrucks.com/truck/jr-s-tacos/menu",
  cloverMenu: "https://jrs-tacos-saint-peters.cloveronline.com/menu/all",
  stlFoodTrucks: "https://stlouisfoodtrucks.org/",
};

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
    image: asset("tacos-hero.jpg"),
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
    image: asset("tacos-hero.jpg"),
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
    image: asset("nachos-share.jpg"),
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
    image: asset("quesadilla-table.jpg"),
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
    title: "Taco night without waiting for Tuesday.",
    copy: "Real Clover pricing is live here: tacos, burritos, nachos, quesadillas, drinks, desserts, tamales, and sopes.",
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
    title: "Thursday through Saturday.",
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

function formatScheduleDate(date) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(parsedDate);
}

function App() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const filteredMenu = useMemo(() => {
    const base = getFilteredItems(activeCategory);
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      return base;
    }

    return base.filter((item) =>
      [item.name, item.description, item.category].join(" ").toLowerCase().includes(trimmedQuery),
    );
  }, [activeCategory, query]);

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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
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

      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: "none",
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return;
    }

    gsap.fromTo(
      ".menu-card",
      { autoAlpha: 0, y: 24, scale: 0.985 },
      { autoAlpha: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.45, ease: "power2.out" },
    );
  }, [activeCategory, query]);

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
    recognition.lang = "en-US";

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
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand-mark" href="#top" onClick={closeMenu}>
          <img src={asset("jr-taco-logo.jpg")} alt="Jr's Tacos logo" />
          <span>
            Juniors <strong>Tacos</strong>
          </span>
        </a>

        <div className="nav-links" aria-label="Site sections">
          {navItems.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a className="ghost-pill" href={sources.cloverMenu} target="_blank" rel="noreferrer">
            <MapPin size={17} />
            Saint Peters
          </a>
          <a className="order-pill" href={sources.cloverMenu} target="_blank" rel="noreferrer">
            <ShoppingBag size={17} />
            Order now
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
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
            <a href={href} key={label} onClick={closeMenu}>
              {label}
              <ChevronRight size={20} />
            </a>
          ))}
          <a href={sources.facebook} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Facebook
            <ExternalLink size={19} />
          </a>
        </div>
      </div>

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
                Authentic Mexican food truck
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
                Real Clover menu prices for tacos, burritos, quesadillas, supreme nachos, sweet tres leches, tamales,
                sopes, and cold Jarritos in Saint Peters.
              </p>
              <div className="hero-actions">
                <a className="primary-btn" href="#menu">
                  Explore menu
                  <ArrowRight size={18} />
                </a>
                <a className="secondary-btn" href="#schedule">
                  Pickup info
                  <Navigation size={18} />
                </a>
              </div>
              <div className="hero-note">
                <Star size={18} />
                <span>Online pickup through Clover: Thu-Sat, 10:30am-7:30pm</span>
              </div>
            </div>

            <div className="hero-plate" aria-label="Featured taco plate">
              <div className="plate-image">
                <img src={asset("tacos-hero.jpg")} alt="Two tacos on a black plate with lime" />
              </div>
              <div className="plate-badge">
                <span>Tacos</span>
                <strong>$4</strong>
              </div>
            </div>

            <aside className="order-card">
              <div>
                <p className="eyebrow">Quick order</p>
                <h2>Tacos, nachos, Jarritos. Done.</h2>
              </div>
              <a href={sources.cloverMenu} className="order-card-link" target="_blank" rel="noreferrer">
                Open Clover
                <ExternalLink size={18} />
              </a>
            </aside>
          </div>
        </section>

        <section className="truck-finder reveal" id="schedule" aria-labelledby="schedule-title">
          <div className="finder-copy">
            <p className="eyebrow">Pickup info</p>
            <h2 id="schedule-title">Catch the truck this week.</h2>
          </div>
          <div className="finder-list">
            {scheduleStops.map((stop) => (
              <article className="stop-card" key={`${stop.day}-${stop.place}`}>
                <div>
                  <span>{[stop.day, formatScheduleDate(stop.date)].filter(Boolean).join(" ")}</span>
                  <h3>{stop.place}</h3>
                  <p>{stop.address}</p>
                  {stop.note ? <em>{stop.note}</em> : null}
                </div>
                <strong>
                  <Clock size={16} />
                  {stop.time}
                </strong>
              </article>
            ))}
          </div>
          <a className="finder-link" href={sources.cloverMenu} target="_blank" rel="noreferrer">
            Order online
            <ExternalLink size={18} />
          </a>
        </section>

        <section className="admin-section" id="admin" aria-labelledby="admin-title">
          <div className="admin-shell">
            <div className="section-heading admin-heading">
              <div>
                <p className="eyebrow">Owner admin preview</p>
                <h2 id="admin-title">Location Schedule Admin</h2>
              </div>
              <p>
                Type or dictate the weekly stops, review the draft, then publish the schedule into the public pickup
                cards.
              </p>
            </div>

            <div className="admin-grid">
              <div className="admin-panel">
                <label className="admin-field">
                  <span>Weekly update</span>
                  <textarea
                    value={adminText}
                    onChange={(event) => setAdminText(event.target.value)}
                    rows={8}
                    placeholder="Tuesday at O'Fallon Brewery 11am-2pm"
                  />
                </label>

                <label className="admin-field compact-field">
                  <span>Backend admin passcode</span>
                  <input
                    type="password"
                    value={adminToken}
                    onChange={(event) => setAdminToken(event.target.value)}
                    placeholder="Required for shared live publishing"
                  />
                </label>

                <div className="admin-actions">
                  <button className="secondary-btn" type="button" onClick={dictateSchedule}>
                    <Mic size={18} />
                    {isListening ? "Stop listening" : "Dictate"}
                  </button>
                  <button className="primary-btn" type="button" onClick={buildScheduleDraft}>
                    <Sparkles size={18} />
                    Generate draft
                  </button>
                </div>

                <p className="admin-status">{adminStatus}</p>
              </div>

              <div className="admin-panel">
                <div className="admin-panel-head">
                  <div>
                    <p className="eyebrow">Review</p>
                    <h3>Draft stops</h3>
                  </div>
                  <button className="secondary-btn compact-btn" type="button" onClick={addDraftStop}>
                    <Plus size={17} />
                    Add stop
                  </button>
                </div>

                <div className="draft-list">
                  {draftSchedule.length ? (
                    draftSchedule.map((stop) => (
                      <article className="draft-stop" key={stop.id}>
                        <div className="draft-stop-head">
                          <strong>{stop.place}</strong>
                          <button type="button" aria-label={`Remove ${stop.place}`} onClick={() => removeDraftStop(stop.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="draft-fields">
                          <label>
                            <span>Day</span>
                            <input
                              value={stop.day}
                              onChange={(event) => updateDraftStop(stop.id, "day", event.target.value)}
                            />
                          </label>
                          <label>
                            <span>Date</span>
                            <input
                              type="date"
                              value={stop.date}
                              onChange={(event) => updateDraftStop(stop.id, "date", event.target.value)}
                            />
                          </label>
                          <label>
                            <span>Time</span>
                            <input
                              value={stop.time}
                              onChange={(event) => updateDraftStop(stop.id, "time", event.target.value)}
                            />
                          </label>
                          <label>
                            <span>Place</span>
                            <input
                              value={stop.place}
                              onChange={(event) => updateDraftStop(stop.id, "place", event.target.value)}
                            />
                          </label>
                          <label className="wide-field">
                            <span>Address</span>
                            <input
                              value={stop.address}
                              onChange={(event) => updateDraftStop(stop.id, "address", event.target.value)}
                            />
                          </label>
                          <label className="wide-field">
                            <span>Note</span>
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
                      <span>No draft yet.</span>
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
                      ? "Schedule Published"
                      : publishState === "publishing"
                        ? "Publishing..."
                        : "Publish schedule"}
                  </button>
                  <button className="secondary-btn" type="button" onClick={resetSchedule}>
                    Reset default
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {["Street tacos", "Quesadillas", "Nachos supreme", "Jarritos", "Tres leches", "Catering"].map((item) => (
              <span key={item}>{item}</span>
            ))}
            {["Street tacos", "Quesadillas", "Nachos supreme", "Jarritos", "Tres leches", "Catering"].map((item) => (
              <span key={`${item}-repeat`}>{item}</span>
            ))}
          </div>
        </div>

        <section className="offers-section" id="offers" aria-labelledby="offers-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Fresh drops</p>
            <h2 id="offers-title">Big-deal energy, taco truck soul.</h2>
            <p>
              Start with street tacos, share the nachos, chase it with Jarritos, then keep the schedule close for the
              next stop.
            </p>
          </div>

          <div className="offer-grid">
            {offers.map((offer, index) => {
              const Icon = offer.icon;
              return (
                <article className="offer-card reveal" style={{ "--delay": `${index * 90}ms` }} key={offer.title}>
                  <div className="offer-icon">
                    <Icon size={24} />
                  </div>
                  <p>{offer.eyebrow}</p>
                  <h3>{offer.title}</h3>
                  <span>{offer.copy}</span>
                  <a
                    href={index === 1 ? sources.cloverMenu : index === 2 ? "#schedule" : "#menu"}
                    target={index === 1 ? "_blank" : undefined}
                    rel={index === 1 ? "noreferrer" : undefined}
                  >
                    {offer.action}
                    {index === 1 ? <ExternalLink size={18} /> : <ArrowRight size={18} />}
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="feature-band" aria-label="Featured food">
          <div className="feature-media reveal">
            <img className="parallax-img" src={asset("quesadilla-table.jpg")} alt="Cut quesadilla with salsa" />
          </div>
          <div className="feature-copy reveal">
            <p className="eyebrow">Made for the window</p>
            <h2>Hot griddles, melty cheese, salsa on standby.</h2>
            <p>
              From the first lime squeeze to the last chip, Juniors keeps the good stuff simple: warm tortillas, loaded
              trays, cold drinks, and enough flavor to make a quick stop feel like a plan.
            </p>
            <div className="feature-stats">
              <span>
                <strong>Mexican</strong>
                Saint Peters
              </span>
              <span>
                <strong>Thu-Sat</strong>
                Clover pickup
              </span>
              <span>
                <strong>$4</strong>
                Street tacos
              </span>
            </div>
          </div>
        </section>

        <section className="menu-section" id="menu" aria-labelledby="menu-title">
          <div className="section-heading reveal">
            <p className="eyebrow">The menu</p>
            <h2 id="menu-title">Pick your lane. Then add the good stuff.</h2>
            <p>Real Clover menu items, prices, options, and availability. Final checkout happens on Clover.</p>
          </div>

          <div className="menu-toolbar reveal">
            <div className="category-tabs" role="tablist" aria-label="Menu categories">
              {categories.map((category) => (
                <button
                  className={activeCategory === category ? "is-active" : ""}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  key={category}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="menu-search">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search menu"
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
                      <img src={item.image} alt="" />
                      <span>{item.available === false ? "Unavailable" : item.badge}</span>
                    </div>
                    <div className="menu-card-body">
                      <div className="menu-card-title">
                        <div>
                          <p>{item.category}</p>
                          <h3>{item.name}</h3>
                        </div>
                        <strong>{formatPrice(item.price)}</strong>
                      </div>
                      <p>{item.description}</p>
                      {item.options?.length ? (
                        <div className="option-list" aria-label={`${item.name} options`}>
                          {item.options.slice(0, 5).map((option) => (
                            <span key={option}>{option}</span>
                          ))}
                          {item.options.length > 5 ? <span>+{item.options.length - 5} more</span> : null}
                        </div>
                      ) : null}
                      <div className="quantity-row">
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => updateCart(item.id, -1)}
                          disabled={!cart[item.id] || item.available === false}
                        >
                          <Minus size={16} />
                        </button>
                        <span>{cart[item.id] || 0}</span>
                        <button
                          type="button"
                          aria-label={`Add ${item.name}`}
                          onClick={() => updateCart(item.id, 1)}
                          disabled={item.available === false}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      {item.available === false ? (
                        <span className="item-order-link disabled">Currently unavailable on Clover</span>
                      ) : (
                        <a className="item-order-link" href={item.orderUrl} target="_blank" rel="noreferrer">
                          Order this item on Clover
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-menu">
                  <Utensils size={30} />
                  <p>No menu items matched that search.</p>
                </div>
              )}
            </div>

            <aside className="cart-panel reveal" aria-label="Order tray">
              <div className="cart-panel-head">
                <div>
                  <p className="eyebrow">Your tray</p>
                  <h3>{totalItems ? `${totalItems} item${totalItems > 1 ? "s" : ""}` : "Ready when you are"}</h3>
                </div>
                <ShoppingBag size={24} />
              </div>

              {cartLines.length > 0 ? (
                <div className="cart-lines">
                  {cartLines.map((item) => (
                    <div className="cart-line" key={item.id}>
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <strong>{formatPrice(item.quantity * item.price)}</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="cart-empty">Add available favorites here for an estimate, then place the real order on Clover.</p>
              )}

              <div className="cart-total">
                <span>Estimated total</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>
              <a className="primary-btn full-btn" href={sources.cloverMenu} target="_blank" rel="noreferrer">
                Place order on Clover
                <ExternalLink size={18} />
              </a>
            </aside>
          </div>
        </section>

        <section className="story-section" id="story">
          <div className="story-copy reveal">
            <p className="eyebrow">Neighborhood flavor</p>
            <h2>Authentic Mexican street food, with the kind of logo you remember.</h2>
            <p>
              Juniors Tacos is listed as a Saint Peters Mexican food truck with pickup ordering through Clover. This
              page keeps the browsing friendly while every order button sends customers to Clover for the real item,
              options, availability, payment, and pickup timing.
            </p>
            <div className="review-strip">
              {reviews.map((review) => (
                <span key={review}>
                  <Heart size={16} />
                  {review}
                </span>
              ))}
            </div>
          </div>
          <div className="logo-showcase reveal">
            <img src={asset("jr-taco-logo.jpg")} alt="Jr's Tacos smiling green logo" />
          </div>
        </section>

        <section className="catering-section" id="catering" aria-labelledby="catering-title">
          <div className="catering-bg">
            <img className="parallax-img" src={asset("nachos-share.jpg")} alt="" />
          </div>
          <div className="catering-content reveal">
            <p className="eyebrow">Order online</p>
            <h2 id="catering-title">Browse here. Checkout safely on Clover.</h2>
            <p>
              The local tray gives a quick estimate, then Clover handles modifiers, scheduled pickup, Apple Pay, Google
              Pay, gift cards, and card checkout.
            </p>
            <div className="catering-actions">
              <a className="primary-btn" href={sources.cloverMenu} target="_blank" rel="noreferrer">
                Order pickup
                <CalendarDays size={18} />
              </a>
              <a className="secondary-btn" href={sources.facebook} target="_blank" rel="noreferrer">
                Facebook page
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <img src={asset("jr-taco-logo.jpg")} alt="" />
          <div>
            <strong>Juniors Tacos</strong>
            <span>Saint Peters Mexican food truck</span>
          </div>
        </div>
        <div className="footer-links">
          <a href={sources.cloverMenu} target="_blank" rel="noreferrer">
            Clover menu
          </a>
          <a href={sources.streetFoodFinder} target="_blank" rel="noreferrer">
            StreetFoodFinder
          </a>
          <a href={sources.stlFoodTrucks} target="_blank" rel="noreferrer">
            St. Louis Food Trucks
          </a>
          <a href={sources.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
