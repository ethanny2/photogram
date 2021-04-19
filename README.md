# Photogram

### Instagram clone made with React, Tailwind CSS, Firebase/Firestore, Amazon S3 Bucket and tested with React Testing Library + Jest and Cypress.
<br>

<p align="center">
  <img width="550" height="300" src="https://media1.giphy.com/media/bqb3SVL4FnL2x5ojl6/giphy.gif" alt="Photogram Demo gif">
</p>

<br>

## Project layout

```
photogram
│   README.md
│   LICENSE.md    
└─── client
│     └─── coverage
│     └─── cypress
│     └─── public
│     └─── src
|           └─── __tests
|           └─── components
|           └─── constants
|           └─── context
|           └─── fixtures
|           └─── helpers
|           └─── hooks
|           └─── images
|           └─── lib
|           └─── pages
|           └─── services
|           └─── utils    
└─── server
        app.js
```

## Background
The concept for this project was to go beyond the usual React demo applications that recreate the web app of some popular service such as Netflix, Airbnb, and Instagram etc... But without having any real functionality. Photogram aims to replicate most features found in the official Instagram web application while supplementing it with features/improvements that could be incorporated into the offical Instagram web application.

## Features
- Sign Up / Login with persistence through Firebase Auth
- Timeline of photos made by account you follow
- Commenting and liking photos
- Ability to double tap to like a photo with Tailwind heart animation
- Footer navigation on smaller width devices to ensure all the functionality of the app is still accessible
- Lightbox made using React Portals to view photo when there are more than 3 comments
- State synchronization through Context between Lightbox and timeline/profile photo
- Suggestion sidebar on devices with larger widths to find new accounta to follow
- Search bar with lodash debounce to search for users
- Ability to create a new post with image preview through Amazon S3 Buckets
- Notifications that are updated in real time through Firestore snapshot listeners
- Explore page with custom infinite scroll hook and Tailwind loader animation to browse random photos
- Profile pages for individual users which can be visited by unauthenticated users (no commenting and liking) and authenticated users
- Settings to change username, profile picture, bio and password
- Settings to delete account
- Integration testing through React Testing Library 

## Credits 

- [Instagram](https://www.instagram.com/) for the design and functionality
- [Karl Hadwen](https://github.com/karlhadwen) for his video tutorial (most features in Photogram are not found in the tutorial).

