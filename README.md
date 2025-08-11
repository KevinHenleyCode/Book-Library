# Book‑Library

**Book‑Library** is a custom book library application built with Next.js that connects to the Google Books API, allowing users to search and explore book information in a sleek, modern web interface. It’s written in TypeScript and styled with Tailwind CSS, plus Shadcn/ui components. It also includes Docker support for seamless development and deployment.

## Features

- Search for books using Google Books API
- Fetch book details such as title, authors, and thumbnail
- Fast, dynamic UI powered by Next.js, Tailwind CSS and shadcn/ui
- Developer-friendly with TypeScript safety and linting setup
- Dockerized for easy local setup and cloud deployment

## Tech Stack

- **Framework**: Next.js 15
- **Languages**: TypeScript, JavaScript, CSS
- **Styling**: Tailwind CSS
- **Database**: SQLite + Prisma (planned integration)
- **Offline Storage**: IndexedDB (PWA via WASM)
- **API**: Google Books API
- **Containerization**: Docker (`Dockerfile`, `docker-compose.dev.yml`)
- **Deployment**: AWS EC2 (via Docker)
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js
- pnpm
- Docker (optional, for containerized workflows)

### Running Locally

```bash
# Clone the repository
git clone https://github.com/KevinHenleyCode/Book-Library.git
cd Book-Library

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using Docker

```bash
# Build and run the container
docker build -t book-library .
docker run -p 3000:3000 book-library

# Or use docker-compose for development
docker-compose -f docker-compose.dev.yml up --build
```

## Deployment

Deployment is configured for AWS EC2 using Docker and GitHub Actions. Update environment variables in your EC2 instance and rebuild containers for changes to take effect.

## Environment Variables

Create an `.env` file:

```
GOOGLE_BOOKS_API_KEY=your_api_key_here
```

## Project Structure

```
├── .github/           # CI/CD workflows
├── public/            # Static assets
├── src/app/           # Next.js app directory
├── src/components/    # UI components
├── Dockerfile
├── docker-compose.dev.yml
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Current Status

- This app is in early development and still has a significant amount of work to be done. If you encounter any errors, please feel free to reach out to me.

## Future Plans

- Custom lists to organize your library
- Search and filters for the My Library section
- Click on a book for more detailed information
- Edit bar for modifying book information in your library
- User logins to sync data across devices
- Saved custom queries for faster access to frequent searches
- Expanded selection of themes
- Social features such as comments, discussions, and book clubs

## License

This project is licensed under the MIT License.
