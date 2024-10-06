//get github repos
export function getThreeRecentRepos() {
    fetch("https://api.github.com/users/raehale/repos")
        .then(res => res.json())
        .then(data => {
            displayGithubRepos(data);
        });
    
    function displayGithubRepos(reposArr) {
        getOrderedArr(reposArr)
    }
    
    function getOrderedArr(reposArr) {
            let reposSortedByUpdate = reposArr.sort(sortDates);
        
            function sortDates(a, b) {
                return (a.updated_at > b.updated_at) ? -1 : 1;
            }
    
            topThreeRepos(reposSortedByUpdate);
    }
    
    let topRepos = {}
    function topThreeRepos(reposArr) {
        topRepos.one = reposArr[0];
        topRepos.two = reposArr[1];
        topRepos.three = reposArr[2];
    
        displayRecentRepos(topRepos);
    }
    
    function displayRecentRepos(topRepos) {
        for (const repo in topRepos) {
            document.getElementById("githubRepos").innerHTML += `
                    <a href="https://github.com/Raehale/${topRepos[repo].name}">
                        <div class="repo">
                            <h3>${topRepos[repo].name}</h3>
                            <div class="repo-details">
                                <p class="language">
                                    <i class="fa-solid fa-circle-dot ${topRepos[repo].language}-icon"></i> ${topRepos[repo].language}
                                </p>
                                <p class="last-contribute">
                                    ${new Date(topRepos[repo].updated_at).toString().substring(0, 21)}
                                </p>
                            </div>
                        </div>
                    </a>
                `;
        };
    }
}

//makes a link to create a new repository on github
// import { Octokit } from "https://esm.sh/@octokit/core";
// window.Octokit = new Octokit({userAgent: 'Rae'});
export function createNewRepo() {
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("newRepoBtnIcon").addEventListener("click", (event) => {
            console.log(document.getElementById("newRepoBtn"))
            const newRepoName = document.getElementById("newRepoInput").value;
            console.log('newRepoName')
        });
    });
    
    // function displayCreateNewGithubRepo(data) {
    //     const newRepoEl = document.getElementById("newRepo");
    //     const newRepoName = document.getElementById("newRepoInput").value
    //     console.log(newRepoName)
    // }
    
    // const octokit = new Octokit({
    // });
    
    // try {
    //     const result = await octokit.request("POST /orgs/Raehale/repos", {
    //                         org: "Raehale",
    //                         name: "octocat",
    //                     })
    //     displayCreateNewGithubRepo(result);
    // } catch (error) {
    //     console.log(error)
    // }
}