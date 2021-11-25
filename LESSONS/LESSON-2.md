# LESSON 2

Install Storybook

## Add Storybook ::

`npx sb init`

Storybook will look into the NextJs configuration and will add TypeScript to its main.js file automatically.

- once installed storybook, rename stroies to Ui-components
- add a folder for each componet (ex: Button folder for Button.tsx)
- file.css not working, need to rename to file.module.css. install `npm i storybook-css-modules-preset` and add the 'storybook-css-modules-preset' to addons to enable module.css. _No need to add a index.tsx file to each component folder!_

- clean assets in stories and add logo.svg from here
  https://icons8.com/icons/set/logo

let's install Storybook first!
`npx sb init`

Storybook will look into the NextJs configuration and will add TypeScript to its main.js file automatically.

I would like now to rename the stories folder to UI-components. In this way I will know very well in that folder I can find my UI components built with Storybook!

In main.js in stroybook folder change the stories in the path to Ui-componnets and cut a star fwhere there are 2: '../Ui-components/_/_.stories.mdx' to allow the config Storybook to find the stories in Ui-componets folder, subfolders.

Then add a folder for each component you build!
Let's keep only the button for now!

Rename the button.css to button.module.css

install `npm i storybook-css-modules-preset` and add the 'storybook-css-modules-preset' to addons to enable module.css. _No need to add a index.tsx file to each component folder!_

clean the assets folder
