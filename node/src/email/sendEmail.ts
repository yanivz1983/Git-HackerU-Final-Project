import nodemailer from "nodemailer";
import { emailConfig } from "../config/email.config";
import { Logger } from "../logs/logger";

const transporter = nodemailer.createTransport(emailConfig);

export async function sendEmail(
  userId: string,
  to: string,
  subject: string,
  message: string
): Promise<void> {
  try {
    Logger.log("User ID:", userId);
    Logger.log("Email address:", to);

    if (!to) {
      Logger.error("Error sending email: No recipients defined");
      throw new Error("No recipients defined");
    }

    const mailOptions = {
      from: emailConfig.auth.user,
      to: to,
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    Logger.log("Email sent:", info.messageId);
  } catch (error: any) {
    if (error.code === "EAUTH" && error.command === "API") {
      Logger.log("Credentials issue. Responding with 200 status.");
      return;
    }

    Logger.error("Error sending email:", error);
    throw error;
  }
}

export const sendOrderConfirmationEmail = async (
  userEmail: string,
  orderDetails: OrderItem[],
  totalPrice: number,
  formData: any
): Promise<void> => {
  try {
    Logger.log("Original FormData:", formData);

    const { DeliveryInformation } = formData;

    Logger.log("DeliveryInformation:", DeliveryInformation);

    if (!DeliveryInformation) {
      Logger.error(
        "Error sending order confirmation email: DeliveryInformation not provided"
      );
      throw new Error("DeliveryInformation not provided");
    }

    const requestBody = {
      DeliveryInformation: {
        userEmail: DeliveryInformation.email,
        firstName: DeliveryInformation.firstName,
        lastName: DeliveryInformation.lastName,
        address: DeliveryInformation.address,
        city: DeliveryInformation.city,
        zipCode: DeliveryInformation.zipCode,
        phone: DeliveryInformation.phone,
        shippingMethod: DeliveryInformation.shippingMethod,
      },
      orderDetails: [],
    };

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Order Confirmation</h2>

        <h3>Delivery Information:</h3>
        <p><strong>Shipping Method:</strong> ${
          formData.DeliveryInformation.shippingMethod
        } </p>
        <p><strong>Name:</strong> ${formData.DeliveryInformation.firstName} ${
      formData.DeliveryInformation.lastName
    }</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Address:</strong> ${formData.DeliveryInformation.address}</p>
        <p><strong>City:</strong> ${formData.DeliveryInformation.city}</p>
        <p><strong>ZIP Code:</strong> ${
          formData.DeliveryInformation.zipCode
        }</p>
        <p><strong>Phone:</strong> ${formData.DeliveryInformation.phone}</p>

        <!-- Include other relevant form fields as needed -->

        <p style="color: #555; font-size: 16px; margin-bottom: 10px;">Thank you for your order! Here are the details:</p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr>
              <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Item</th>
              <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Price</th>
              <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Quantity</th>
              <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Shipping</th>
              <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Image</th>
            </tr>
          </thead>
          <tbody>
            ${orderDetails
              .map(
                (item) => `
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${
                      item.title
                    }</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">$${item.price.toFixed(
                      2
                    )}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${
                      item.shipping
                    }</td>
                     <td style="padding: 10px; border-bottom: 1px solid #ddd;">${
                       item.quantity
                     }</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><img src="${
                      item.imageUrl
                    }" alt="${
                  item.title
                }" style="width: 80px; height: 80px; object-fit: cover;"></td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>

        <p style="color: #555; font-size: 18px; font-weight: bold;">Total Price: $${totalPrice.toFixed(
          2
        )}</p>

        <p style="color: #777; font-size: 14px;">Thank you for shopping with us!</p>
      </div>
    `;
    let info = await transporter.sendMail({
      from: emailConfig.auth.user,
      to: userEmail,
      subject: "Order Confirmation",
      html: htmlContent,
    });

    Logger.log("Email sent successfully:", info.messageId);
  } catch (error) {
    Logger.error("Error sending order confirmation email:", error);
    throw error;
  }
};

export interface OrderItem {
  title: string;
  price: number;
  quantity: number;
  shipping: string;
  imageUrl: string | undefined;
  itemTotal: number; 
}
