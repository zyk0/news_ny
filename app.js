const NYTapiUrl = 'https://api.nytimes.com/svc/topstories/v2/'
const apiKey = api_key.KEY; 
 
//const nytSections  = 'travel'; 
//nytSections массив
/*
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
  "obituaries",
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
*/
console.log('apiKey: ', apiKey ? "действующий apiKey" : "недействующий apiKey"); 

function buildUrl (url) {
    return NYTapiUrl + url + ".json?api-key=" + apiKey;  
}

// Vue.component(tag, options)
Vue.component('news-list', {
    props: ['results'], 
    template: `
        <section>
            <div class="row" v-for="posts in newsPosts">
                <div class="columns large-3 medium-6" v-for="post in posts">
                    <div class="card">
                        <div class="card-title">
                            {{ post.title }}
                        </div>
						<div class="">
							<a :href="post.url" target="_blank"><img :src="post.image_url"></a>  
						</div>
                        <div class="card-abstract">
                            <p>{{ post.abstract }}</p>
                        </div>

						<div class="card-section">
                            <p><small>рубрика: {{ post.section }}</small></p>
							<p><small>опубликовано: {{ post.published_date.slice(0,10) }}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    computed: {
        newsPosts() {
            let posts = this.results;
			console.log('posts ', posts);
			
			//картинка для поста

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
})

const vm = new Vue({
    el: "#news", 
    data: {
        results: [],
        section: 'arts' // section по дефолту , например, 'arts'
    }, 
     mounted() {
        this.getPosts(this.section);
    }, 
    methods: {
        getPosts(section) {
            let url = buildUrl(section); 
			console.log('url: ', url);
            axios.get(url).then((response) => {
                this.results = response.data.results; 
            }).catch( error => { console.log('Error: ',error); }); 
        }
    }, 
}); 