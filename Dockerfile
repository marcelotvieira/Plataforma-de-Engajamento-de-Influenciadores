FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
RUN apk add --no-cache bash  # Adiciona o bash
EXPOSE 3000
CMD ["bash", "-c", "npx prisma migrate deploy && npx prisma generate && npm run build && npm run start"]
