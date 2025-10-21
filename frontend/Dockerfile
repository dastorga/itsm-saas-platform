FROM node:14-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli@14

# Copy project files
COPY . .

EXPOSE 4200

# Start development server
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--poll=2000"]