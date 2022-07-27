
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
			//break
		}
		// Add row with collapsable card for monster
		var collapsableContentCard = makeMonsterRow(src, monster)
		// Add collapsable card with monster details
		makeMonsterCard(collapsableContentCard, monster)
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

function makeMonsterRow(parentDiv, monster){
	// Create row
	var newRow = document.createElement("div");
	newRow.classList.add('searchResult')
	newRow.classList.add('collapsable')
	parentDiv.appendChild(newRow)
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
	var collapsable = document.createElement("div");
	collapsable.classList.add('collapsableContent')
	collapsable.style.display = "none";
	parentDiv.appendChild(collapsable)
	return collapsable
}

// Create a monster card parented to parentDiv
function makeMonsterCard(parentDiv, monster) {
	// Monster card
	var monsterCard = document.createElement("div");
	monsterCard.classList.add('monsterCard')
	parentDiv.appendChild(monsterCard)

	// Header bar
	var headerBar = document.createElement("div");
	headerBar.classList.add("mc_header")
	monsterCard.appendChild(headerBar)

	// Stat blocks
	const statList = {
		"STR:" : "strength",
		"DEX:" : "dexterity",
		"CON:" : "constitution",
		"INT:" : "intelligence",
		"WIS:" : "wisdom",
		"CHA:" : "charisma",
	}
	for (shortName in statList){
		const longName = statList[shortName]
		var statDiv = document.createElement("div")
		statDiv.innerHTML = '<span>' + shortName + '&nbsp;' + monster[longName] + '</span>'
		headerBar.appendChild(statDiv)
	}

	// Body
	var body = document.createElement("div");
	body.classList.add('mc_body')
	monsterCard.appendChild(body)
	// Left
	var bodyLeft = document.createElement("div");
	bodyLeft.classList.add('mc_body_left')
	body.appendChild(bodyLeft)
	// Right
	var bodyRight = document.createElement("div");
	bodyRight.classList.add('mc_body_right')
	body.appendChild(bodyRight)

	//Left side title and body pairs
	makeMonsterCard_left(bodyLeft, monster)

	//Right side title and body pairs
	makeMonsterCard_right(bodyRight, monster)
	
}	

// Create left-side monster card entries
function makeMonsterCard_left(parentDiv, monster){
	const sectionOrderList = [
		"speed",
		"senses",
		"proficiencies",
		"damage_vulnerabilities",
		"damage_resistances",
		"damage_immunities",
		"condition_immunities"
	]

	// Create each subsection (title/body pairs)
	for (section of sectionOrderList){
		// Get # of entries for this key in monster
		var sectionLength = monster[section].length
		if (typeof sectionLength == "undefined"){
			sectionLength = Object.keys(monster[section]).length
		}

		if (sectionLength > 0){
			//Title
			var titleName = section.replace("_", "&nbsp;")
			const titleDiv = document.createElement("div");
			titleDiv.classList.add('mc_body_title')
			titleDiv.innerHTML = titleName
			parentDiv.appendChild(titleDiv)

			//Body
			const bodyDiv = document.createElement("div");
			bodyDiv.classList.add('mc_body_list')
			parentDiv.appendChild(bodyDiv)

			//List items for rows in body
			const ulDiv = document.createElement("ul");
			bodyDiv.appendChild(ulDiv)
			if (section=="speed" || section=="senses"){
				for (k in monster[section]){
					const v = monster[section][k]
					const liDiv = document.createElement("li");
					liDiv.innerHTML = k.replace("_", "&nbsp;") + ':&nbsp;' + v
					ulDiv.appendChild(liDiv)
				}
			}
			if (section=="damage_vulnerabilities" || section=="damage_resistances" || section=="damage_immunities"){
				for (v of monster[section]){
					const liDiv = document.createElement("li");
					liDiv.innerHTML = v
					ulDiv.appendChild(liDiv)
				}
			}
			if (section=="condition_immunities"){
				for (v of monster[section]){
					const liDiv = document.createElement("li");
					liDiv.innerHTML = v.name
					ulDiv.appendChild(liDiv)
				}
			}
			if (section=="proficiencies"){
				for (profItem of monster[section]){
					const liDiv = document.createElement("li");
					liDiv.innerHTML = profItem.proficiency.name
					ulDiv.appendChild(liDiv)
				}
			}
		}
	}
	


}

function makeMonsterCard_right(parentDiv, monster){
	const sectionOrderList = [
		"special_abilities",
		"actions",
		"legendary_actions"
	]

	// Create each subsection (title/body pairs)
	for (section of sectionOrderList){
		// Get # of entries for this key in monster
		if (section in monster && monster[section].length > 0){
			//Title
			var headerText = section.replace("_", "&nbsp;")
			const titleDiv = document.createElement("div");
			titleDiv.classList.add('mc_body_title')
			titleDiv.innerHTML = headerText
			parentDiv.appendChild(titleDiv)

			// Bodies (multi per title sometimes)
			for (data of monster[section]){
				const bodyDiv = document.createElement("div");
				bodyDiv.classList.add('mc_body_desc')
				bodyDiv.innerHTML = "<b>" + data.name + ':</b>&nbsp;' + data.desc
				parentDiv.appendChild(bodyDiv)
			}

		}
	}
}






