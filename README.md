# [GeoFare](https://geofare.github.io/)
GeoFare is a web application developed to map out information about food donations sites to limit the amount of food waste and help out those who live in food scarce environments.
- Features Mobile Compatability
- Includes Google Maps Support
- Simple and User Friendly
- Updated in real time from a Google Cloud database

## How it Works
1. Using the Google Maps API, GeoFare is able to convert addresses to coordinate information through Geocoding. 
2. This location is sent to a Cloud Firestore server to be stored with all other locations in the database.
3. Everytime the website starts up, the data is pulled from the database to a leaflet map and displayed as pins.
4. Clicking on each pin show a popup with a link to a Google Maps page with directions to the location
