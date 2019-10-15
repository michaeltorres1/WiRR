# Group Members and Work Breakdown
### Michael Torres, Lwin Ye, Hakeem Almidan, Kevin Kaminski

<a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/Powered%20by-MongoDB-green.svg"/></a>
<a href="#"><img src="https://img.shields.io/badge/Powered%20by-JavaScript-orange.svg"/></a>
<a href="#"><img src="https://img.shields.io/badge/Powered%20by-React/Redux-blue.svg"></a>
<a href="https://github.com"><img src="https://img.shields.io/badge/Hosted%20on-GitHub-brightgreen.svg"/></a>
# Technologies
#### Stack
- Backend
  - Node
  - Express
  - MongoDB
- Frontend
  - React
  - Redux
#### Noticable Dependencies
- bcrypjs
  - Use: Hash passwords before they get stored in database
- uuid
  - Use: 
- cheerio
  - Use: Scrape inforamtion from certain web pages
- Request
  - Use: Go to a certain webpage
- D3
  - Use: Display data from charts
#### APIs
- [Wikimdeia API](https://www.mediawiki.org/wiki/API:Main_page)
  - Uses: 
    - Search functionality
    - Get total lifetime contributions of certain authors
    
# Background and Overview
WiRR is an application to help determine the reliability of a given Wikipedia's article. The reliability of the article is determined by proprietary reliability index, created by our group. The reliability index is determined by these factors:

  - academic citations will have the highest weighted score (ex: books, scholarly journals)
  - website - different web domain will have diffent weighted score (ex: .edu domain will have more weighted score compare to a .com domain)
  - contributors frequency of contribution
    - contributed frequency of a contributor
  - update frequency of an article


# Screenshots
## Landing page
<img src="./client/src/img/landing-page.jpg">

## Register page
<img src="./client/src/img/register-page.jpg">

## Login page
<img src="./client/src/img/login-page.jpg">

# Future Implementations/Features
  - Ability for user to save favorite articles