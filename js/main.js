
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
	var src = document.getElementById("searchResultContainer")
	// Kill children in div
	clearSearch(src)
	// Add rows
	for (monster of monsterList){
		// Temp stop point to only return a handfull of results. Should be removed later. Test
		if (monster.name=="Air Elemental"){
			break
		}
		// Create row
		var newRow = document.createElement("div");
		newRow.classList.add('searchResult')
		newRow.classList.add('collapsable')
		src.appendChild(newRow)
		// Create cells
		var cellValueList = [
			monster.name,
			monster.size,
			monster.type,
			monster.armor_class,
			monster.hit_points,
			monster.challenge_rating
		]
		for (cellIndex in cellValueList){
			var cellValue = cellValueList[cellIndex]
			var newCell = document.createElement("div");
			if (cellIndex == 0){
				newCell.style.cssText += "flex-grow:2;"
			}
			newCell.innerText = cellValue
			newRow.appendChild(newCell)
		}
		// Add click event lisener for collapsable
		newRow.addEventListener("click", function() {
			this.classList.toggle("active");
			var content = this.nextElementSibling;
			if (content.style.display === "block") {
			  content.style.display = "none";
			} else {
			  content.style.display = "block";
			}
		});
		// Create collapsable section
		var collapsable = document.createElement("div");
		collapsable.classList.add('collapsableContent')
		collapsable.style.display = "none";
		collapsable.innerHTML = "A card with all the monster details will go here"
		src.appendChild(collapsable)
		
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







