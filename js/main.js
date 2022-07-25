
//window.resizeTo(600, 600)

/*
console.log("Testing test:")
window.localStorage.setItem('test', 'Test');
test = window.localStorage.getItem('user');
console.log(test)
*/


/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
	document.getElementById("mySidebar").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
	document.querySelector('div[class="sidebarClose"]').style.display = "block";
	document.querySelector('div[class="sidebarOpen"]').style.display = "none";
	console.log("try")
	console.log(monsterList)
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
	document.getElementById("mySidebar").style.width = "0";
	document.getElementById("main").style.marginLeft = "0";
	document.querySelector('div[class="sidebarClose"]').style.display = "none";
	document.querySelector('div[class="sidebarOpen"]').style.display = "block";
  } 

var monsterList

// SetJSONS from stroage (async)
fetch("./json/Monsters.json")
	.then(response => {return response.json();})
	.then(jsondata => monsterList = jsondata);



//Fields to search with:name, size, type, armor_class, hit_points, hit_dice, speed type,challenge_rating

function search(){
	var srDiv = document.getElementById("searchResults")
	// Kill children in div
	clearSearch(srDiv)
	// Draw new rows
	for (monster of monsterList){
		var newRow = document.createElement("div");
		newRow.innerText = monster.name
		srDiv.appendChild(newRow)
	}
}

// Clears search results, takes the search results div element
function clearSearch(e){
	var child = e.lastElementChild; 
	while (child) {
		e.removeChild(child);
		child = e.lastElementChild;
	}
}







