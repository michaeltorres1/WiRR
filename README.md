# Background and Overview
WiRR is an application to help determine the reliability of a given Wikipedia's article. The reliability of the article is determined by proprietary reliability index, created by our group. The reliability index is determined by these factors:

  - academic citations will have the highest weighted score (ex: books, scholarly journals)
  - website - different web domain will have diffent weighted score (ex: .edu domain will have more weighted score compare to a .com domain)
  - contributors frequency of contribution
    - contributed frequency of a contributor
  - update frequency of an article

# Functionality and MVP

  - Allow user to input a Wikipedia's article web address to determine its' reliability score
  - Visual graph representation of different type of reliability index scoring factors (ex: )
  - Allow user to favorite/save articles
  - mobile friendly web application (bonus)

# Technologies and Technical Challenges
## Backend: Node, Express, MongoDB
  - WiRR will have two models (users and Wikipedia's article pages), and a fixed schema for both models
  - MongoDB is preferred for fast lookup and ability to keep user's data in one document/model

## Frontend: React with Redux
  - The reliability index scoring factors will be visualize using D3/Chart.js library
  - The visualization will take the form of pie charts, radar charts and bar graphs


# Group Members and Work Breakdown
### Michael Torres, Lwin Ye, Hakeem Almidan, Kevin Kaminski

## Day 1
  - Splash page layout - **All**
  - User Auth - **Michael**
  - Parse citation data - **Kevin & Hakeem**
  - Readme - **Michael & Lwin**
  - Setup Wikipedia's article page schema - **Lwin**

## Day 2
  - User Auth - **Michael**
  - Implement D3/Chart.js for visualization - **Kevin**
  - continue parse citation data - **Kevin & Hakeem**
  - Wikipedia's media API (parsing contribution data) **Lwin & Michael**

## Day 3
  - Continue Wikipedia's media API (parsing contribution data) **Lwin & Michael**
  - continue parse citation data - **Kevin & Hakeem**
  - continue implementation of D3/Chart.js for visualization - **Kevin**

## Day 4
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