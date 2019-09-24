# Group Members and Work Breakdown
### Michael Torres, Lwin Ye, Hakeem Almidan, Kevin Kaminski

# Background and Overview
WiRR is an application to help determine the reliability of a given Wikipedia's article. The reliability of the article is determined by proprietary reliability index, created by our group. The reliability index is determined by these factors:

  - academic citations will have the highest weighted score (ex: books, scholarly journals)
  - website - different web domain will have diffent weighted score (ex: .edu domain will have more weighted score compare to a .com domain)
  - contributors frequency of contribution
    - contributed frequency of a contributor
  - update frequency of an article

# Functionality and MVP

### 1. User Auth (**Michael** 1.5 days)
  - User can sign up, sign in, log out
  - User can have an avatar
  - Logged in user can access favorite articles and categories

### 2. User's favorite (**Michael** .5 days)
  - User can CRUD favorite articles and categories

### 3. Search for by keyword (**Lwin** 2.5 days)
  - User can search an article by wikipedia's web address or by category
  - When searched by web address
    - display WiRR's article show page
  - When searched for by category
    - display article show page link based on WiRR score (top 10)
    - each link will have corresponding WiRR score

### 4. Web crawling/scraping (3 days)
  - Parse article's info, such as, title, short description and etc ... (**Hakeem & Kevin**)
  - Parse each reference (**Hakeem & Kevin**)
    - determine type of reference and give it a raw score
    - determine a weighted score of a reference category
  - Parse contributors' data (**Lwin & Michael**)
    - total contribution per contributor
    - percentage of contribution of an article made by each contributor
  - Parse update timestamp (**Lwin & Michael**)

### 5. Scoring algorithm (**All** 1 day)
  - determining a base score from references
    - each reference is assigned a weighted score based on type & number of references
  - determining a score modifier from contributors
    - modifier will be calculated base on the reliability of a reference

### 6. Implement charts (**Kevin** 2 days)
  - uses chart.js and/or D3 to visualize data

### 7. CSS for frontend (**All, but mostly Michael & Kevin** 2 days)
  - design layout for splash page, user auth pages, search result page and article show page

# Technologies and Technical Challenges
## Backend: Node, Express, MongoDB
  - WiRR will have two models (users and Wikipedia's article pages), and a fixed schema for both models
  - MongoDB is preferred for fast lookup and ability to keep user's data in one document/model

## Frontend: React with Redux
  - The reliability index scoring factors will be visualize using D3/Chart.js library
  - The visualization will take the form of pie charts, radar charts and bar graphs

  ---

## Day 1
  - Splash page layout - **All**
  - User Auth/CSS for user auth - **Michael**
  - Parse citation data - **Kevin & Hakeem**
  - Readme - **Michael & Lwin**
  - Example db schema - **Lwin**
  - Come up with site's overall scheme - **Kevin**

## Day 2
  - Continue user Auth/CSS for user auth - **Michael**
  - Implement D3/Chart.js for visualization - **Kevin**
  - continue parse citation data - **Kevin & Hakeem**
  - Wikipedia's media API (parsing contributor's data) **Lwin & Michael**

## Day 3
  - Continue Wikipedia's media API (parsing contributor's data) **Lwin & Michael**
  - continue parse citation data - **Kevin & Hakeem**
  - continue implementation of D3/Chart.js for visualization - **Kevin**
  - Begin scoring algorithm

## Day 4
  - Finish algorithm - **All**
  - Integrate everyone's parts - **All**
  - check validation - **All**

## Day 5
  - continue integrate everyone's parts - **All**
  - check validation - **All**

## Day 6
  - edge case testing - **All**
  - polish UI/UX - **All**

## Day 7
  - polish UI/UX - **All**