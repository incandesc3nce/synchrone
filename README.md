# Synchrone - synchronous collaborative code editor

<img width="1874" height="987" alt="image" src="https://github.com/user-attachments/assets/dd40d442-7327-4816-90eb-7045857f8857" />

This is a real-time collaborative code editor in browser with syntax highlighting, developed as an advanced coursework project for "Modern Web Technologies" course during my 3rd year at university.

## Features

- Auth and projects bound to users
- Code auto-save
- Multi-language lightweight code editor with syntax highlighting powered by CodeMirror
- Project invite system

## Architecture

The project features 2 services: full-stack website built using Next.js and websocket service powered by Node.js and Socket.io.

Website utilizes Next.js route handlers to do backend logic and Prisma ORM to query PostgreSQL database.
Websocket service is responsible for handling real-time work and providing users with instant feedback. It also handles saving project's code either automatically or on demand.

## Tech Stack

[![TypeScript](https://go-skill-icons.vercel.app/api/icons?i=ts)](https://www.typescriptlang.org/)
[![Node.js](https://go-skill-icons.vercel.app/api/icons?i=nodejs)](https://nodejs.org/)

[![React](https://go-skill-icons.vercel.app/api/icons?i=react)](https://reactjs.org/)
[![Next.js](https://go-skill-icons.vercel.app/api/icons?i=nextjs)](https://nextjs.org/)
[![Tailwind CSS](https://go-skill-icons.vercel.app/api/icons?i=tailwind)](https://tailwindcss.com/)
[![Socket.io](https://go-skill-icons.vercel.app/api/icons?i=socketio)](https://socket.io/)

[![PostgreSQL](https://go-skill-icons.vercel.app/api/icons?i=postgresql)](https://www.postgresql.org/)
[![Prisma ORM](https://go-skill-icons.vercel.app/api/icons?i=prisma)](https://www.prisma.io/orm)

## License

This project is licensed under [Apache License 2.0](LICENSE)

© incandesc3nce 2025. All rights reserved.
