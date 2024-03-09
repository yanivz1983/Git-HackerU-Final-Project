import express, { json } from "express";
import { notFound } from "./middleware/not-found";
import { usersRouter } from "./routes/users";
import { connect } from "./database/connection";
import { errorHandler } from "./middleware/error-handler";
import morgan from "morgan";
import cors from "cors";
import { cardsRouter } from "./routes/cards";
import { Logger } from "./logs/logger";
import path from "path";
import { uploadMiddleware } from "./service/multerConfig";
import configDotEnv from "./config";
import { OrderItem, sendOrderConfirmationEmail } from "./email/sendEmail";
import { Card } from "./database/model/Card";
import { validateToken } from "./middleware/validate-token";
import multer from "multer";
import { User } from "./database/model/user";
import { isAdminOrUser } from "./middleware/is-admin-or-user";
import rateLimit from "express-rate-limit";

configDotEnv();
connect();
const app = express();
const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 5000,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.static("public"));
app.use(json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
declare module "express" {
  interface Request {
    session?: any;
  }
}
app.put(
  "/:id",
  isAdminOrUser,
  validateToken,
  uploadMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateFields = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      Logger.log("Received PUT request to update user with ID:", id);
      Logger.log("Update fields:", updateFields);

      if (imageUrl) {
        updateFields.image = { alt: updateFields.image.alt, url: imageUrl };
      }

      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        updateFields,
        { new: true }
      );

      if (updatedUser) {
        Logger.log("User updated successfully:", updatedUser);

        return res.json({
          ...updatedUser.toObject(),
          image: updatedUser.image
            ? { alt: updatedUser.image.alt, url: imageUrl }
            : undefined,
        });
      } else {
        Logger.log("User not found or update did not change any fields");
        return res.status(404).json({
          error: "User not found or update did not change any fields",
        });
      }
    } catch (error) {
      if (error instanceof multer.MulterError) {
        Logger.error("MulterError during file upload:", error);
        return res.status(400).json({ error: error.message });
      }

      Logger.error("Error updating user:", error);
      next(error);
    }
  }
);
usersRouter.post("/order-confirmation", async (req, res) => {
  try {
    Logger.log("Received order confirmation request");

    const { userEmail, orderedCardDetails, formData } = req.body;

    if (
      !userEmail ||
      !orderedCardDetails ||
      !Array.isArray(orderedCardDetails) ||
      !formData
    ) {
      Logger.error("Invalid request body");
      return res.status(400).json({ error: "Invalid request body" });
    }

    const orderedCards = await Promise.all(
      orderedCardDetails.map(async ({ _id, quantity }) => {
        try {
          const card = await Card.findById(_id).lean();
          return { ...card, quantity };
        } catch (error) {
          Logger.error(`Error finding card with ID ${_id}:`, error);
          return undefined;
        }
      })
    );

    const validOrderedCards = orderedCards.filter((card) => card !== undefined);

    if (validOrderedCards.length === 0) {
      Logger.error("No valid cards found.");
      return res.status(400).json({ error: "No valid cards found." });
    }

    let totalPrice = 0;

    const orderItems = validOrderedCards.map((card) => {
      if (!card) {
        Logger.error(`Card is null or undefined.`);
        return undefined;
      }

      const itemPrice = parseFloat(
        card.price.replace("$", "").replace(/,/g, "")
      );
      const itemQuantity = Math.max(1, parseInt(card.quantity));

      if (isNaN(itemPrice) || isNaN(itemQuantity)) {
        Logger.error("Invalid price or quantity for card:", card);
        return undefined;
      }

      let itemShippingCost = 0;

      if (card.shipping && card.shipping.toLowerCase().includes("free")) {
        itemShippingCost = 0;
      } else if (card.shipping) {
        itemShippingCost = parseFloat(
          card.shipping.replace("$", "").replace(/,/g, "")
        );
      }

      const itemTotal = itemPrice * itemQuantity + itemShippingCost;

      totalPrice += itemTotal; // Update total price

      return {
        title: card.title,
        price: itemPrice,
        quantity: itemQuantity,
        shipping: card.shipping || "N/A",
        imageUrl:
          card.images && card.images.length > 0
            ? card.images[0].url
            : undefined,
        itemTotal: itemTotal,
      };
    });

    const validOrderItems = orderItems.filter((item) => item !== undefined);

    if (validOrderItems.length === 0) {
      Logger.error("No valid items found.");
      return res.status(400).json({ error: "No valid items found." });
    }

    await sendOrderConfirmationEmail(
      userEmail,
      validOrderItems,
      totalPrice,
      formData
    );

    Logger.log("Order confirmation email sent successfully");
    res
      .status(200)
      .json({ message: "Order confirmation email sent successfully" });
  } catch (error) {
    Logger.error("Error processing order confirmation:", error);
    res.status(500).json({ error: "Error processing order confirmation" });
  }
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  Logger.info(`App is running: http://localhost:${PORT}`);
});
