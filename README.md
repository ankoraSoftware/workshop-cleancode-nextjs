This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the docker image serving the JSON server:

```bash
npm run prepare
```

Then run the NextJS app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

You are required to refactor the application to adhere to the principles we set up in the last two workshops:
- Working with NextJS 14
- Writing clean code

The application is a simple Todo app that relies on JSON mock server running in docker. The server database is hosted in `./data/db.json` and it will update as you create/update todos within the app. Since the file is tracked in git, any change in the todos list will be tracked in git. This is fine, feel free to commit the file with the changes.

Currently, the entire application is written in one file `index.tsx`. This is obviously bad, but it's up to you on how to split up and clean up the project. The file relies on utility functions from `utils/api.ts` and you should reuse those since they're properly typed in typescript.

> There's a bit of weirdness on how the utility functions work, those were just workarounds of the JSON placeholder server. **There is no need to refactor those, leave them as is!**

This is a task to show your skills, so feel free to introduce anything that brings value to the project.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
