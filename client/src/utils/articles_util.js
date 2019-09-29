import axios from 'axios';

export const createArticle = (article) => {
  // const body = JSON.stringify({article});
  // debugger;
  return (
    axios.post('/api/articles/', article)
  )
}

export const searchDB = (keyword) => {
  return (
    axios.get(`/api/articles/search/${keyword}`)
  )
}

let request = require('request')
// let rp = require('request-promise');
// used to make HTTP requests
// Basically goes inside the page that you make a request to
let cheerio = require('cheerio')
// used to parse the HTML elements on the page
// Pretty much the same as using jQuery
// but MUCH faster than JS DOM and jQuery
// Docs say that it is about 8x faster than JS DOM
let URL = require('url-parse')
// used to parse URLs
const util = require('util');

export async function visitPage(pageUrl) {
  // The proxy url is used to allow Cross Origin Resource Sharing (CORS)
  // TODO : Review if this exposes any security vulnerability
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const httpRequest = util.promisify(request)
  const response = await httpRequest((proxyurl + pageUrl))

  return response;
}

export const getAllDomains = (urls) => {
  // @desc: Given a list of urls, grab domains from each one by extracting it from each
  // website's hostname ( example hostname: 'www.wikipedia.org' )
  let allDomains = [];
  urls.forEach(url => {
    const packagedUrl = new URL(url).hostname
    let domain;

    for (let i = packagedUrl.length; i > 0; i--) {
      if (packagedUrl === 'books.google.com') {
        domain = packagedUrl
        break
      } else if (packagedUrl[i] === '.') {
        domain = packagedUrl.slice(i + 1)
        break
      }
    }

    allDomains.push(domain)
  })

  return allDomains
}

export const getCredibilityScore = (domains, textCitationCount, totalCitationCount) => {
  let pageReliabilityScore = 0;

  domains.forEach(domain => {
    let score;
    switch (domain) {
      case 'books.google.com':
        score = 5;
        break;
      case "gov":
        score = 4;
        break;
      case 'edu':
        score = 4;
        break;
      case 'org':
        score = 3;
        break;
      default:
        score = 1;
        break;
    }
    pageReliabilityScore += score;
  })

  pageReliabilityScore += (textCitationCount * 5)
  const pageReliabilityPercentage = (pageReliabilityScore / (totalCitationCount * 5)) * 100

  return pageReliabilityPercentage
}

export const processScore = (res) => {
  if (res.statusCode === 200) {

    const $ = cheerio.load(res.body)

    const allATagCitations = $("li[id^='cite_note'] a[rel='nofollow']:first-child")
    const allCitations = $("li[id^='cite_note']")
    const textCitationCount = allCitations.length - allATagCitations.length
    let allCitationUrls = [];

    allATagCitations.each(function () {
      allCitationUrls.push($(this).attr('href'))
    })

    const allDomains = getAllDomains(allCitationUrls)

    let score = getCredibilityScore(allDomains, textCitationCount, allCitations.length);
    return `${score.toFixed(2)}`;
  }
}