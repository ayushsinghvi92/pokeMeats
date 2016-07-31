var fs = require("fs");
var jsonfile = require('jsonfile')
var content = fs.readFileSync("pokemon.json");
var pokemon = JSON.parse(content);
var path = require ("path");

var formattedPokemon = [];
var outfile = path.join(__dirname,"pokeSeed.json");

function zeros(key) {
	key = "00" + key;
	return key.slice(key.length - 3, key.length)
}

function pricing (x) {
	if (typeof x == "undefined") return 100;
	return Number((100 / x).toFixed(2));
}

var items = ["Tail", "Feet", "Liver", "Tongue", "Belly", "Bacon", "Sausage", "Brain", "Shoulder", "Ears", "Toes"];
var dummyParagraph = "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
for (_pokemon in pokemon) {
	formattedPokemon.push({
		"name": pokemon[_pokemon].name,
		"type": pokemon[_pokemon].type,
		"price": pricing(pokemon[_pokemon].probability),
		"description": dummyParagraph,
		"photo": "/" + zeros(_pokemon) + "%20" + pokemon[_pokemon].name + ".ico",
		"inventoryAmount": 10,
		"tags": ["#" + pokemon[_pokemon].type]
	});
}

formattedPokemon = formattedPokemon.map(function(pokemon){
	var index = Math.floor(Math.random() * 10)
	pokemon.name = pokemon.name + " " + items[index]
	pokemon.tags.push("#" + items[index])
	return pokemon;
})

jsonfile.writeFile(outfile, formattedPokemon, function(err){
	console.error(err);
})

var users = [];
var outfile2 = path.join(__dirname, "userSeed.json");

var first_names = ["Sean", "SJ", "Jackson", "Ayush", "Omri"];
var last_names = ["Han", "Kim", "Brietzke", "Singhvi", "Bernstein"];
var emails = ["sean@pokeMeats.com", "sj@pokeMeats.com", "jackson@pokeMeats.com", "ayush@pokeMeats.com", "omri@pokeMeats.com"];
var passwords = ["sean", "sj", "jackson", "ayush", "omri"];
const _address = {
    "line1": "5 Hanover Square",
    "line2": "Fullstack Academy",
    "city": "New York",
    "state_region": "New York",
    "country": "USA",
    "zipcode": 10001

}
const _order = {
	"session_type": "user",
	"checkout_status": "in_progress"
}

for (var i = 0; i < first_names.length; i++) {
	users.push({
		"first_name": first_names[i],
		"last_name": last_names[i],
		"email": emails[i],
		"password": passwords[i],
		"addresses": _address,
		"orders": _order
	})
}

jsonfile.writeFile(outfile2, users, function(err){
	console.error(err);
})


