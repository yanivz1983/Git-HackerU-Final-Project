import { joiCardSchema } from "../joi/card.joi";
import { Logger } from "../logs/logger";
import { isAdmin } from "../middleware/is-admin";
import { Card } from "./model/Card";
import { Cards } from "./model/Cards";
import { User } from "./model/user";
import { users } from "./users";

const initDB = async () => {
  try {
    isAdmin({ user: { isAdmin: true } } as any, {} as any, () => {});

    const usersCount = await User.countDocuments();
    if (usersCount !== 0) return;
    

    for (let user of users) {
      const saved = await User.create(user);
      Logger.verbose("Added user: ", saved);
    }

    const cards = [
      {
        _id: "65edefa06b0b80ffe71c831c",
        title: "Apple Watch SE",
        subtitle: "(2nd Gen)",
        description:
          "Apple Watch SE (2nd Gen) [GPS 40mm] Smartwatch with Midnight Aluminum Case with Midnight Sport Loop. Fitness & Sleep Tracker, Crash Detection, Heart Rate Monitor, Carbon Neutral",
        brand: "Appel",
        price: "$142.00",
        shipping: "$15.00",
        images: [
          {
            alt: "Apple Watch SE (2nd Gen)",
            url: "https://m.media-amazon.com/images/I/71WBhLbf56L._AC_SX522_.jpg",
            _id: "65edefa06b0b80ffe71c831d",
          },
          {
            alt: "Apple Watch SE (2nd Gen)",
            url: "https://m.media-amazon.com/images/I/819CwRIckoL._AC_SX522_.jpg",
            _id: "65edefa06b0b80ffe71c831e",
          },
          {
            alt: "Apple Watch SE (2nd Gen)",
            url: "https://m.media-amazon.com/images/I/71u9mPsMKHL._AC_SX522_.jpg",
            _id: "65edefa06b0b80ffe71c831f",
          },
        ],
        createdAt: "2024-03-10T17:34:02.846Z",
        likes: [],
        bizNumber: 366221,
        userId: "65e12aedb735c5d5d899569b",
        __v: 0,
      },
      {
        _id: "65edf1143c0fe94ac11e12f8",
        title: "MacBook Pro Laptop",
        subtitle: "MacBook Pro",
        description:
          "Apple 2023 MacBook Pro Laptop M3 chip with 8‑core CPU, 10‑core GPU: 14.2-inch Liquid Retina XDR Display, 8GB Unified Memory, 512GB SSD Storage. Works with iPhone/iPad; Space Gray",
        brand: "Appel",
        price: "$1,333.00",
        shipping: "$75.00",
        images: [
          {
            alt: "MacBook Pro Laptop",
            url: "https://m.media-amazon.com/images/I/61lsexTCOhL._AC_SX679_.jpg",
            _id: "65edf1143c0fe94ac11e12f9",
          },
          {
            alt: "MacBook Pro Laptop",
            url: "https://m.media-amazon.com/images/I/61RdWPq8UfL._AC_SX679_.jpg",
            _id: "65edf1143c0fe94ac11e12fa",
          },
          {
            alt: "MacBook Pro Laptop",
            url: "https://m.media-amazon.com/images/I/71mhIJSqKhL._AC_SX679_.jpg",
            _id: "65edf1143c0fe94ac11e12fb",
          },
        ],
        createdAt: "2024-03-10T17:40:23.777Z",
        likes: [],
        bizNumber: 537593,
        userId: "65e12aedb735c5d5d899569b",
        __v: 0,
      },
      {
        _id: "65edf2bbba595a1247e65d53",
        title: "iPhone 15 Pro Max",
        subtitle: "Titanium 256GB",
        description:
          "6.7-inch Super Retina XDR display footnote ¹ featuring ProMotion, Always-On, and Dynamic Island,Strong and light titanium design with Action button — a fast track to your favorite feature 48MP Main camera for super-high-resolution photos and 5x Telephoto camera, the longest optical zoom in iPhone ever A17 Pro chip delivers a massive leap in graphics performance, transforming mobile gaming",
        brand: "Apple",
        price: "$1,199.00",
        shipping: " Free",
        images: [
          {
            alt: "iPhone 15 Pro Max",
            url: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
            _id: "65edf2bbba595a1247e65d54",
          },
          {
            alt: "iPhone 15 Pro Max",
            url: "https://www.idigital.co.il/files/iphone%20pro%2015/iphonepro15.png",
            _id: "65edf2bbba595a1247e65d55",
          },
          {
            alt: "iPhone 15 Pro Max",
            url: "https://www.apple.com/newsroom/videos/iphone-15-pro-action-button/posters/Apple-iPhone-15-Pro-lineup-Action-button-230912.jpg.large_2x.jpg",
            _id: "65edf2bbba595a1247e65d56",
          },
        ],
        createdAt: "2024-03-10T17:43:11.967Z",
        likes: [],
        bizNumber: 160974,
        userId: "65e12aedb735c5d5d899569b",
        __v: 0,
      },
      {
        _id: "65edf391cccc27bce724d6c5",
        title: "Windows 10 Pro",
        subtitle: "Laptop ",
        description:
          "Dell Latitude 7490 14 Laptop, Intel Core i7 8650U 1.9Ghz, 32GB DDR4, 1TB M.2 NVMe PCIe SSD, FHD 1080p, Thunderbolt 3, HDMI, Webcam, Windows 10 Pro (Renewed)",
        brand: "Microsoft",
        price: "$895.00",
        shipping: "$75.00",
        images: [
          {
            alt: "Windows 10 Pro",
            url: "https://m.media-amazon.com/images/I/61h2elWhPZL._AC_SX679_.jpg",
            _id: "65edf391cccc27bce724d6c6",
          },
          {
            alt: "Windows 10 Pro",
            url: "https://m.media-amazon.com/images/I/61r-ExViytL._AC_SX679_.jpg",
            _id: "65edf391cccc27bce724d6c7",
          },
          {
            alt: "Windows 10 Pro",
            url: "https://m.media-amazon.com/images/I/71y98syfdSL._AC_SX679_.jpg",
            _id: "65edf391cccc27bce724d6c8",
          },
        ],
        createdAt: "2024-03-10T17:50:12.076Z",
        likes: [],
        bizNumber: 403116,
        userId: "65e12aedb735c5d5d899569b",
        __v: 1,
      },
      {
        _id: "65edf56e4d92f64c137a5fac",
        title: "LG VELVET™",
        subtitle: "Ready unreal speeds",
        description:
          "Key Features Sleek & Premium Design with Ergonomic 3D Arc Edges 6.8” OLED FullVision™ Display Triple Rear Cameras: 48 MP, 8MP Ultra-Wide, 5MP Depth 4K video records at 4x times the resolution of HD 3D Sound Engine & Stereo Speakers Dust, Water, Shock Resistant All-Day Battery with Fast & Wireless Charge 5G-Era Ready unreal speeds & robust connectivity",
        brand: "LG",
        price: "$179.99",
        shipping: " Free",
        images: [
          {
            alt: "LG VELVET™",
            url: "https://www.lg.com/us/mobile-phones/velvet-5g/assets/images/product/hero-medium.jpg",
            _id: "65edf56e4d92f64c137a5fad",
          },
          {
            alt: "LG VELVET™",
            url: "https://www.lg.com/us/mobile-phones/velvet-5g/assets/images/product/1-medium.jpg",
            _id: "65edf56e4d92f64c137a5fae",
          },
          {
            alt: "LG VELVET™",
            url: "https://www.lg.com/us/mobile-phones/velvet-5g/assets/images/product/20-xlarge.jpg",
            _id: "65edf56e4d92f64c137a5faf",
          },
        ],
        createdAt: "2024-03-10T17:54:48.587Z",
        likes: [],
        bizNumber: 8280,
        userId: "65e12aedb735c5d5d899569b",
        __v: 0,
      },
    ];

    for (let card of cards) {
      const saved = await Cards.create(card);
      Logger.verbose("Added card: ", saved);
    }
  } catch (error) {
    Logger.error("Error during initialization:", error);
  }
};

export { initDB };
