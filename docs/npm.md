npx ts-node --transpile-only src/schema

- You can run `npm run generate` to update your schema.graphql and nexus-typegen.ts file when there are any changes in your Nexus code.
- You can use `npm run dev` to start the web server and watch for any changes.

- Note: If for whatever reason you would like to regenerate Prisma Client, you can always do so independent of a migration using the npx prisma generate command.

-npx ts-node src/script.ts [to run the script and get db result]
