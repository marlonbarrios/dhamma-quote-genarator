const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')

const title = document.getElementById('chapter')
const nikaya = document.getElementById('nikaya')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];



function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}



function getNewQuote() {
   
    showLoadingSpinner();

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.legth > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
 
    quoteText.textContent = quote.text;
    nikaya.textContent= quote.nikaya;
    title.textContent= quote.chapterTitle;

   
    removeLoadingSpinner()
}


async function getQuotes() {

   showLoadingSpinner();
    const apiUrl = 'http://palicanon.codebuckets.com.au/api/search/mind/500';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        getNewQuote();
 
    } catch (error) {
alert('oops... try again')
    }
}


function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} +- Twitted from  https://marlonbarrios.github.io/quotegenerator/`;
    window.open(twitterUrl, '_blank');
}

//Evet listeners
newQuoteBtn.addEventListener('click', getNewQuote)
twitterBtn.addEventListener('click', tweetQuote)

//on load
getQuotes();


