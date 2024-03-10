const apiKey="84afa1a8dd834e7a90b93a107b1b67b0";


const blogContainer=document.getElementById("blog-container");

const searchField=document.getElementById('search-input')
const searchButton=document.getElementById('search-button')

 async function fetchRandomNews(){
    try{
        const apiUrl=`https://newsapi.org/v2/everything?q=tesla&pageSize=20&apikey=${apiKey}`
        const response =await fetch(apiUrl);

        const data=await response.json();
        return data.articles;
        

    }catch(error){
        console.error("errror 404 not found")
        return [];
    }
}   

    searchButton.addEventListener("click", async()=>{
        const query=searchField.value.trim();
        if(query!==""){
            try{
            const articles=await fetchNewsQuery(query)  
            displayBlog(articles);                
            }
            catch(error){
                console.log("invalid input",error)
            }
        }
    });

    async function fetchNewsQuery(query){
        try{
            const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=20&apikey=${apiKey}`;
            const response =await fetch(apiUrl);
    
            const data=await response.json();
            return data.articles;
            
    
        }catch(error){
            console.error("errror 404 not found")
            return [];
        }

    }

    function displayBlog(articles){
        blogContainer.innerHTML="";
        articles.forEach((article)=>{
            const blogCard=document.createElement("div");
            blogCard.classList.add("blog-card")
            const img=document.createElement("img");
            img.src=article.urlToImage;
            img.alt=article.title;
            const title=document.createElement("h2");
            const truncatedTitle=article.title.length>30? article.title.slice(0,30)+"----": article.title;
            title.textContent=truncatedTitle;
            const description=document.createElement("p");
            const truncateddes=article.description.length>100? article.description.slice(0,30)+"----": article.description;
            description.textContent=truncateddes;

            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);
            blogCard.addEventListener('click',()=>{
                window.open(article.url,"_blank");
            });
            blogContainer.appendChild(blogCard);

        });
    
    }

    (async ()=>{
        try{
            const articles=await fetchRandomNews();
            displayBlog(articles);
            // console.log(articles);
        }catch(error){
            console.log("error 404",error);
        }
    })();