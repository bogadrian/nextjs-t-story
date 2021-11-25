# Create a hamburger button

a div container 5rem large, 3rem small width and height which includes an input and a spam.
the input is 100% width and height and 0 margin to cover the div container

- set the display flex in container
- select the icon (is a span element with &nbps;) and the ::before and ::after icon elements and put them in the container with position absolute, left 0 top -1rem for before and +1rem for ::before
- select the container then the span on hover and increase the ::before to -1.2rem and ::after to 1.2rem, to have an expand button effect on hover. Select the container because on hover the container move :: before up and ::after down.
- add transition on span to expand in 0.3s
- select the input then select vthe cheked pseoudo class then select the ion with the +: input + icon and set the background of the icon to transparent on cheked == true
- add onChange on input in component and the checked prop for input to match whatever is set in state;
- set z-index to -1 on icon (span), icon::before and icon::after to move it backwords and allow the container to be clckble fully.
- instead of rotating icon::before and icon::after to 45deg respective to -45deg, rotate them to 135deg and -135deg, which makes a nice effect rotating them much more!
- cut the border on the container
- add the CSS variables
- add onClick on the container to make sure no matter where you click it gets the cleik and changes the clicked propriety

  # Storybook

- add the storybook with 2 sizes: small and large!
