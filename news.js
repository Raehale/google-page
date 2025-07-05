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
// TODO: Get dates date for the fetch
// if no news get yesterday, day before blah blah until you get article
export function getNews() {
    // console.log(date)
    let excludedWords = '';
    badWordsArr.forEach(word => {
        excludedWords += '-' + word;
    })
    console.log(`https://newsapi.org/v2/everything?language=en&q=rat${excludedWords}&sortBy=publishedAt&apiKey=0a1dac704b2d4c8d84d0a4b92d75c81d`)
    fetch(`https://newsapi.org/v2/everything?language=en&q=rat&sortBy=publishedAt&apiKey=0a1dac704b2d4c8d84d0a4b92d75c81d`)
    // fetch("https://newsapi.org/v2/everything?language=en&q=rat&from=2025-05-28&sortBy=publishedAt&apiKey=0a1dac704b2d4c8d84d0a4b92d75c81d")
        .then(res => {
            if (!res.ok) {
                throw Error("Something went wrong");
            }

            return res.json();
        })
        .then(data => {
            // make sure there are results for that date
            // console.log(data)
            // if (data.totalResults === 0) {
            //     date.setDate(date.getDate() + 1);
            //     getNews(date);
            // }
            // make sure the word rat is used in the title
            data.articles.forEach(article => {
                // console.log(article)
                let usesBadWord = false;
                if (article.title.includes('rat') || article.title.includes('Rat')) {
                    badWordsArr.forEach((word) => {
                        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
                        if (article.title.includes(word) || article.title.includes(capitalizedWord)) {
                            usesBadWord = true;
                        }
                    });
                    if (!usesBadWord) {
                        // console.log('no bad word')
                        createNewsElement(article);
                    }
                }
            });
        })
        .catch(err => {
            console.error(err)
        });
}

function createNewsElement(articleInfo) {
    // console.log(articleInfo);
    const newsEl = document.getElementById('news');
    newsEl.innerHtml = /*HTML*/`
        <a href="https://www.independent.ie/irish-news/courts/murder-accused-called-friend-supergrass-and-a-rat-hours-before-fatal-stabbing-court-hears/a997307164.html" class="article" target="_blank">
            <img src="https://focus.independent.ie/thumbor/5qpTh03BQ10Lt8cem-Vsm7OzVjU=/0x14:800x547/629x0/prod-mh-ireland/2ffc5c55-60d7-4266-a43c-95977457a897/1671cf4a-02c0-4454-b09c-d67f5de6230e/2009c95b-3b11-4305-b843-5b0c1e91997a.jpg" />
            <div>
                <h2>Murder accused called friend 'supergrass' and a ‘rat’ hours before fatal stabbing, court hears</h2>
                <p>A jury has heard that a murder accused was recorded calling his friend a "supergrass" and a "rat", during an exchange 
                    in which the defendant also told his alleged victim: "I'll stab you straight into your neck."
                </p>
                <p class="author">Eoin Reynolds</p>
            </div>
        </a>
    `;
}

// function getISO8601Date(date) {
//     let day = date.getDate();
//     if (day < 10) {
//         day = '0' + day;
//     }
//     let month = date.getMonth() + 1; // months are zero-based
//     if (month < 10) {
//         month = '0' + month;
//     }
//     const yyyy = date.getFullYear();
//     const ISO8601Date = yyyy + '-' + month + '-' + day;

//     return ISO8601Date;
// }
