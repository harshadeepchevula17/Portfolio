# Portfolio

This project is a portfolio website built with Vite, React, TanStack Router, and Tailwind. It includes the animated landing experience, project showcases, and a contact form.

This repository was initialized from the Lovable project and updated for local development and deployment.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Environment setup

Create a local `.env` file from the template and fill in the real values for your setup:

```sh
cp .env.example .env
```

Required variables:

```env
FRONTEND_URL=http://localhost:8082

MAIL_USER=your-email@gmail.com
MAIL_APP_PASSWORD=your-gmail-app-password
MAIL_TO=your-recipient@example.com
```

The contact form uses Gmail SMTP via `MAIL_USER` and `MAIL_APP_PASSWORD`, and `FRONTEND_URL` is used for CORS checks in the server.

## Build with Lovable

This project was originally created in the Lovable editor and is kept synced in this repository.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.
