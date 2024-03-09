import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../database/model/user";
import { Logger } from "../logs/logger";

async function resetPassword(
  userId: string,
  token: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (!user.resetToken) {
      return { success: false, error: "User does not have a reset token" };
    }

    if (user.resetToken !== token) {
      return { success: false, error: "Invalid reset token" };
    }

    if (
      user.resetTokenExpires &&
      new Date(user.resetTokenExpires).getTime() < Date.now()
    ) {
      const expirationDate = new Date(user.resetTokenExpires).toLocaleString();
      return {
        success: false,
        error: `Reset token has expired. Expiration date: ${expirationDate}`,
      };
    }

    const hash = await bcrypt.hash(newPassword, 10);

    user.password = hash;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    return { success: true };
  } catch (error) {
    Logger.error("Error resetting password:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export { resetPassword };
