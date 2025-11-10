FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci

# Copy all source files
COPY . .

# Install all Playwright browsers
RUN npx playwright install --with-deps

# Create test-results directory
RUN mkdir -p test-results

# Set default environment
ENV NODE_ENV=production

# Run tests
CMD ["npm", "test"]