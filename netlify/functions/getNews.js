const axios = require('axios');

exports.handler = async function(event, context) {
  const API_KEY = process.env.NEWS_API_KEY; 
  console.log(API_KEY,'API_KEY')
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        pageSize: 20,
        apiKey: API_KEY,
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.articles), 
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
