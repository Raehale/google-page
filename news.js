const badWordsArr = [
    // words with rat in them
    'democrat',
    'ratio',
    'glabrata',
    // words with bad stories
    'infest',
    'drop',
    //idek, just wrong
    'ratshaker',
]

//gets recent news about [rats]
export function getNews() {
    fetch("https://newsapi.org/v2/everything?language=en&q=rat&from=2025-05-28&sortBy=publishedAt&apiKey=0a1dac704b2d4c8d84d0a4b92d75c81d")
        .then(res => {
            if (!res.ok) {
                throw Error("Something went wrong");
            }

            return res.json();
        })
        .then(data => {
            // console.log(data)
            //make sure the word rat is used in the title
            data.articles.forEach(article => {
                // TODO: make an array of words it can't be like and iterate through that, this is icky
                let usesBadWord = false;
                if (article.title.includes('rat') || article.title.includes('Rat')) {
                    badWordsArr.forEach((word) => {
                        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
                        if (article.title.includes(word) || article.title.includes(capitalizedWord)) {
                            usesBadWord = true;
                        }
                    });
                    if (!usesBadWord) {
                        console.log(article);
                    }
                }
            });
        })
        .catch(err => console.error(err));
}