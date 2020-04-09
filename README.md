# kasa-app

## After thoughts and Caveats

This app has one main screen that lets a user set an apartment's interntal title, name, location and GPS positions.
The primary acceptance criteria were employed:

## Name section

the name section's internal title will strip any non letters and uppercase the remaining characters,

- one caveat: the value is computed from the store and computeds won't trigger unless it see a changed value
  so entering ach will give you ACH, and then entering ACh when leave ACh because ACH is stored

## Location section

The address lookup input uses the google maps autocomplete api. The selected address will populate the form. Users can overwrite any value.

- The selected value sets the map's center and marker position. The lat/lng inputs reflect the current marker position

## GPS position section

The section loads a default address. The marker moves to the correct location based on when location fields are changed. The marker can
be moved and the location fields will not change. The reset button renders when the view is in editing mode and clicking it resets the map's
center and marker position.

- The map's center and marker position are also updated based on a selected address from the location section.

The app uses Vue-Router for routing, Vuex to enable client-side data persistence, and Velocity for event triggered animations.

## Vue-Router

I employ the vue router just to simulate how I envisioned the application to behave, based on what I saw in the mockups.
The app has a header that lists the route path. This is not functional and purely representational. The nested menu on the left however, is functional
nested router. (I made a few empty components to show that it works. Name & Address is the only component with content.)

## Vuex

Input data values are stored in state so you can navigate to another component via the nested menu and return to Name & Address to see the data remains.
The 'isEditing' state is also stored so that the different components can react to this state value.

## Velocity.js

Velocity.js is a third party library that I use to animate my web components based on events

## Shared components

All shared components (pure/representational components) are prefixed with 'Pure'. They receive props, render then, and do not mutate anything. The parent
component that integrates any of these pure components will react to store values and pass appropriate values into the pure components as props (including any lambda functions as applicable).

## My own touch of design

I used a color picker to find the exact colors that were being used in the mockups, I made SVGs for the icons in the nav bar, and I added animations to give
visual feed back of what changes on the screen when a user changes to edit mode. These include elements that fade in and out of view, smooth collapse and expand animations for menus, and icons that have subtle movement (the little caret next the nested menu's section titles rotates to point up or down based on whether it can
be expanded or not). All menu items have a darkened background when hovered over (the nested menu and the nav bar).

- caveat: The entire app uses flex-box to be mobile friendly. There are a few elements that don't react to smaller screen sizes. A full implementation would see to these things being remedied.
- caveat: to maximize real estate, a full implementation would see a collapsed nested menu that could be 'dragged' out to be viewed. I imagine, if this screen was
  viewed on a mobile phone, I would want the main component (Name & Address) to take up the entire screen. So I would minimize the nested menu and think about where
  to position it for a good UX. I lean towards collapsing the menu to the left and adding a hamburger icon to the top left of the Name & Address component's view.
  Then either clicking it or dragging it, should open the menu up (to the right), pushing the main view to the right as well.

## Unit testing

I use jest to write unit tests for three components, each in increasing complexity.

- NavBar.spec.js
- PureHeader.spec.js
- LocationForm.spec.js
  - caveat: Documentation for writing tests for functionality that triggers on an event that the api listens to is non existent.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
