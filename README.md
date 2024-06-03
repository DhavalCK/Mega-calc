# Mega-calc
    - Run project with ng serve Or npm run start command

# Update project app logo by replace appicon.ico in src folder

# How to add sitemap.xml file
    - Created xml sitemap file with Free Online Sitemap Generator www.xml-sitemaps.com 
    - Add file in project root directory(means src folder and add in assets configuration in angular.json)
    - Deploy project 
    - Add in google console search

# How to run project as production and on http server locally
    - Run command: ng build --configuration production
    - npm version should be lates
    - Add http-server package: npm i -g http-server
    - Check version: http server - v
    - http-server -p 8080 ./dist/project-name
    - In my case: http-server -p 8080 ./dist/mega-calc