# LESSON 1

Install Next Js with TypeScript

`npx create-next-app --ts`

this creates a tsconfig.json file

https://nextjs.org/docs/basic-features/typescript

- remove all uncessery code from index.tsx
- leave main and footer
- remove api folder from pages, we will use our own backend

\_app.tsx
<Component {...pageProps}> the component in app tsx is the current page and the pageprops are the props the current component recives.

- add the document.tsx
  \_document.tsx
  read why document is needed:
  https://nextjs.org/docs/advanced-features/custom-document

- {/_ for example if you want to add GTM you will do it here (\_document.tsx), with a script -
  take a look at NextJs examples https://github.com/vercel/next.js/tree/canary/examples/with-google-tag-manager _/}
