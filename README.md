# Group Members and Work Breakdown
### Michael Torres, Lwin Ye, Hakeem Almidan, Kevin Kaminski

<a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/Powered%20by-MongoDB-green.svg"/></a>
<a href="#"><img src="https://img.shields.io/badge/Powered%20by-JavaScript-orange.svg"/></a>
<a href="#"><img src="https://img.shields.io/badge/Powered%20by-React/Redux-blue.svg"></a>
<a href="https://github.com"><img src="https://img.shields.io/badge/Hosted%20on-GitHub-brightgreen.svg"/></a>

# Background and Overview
WiRR is an application to help determine the reliability of a given Wikipedia's article. The reliability of the article is determined by proprietary reliability index, created by our group. The reliability index is determined by these factors:

  - academic citations will have the highest weighted score (ex: books, scholarly journals)
  - website - different web domain will have diffent weighted score (ex: .edu domain will have more weighted score compare to a .com domain)
  - contributors frequency of contribution
    - contributed frequency of a contributor
  - update frequency of an article

# Technologies and Technical Challenges
## Backend: Node, Express, MongoDB
  - WiRR will have two models (users and Wikipedia's article pages), and a fixed schema for both models
  - MongoDB is preferred for fast lookup and ability to keep user's data in one document/model

## Frontend: React with Redux
  - The reliability index scoring factors will be visualize using D3/Chart.js library
  - The visualization will take the form of pie charts, radar charts and bar graphs

# Future Implementations/Features
  - Ability for user to save favorite articles