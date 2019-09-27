# Database Schema

```js
const users = {
  email: {
    type: String,
    required: true,
    unique: true
  },
  pass_digest: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
  date: {
    type: Date,
    default: Date.now
  }
}

const categories = {
  cat1: {
    type: [],
  }
  cat2: {
    type: [],
  }
  cat3: {
    type: []
  }
}

const articles = {
  art1 {
    title: {
      type: String,
      required: true
    },
    snippet: {
      type: String,
      required: true
    },
    description: {
      type: Text,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    category: {
      type: [],
      required: true
    },
    references: {
      type: [],
      required: true
    },
    timestamp: {
      type: String,
      required: true
    }
    contributors: {
      contributor1: {
        username: {
          type: String,
          required: true
        },
        totalContributions: {
          type: Number,
          required: true
        },
        percentContributedToArticle: {
          type: Number,
          required: true
        }
      }
    },
    wirrScore: {
      type: Number,
      required: true
    }
  }
}
```