const NYTapiUrl = 'https://api.nytimes.com/svc/topstories/v2/'
const apiKey = api_key.KEY; 
 
//const nytSections  = 'travel'; 
//nytSections массив

const nytSections = [
   "home",
   "arts",
   "automobiles",
  "books",
  "business",
   "fashion",
  "food",
  "health",
  "insider",
  "magazine",
  "movies",
  "nyregion",
  "opinion",
  "politics",
  "realestate",
  "science",
   "sports",
  "sundayreview",
   "technology",
  "theater",
  "magazine",
  "travel",
   "upshot",
   "us",
  "world",
]



console.log('apiKey: ', apiKey ? "действующий apiKey" : "недействующий apiKey"); 

function buildUrl (url) {
	
	console.log('NYTapiUrl: ' ,NYTapiUrl);
	console.log('url: ', url);
	// console.log('apiKey: ', apiKey); 
	// Y03P6xCTxsn5aoqmJZxT7BJcLMdWZXuA
	
    return NYTapiUrl + url + ".json?api-key=" + apiKey;  
}

//Vue.component(tag, options)
Vue.component('news-list', {
    props: ['results'], 
    template: `
        <section>
            <!-- <div class="row" v-for="posts in newsPosts"> упрощение -->
			
                <div class="columns large-3 medium-6" v-for="post in results">
                    <div class="card">
					
                        <div class="card-title">
						<!-- <span class="bold">post.title</span>: --> 
								<a :href="post.url" target="_blank" class="linkcolor">
									{{ post.title }}
								</a>
                        </div>
						
						<div v-if="post['multimedia'] != null" class="media-object-section">
						<!-- картинка-заглушка, если post['multimedia'] - null -->
							<!--
							<span class="bold">post.url</span>: 
							<a :href="post.url" target="_blank">{{post.url}}</a> 
							-->
							<img :src="post.multimedia[1].url">
						</div>
						<div v-else>
						  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9SnNUKamw7c_kGjvIQOTzcFji_-HL9f5sLQ&usqp=CAU">
						</div>
						
                        <div class="card-abstract">
                            <!-- <span class="bold">post.abstract</span>: -->
							<p>{{ post.abstract }}</p>
                        </div>

						<div class="card-section">
								<!-- <span class="bold">post.section</span>: -->
							<p class="cursor"><small>рубрика: {{ post.section }}</small></p>
								<!-- <span class="bold">post.published_date</span>: --> 
							<p><small>опубликовано: {{ post.published_date.slice(0,10) }}</small></p>
                        </div>
						
                    </div>
                </div>
				
            <!-- </div> -->
        </section>
    `,
    /*
	computed: {
		// количество карточек на экране
        newsPosts() {
            let posts = this.results;
			console.log('posts ', posts);

            let i;
			let j;
			let fragmentArray = []; 
			let chunk = 4;
            for (i=0, j=0; i < posts.length; i += chunk, j++) {
                fragmentArray[j] = posts.slice(i,i+chunk);
            }
			console.log('posts.length: ', posts.length);
			console.log('fragmentArray ',  fragmentArray.length);
			return fragmentArray;
        }
    }
	*/
})

console.log('nytSections.length: ', nytSections.length); //>>26
let random = Math.floor(Math.random()  * nytSections.length) 
console.log('random: ', random);
const randomsection = nytSections[random];
console.log('randomsection: ', randomsection);
console.log('typeof randomsection: ', typeof randomsection);
let section = randomsection; 

const vm = new Vue({
    el: "#news", 
    data: {
        results: [],
	    section, 
		//section ? section : "arts"
        //section: 'arts' // section по дефолту
    }, 
     mounted() {
        this.getPosts(this.section);
		console.log('this.section: ', this.section);
    }, 
    methods: {
        getPosts(section) {
            let apirequest = buildUrl(section); 
			console.log('api request:   ====> ', apirequest);
			console.log('section:   ====> ', section);
			
			// https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=Y03P6xCTxsn5aoqmJZxT7BJcLMdWZXuA
            axios.get(apirequest).then((response) => {
                this.results = response.data.results; 
            }).catch( error => { console.log('Error: ',error); }); 
			
        }
    }, 
}); 