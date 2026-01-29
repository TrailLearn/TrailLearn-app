import { env } from "~/env";
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // Recommended for GCM

const getKey = () => {
  if (!env.SHADOW_KEY) {
    if (env.NODE_ENV === "test") {
      return Buffer.alloc(32, 0); // Safe fallback only for tests
    }
    throw new Error("Missing SHADOW_KEY environment variable. Encryption impossible.");
  }
  // Hash to get exactly 32 bytes
  return crypto.createHash("sha256").update(env.SHADOW_KEY).digest();
};

export const EncryptionService = {
  encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
    
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    
    const authTag = cipher.getAuthTag();
    
    // Format: IV:AuthTag:EncryptedContent
    return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
  },

  decrypt(text: string): string {
    const parts = text.split(":");
    if (parts.length !== 3) {
      throw new Error("Invalid encrypted format");
    }
    
    const [ivHex, authTagHex, encryptedContent] = parts;
    if (!ivHex || !authTagHex || !encryptedContent) {
        throw new Error("Invalid encrypted components");
    }

    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    
    const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedContent, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    return decrypted;
  }
};
