import { joiCardSchema } from "../joi/card.joi";
import { Logger } from "../logs/logger";
import { isAdmin } from "../middleware/is-admin";
import { User } from "./model/user";
import { users } from "./users";

const initDB = async () => {
  try {
    await isAdmin({ user: { isAdmin: true } } as any, {} as any, () => {});

    const usersCount = await User.countDocuments();
    if (usersCount !== 0) return;

    for (let user of users) {
      const saved = await new User(user).save();
      Logger.verbose("Added user: ", saved);
    }

    const cards = [
      {
        title: "Card 1",
        subtitle: "Subtitle 1",
        description: "Description for Card 1",
        brand: "Appel",
        price: "19.99$",
        shipping: "Worldwide",
        image: [
          {
            url: "https://m.media-amazon.com/images/I/71zRpbDLNLL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            alt: "Image 1 Alt Text",
          },
          {
            url: "https://m.media-amazon.com/images/I/61d+X4yl22L._AC_SX679_.jpg",
            alt: "Image 1 Alt Text",
          },
        ],
      },
      {
        title: "Card 2",
        subtitle: "Subtitle 2",
        description: "Description for Card 2",
        brand: "Appel",
        price: "29.99$",
        shipping: "Europe",
        image: [
          {
            url: "https://m.media-amazon.com/images/I/71zRpbDLNLL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            alt: "Image 1 Alt Text",
          },
          {
            url: "https://m.media-amazon.com/images/I/61d+X4yl22L._AC_SX679_.jpg",
            alt: "Image 1 Alt Text",
          },
        ],
      },
      {
        title: "Card 3",
        subtitle: "Subtitle 3",
        description: "Description for Card 3",
        brand: "Appel",
        price: "39.99$",
        shipping: "North America",
        image: [
          {
            url: "https://m.media-amazon.com/images/I/71zRpbDLNLL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            alt: "Image 1 Alt Text",
          },
          {
            url: "https://m.media-amazon.com/images/I/61d+X4yl22L._AC_SX679_.jpg",
            alt: "Image 1 Alt Text",
          },
        ],
      },
    ];

    cards.forEach((card, index) => {
      const { error, value } = joiCardSchema.validate(card);

      if (error) {
        Logger.error(`Validation Error for Card ${index + 1}:`, error.details);
      } else {
        Logger.log(`Card ${index + 1} is valid:`, value);
      }
    });
  } catch (error) {
    Logger.error("Error during initialization:", error);
  }
};

export { initDB };
