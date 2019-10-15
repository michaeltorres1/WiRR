# Group Members and Work Breakdown
### Michael Torres, Lwin Ye, Hakeem Almidan, Kevin Kaminski

<a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/Powered%20by-MongoDB-green.svg"/></a>
<a href="#"><img src="https://img.shields.io/badge/Powered%20by-JavaScript-orange.svg"/></a>
<a href="#"><img src="https://img.shields.io/badge/Powered%20by-React/Redux-blue.svg"></a>
<a href="https://github.com"><img src="https://img.shields.io/badge/Hosted%20on-GitHub-brightgreen.svg"/></a>

# Wikipedia Realiability Rater (WiRR)

[WiRR Live](http://www.wikipediarr.com/)

## Background and Overview
WiRR is an application to help determine the reliability of a given Wikipedia's article. The reliability of the article is determined by our custom made reliability index. The reliability index is determined mainly by citations. The citations have the following scoring:
  | Domain / Source        | Score         |
  |:-----------------------|:--------------|
  | text/scholarly article | 5             |
  | `.edu` / `.gov`        | 4             |
  | `.org`                 | 3             |
  | `.com` / `.net`        | 1             |

This would then be divided by the maximum total score and multiplied by 100 to get a percentage.

## Technologies
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



## Future Implementations/Features
  - Ability for user to save favorite articles
  - Integration of author lifetime contributions into reliability score
    - If author with high number of lifetime contributions has written a significant portion of article, then article becomes more reliable.
