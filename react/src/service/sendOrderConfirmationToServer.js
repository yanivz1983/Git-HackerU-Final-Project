import axios from "axios";

export const sendOrderConfirmationToServer = async (
  formData,
  orderedCardIds
) => {
  try {
    if (!orderedCardIds || orderedCardIds.length === 0) {
      return;
    }

    const requestBody = {
      userEmail: formData.DeliveryInformation.email,
      orderedCardIds: orderedCardIds,
      formData: {
        DeliveryInformation: {
          firstName: formData.DeliveryInformation.firstName,
          lastName: formData.DeliveryInformation.lastName,
          address: formData.DeliveryInformation.address,
          city: formData.DeliveryInformation.city,
          zipCode: formData.DeliveryInformation.zipCode,
          phone: formData.DeliveryInformation.phone,
          shippingMethod: formData.DeliveryInformation.shippingMethod,
        },
      },
    };

    const response = await axios.post(
      "http://localhost:8080/users/order-confirmation",
      requestBody
    );

    if (response.data) {
      console.log("Order confirmation sent successfully!");
    } else {
      console.error(
        "Unexpected response from the server:",
        response.status,
        response.data
      );
    }
  } catch (error) {
    throw error;
  }
};
