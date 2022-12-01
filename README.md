# Map Template

Be sure to change:

## Firebase Config
This is the most important first thing to change
- in **firebase.js** change the config text from firebase realtime database.
-

## Map
- Focus location : **Leaflet.js** line 34 (new lat long)
- Mapbox urls : **Leaflet.js** line 122+124 (new lat long)

## The Colors
There should always be a **comment color**, a **user color**, and **interface color** (brighter + associated with current user actions).

- Pin colors (need to change the pngs or the svgs) : **markers.js**, **Draw.js**, and **Draw.css**?


- Pin cluster colors : **Leaflet.css** starting at line 119 


- Reply border : **Leaflet.css** line 224 (comment color)
- Reply button : **Leaflet.css** line 249 (comment color)


- Reply button hover : **Leaflet.css** line 258 (user color)
- Reply button admin : **Leaflet.css** line 299 (user color)
- Reply button admin hover : **Leaflet.css** line 310 (user color)


- Sidebar Header : **Sidepanel.css** line 35 (interface color)
- Sidebar Comment : **Sidepanel.css** line 60 (interface color) ?
- Sidebar Comment : **Sidepanel.css** line 68 (interface color)
- Get Started Button : **Sidepanel.css** line 109 (interface color)

## The Titles + Text
- **Draw.js** Line 100 : "What' your relationship to -----------?"
- **PopupComment.js** Line 77 : "What' your relationship to -----------?"
- **Sidepanel.js** : Panel text


## Fonts
- put fonts in **/fonts**
- change font definition and application in **Leaflet.css**
- change font definition and application in **Login.css**
- change font definition and application in **Sidepanel.css**
- 
