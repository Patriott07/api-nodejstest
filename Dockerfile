# Gunakan image Node.js resmi
FROM node:14

# Buat dan pindah ke direktori aplikasi
WORKDIR /app

# Salin manifest dependensi aplikasi ke image container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin kode lokal ke image container
COPY . .

# Expose port yang digunakan oleh aplikasi
EXPOSE 3000

# Jalankan aplikasi saat container dimulai
CMD ["npm", "start"]
