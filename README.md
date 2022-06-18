<h1 style="text-align: center;">Bepo</h1>

> Better poll site written in typescript with using Next.js, prisma, tRPC, tailwind and PlanetScale.

[Deployed on Vercel](https://bepo.vercel.app)

## Build & Run

1. First, install dirnev and repository

   ```sh
   brew install direnv
   git clone https://github.com/berkaycimsir/bepo bepo && cd bepo
   ```

2. Then, set environment variables and read them

   ```ts
   DATABASE_URL =
   PROD_URL =
   NEXT_PUBLIC_PROD_URL =
   NEXT_PUBLIC_LOCAL_URL =
   ```

   ```sh
   direnv allow
   ```

3. Finally, install dependencies and run

   ```sh
   yarn && yarn dev
   ```

## Show your support

Give a ⭐️ if this project helped you!
