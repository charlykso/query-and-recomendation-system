using System.Security.Cryptography;
using System.Text;

namespace QandR_API.Collective
{
    public class PasswordFunc
    {
        public static byte[] combineByteArrays(byte[] a, byte[] b)
        {
            byte[] c = new byte[a.Length + b.Length];
            Buffer.BlockCopy(a, 0, c, 0, a.Length);
            Buffer.BlockCopy(b, 0, c, a.Length, b.Length);
            return c;
        }

        public static string hashPassword(string newPassword)
        {
            var password = newPassword.ToLower();
            // Convert the password to a byte array
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

            // Generate a salt (a random sequence of bytes)
            byte[] salt = new byte[16];
            RandomNumberGenerator rng = RandomNumberGenerator.Create();
            rng.GetBytes(salt);

            // Create a hash algorithm instance
            var sha256 = SHA256.Create();

            // Combine the password bytes and salt, and compute the hash
            byte[] hash = sha256.ComputeHash(combineByteArrays(passwordBytes, salt));

            // Store the salt and hash together
            string storedPassword = Convert.ToBase64String(salt) + ":" + Convert.ToBase64String(hash);
            
            return storedPassword;
        }

        public static Boolean verifyPassword(string dbPassword, string newPassword)
        {
            string newpassword = newPassword.ToLower();
            // Split the stored password into salt and hash
            string[] parts = dbPassword.Split(':');
            byte[] salt = Convert.FromBase64String(parts[0]);
            byte[] storedHash = Convert.FromBase64String(parts[1]);

            // Compute the hash of the entered password using the stored salt
            byte[] enteredPasswordBytes = Encoding.UTF8.GetBytes(newpassword);
            byte[] enteredHash = SHA256.Create().ComputeHash(combineByteArrays(enteredPasswordBytes, salt));

            // Compare the computed hash with the stored hash
            bool passwordsMatch = storedHash.SequenceEqual(enteredHash);

            return passwordsMatch;
        }
    }
}
