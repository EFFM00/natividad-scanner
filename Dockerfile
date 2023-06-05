FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json a la imagen
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install
RUN apt-get update && apt-get install -y \
    libnss3 \
    libnss3-tools \
    libglib2.0-0 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    && apt-get clean
RUN npx playwright install

# Copia el resto de los archivos de la aplicación a la imagen
COPY . .

# Expone el puerto en el que se ejecuta la aplicación (por ejemplo, el puerto 3000)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]
