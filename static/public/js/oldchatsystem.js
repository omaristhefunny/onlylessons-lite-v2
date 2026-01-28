  const coolDown = 750 
  let lastClick = Date.now() - coolDown 
  
let stopped = true;


let scrollSpeed = 1; 


let scrollInterval = scrollSpeed * 3;

const CLIENT_ID = 'wKcdMOWeqJEOFvos';



let members = [];
let drone = null; 

function initializeDrone(username) {
  drone = new ScaleDrone(CLIENT_ID, {
    data: {
      name: username || getRandomName(),
      color: getRandomColor(),A
    },
  });

  drone.on('open', error => {


 if (error) {


   return console.error(error);


 }


 console.log('Successfully connected to Scaledrone');



 const room = drone.subscribe('observable-room');


 room.on('open', error => {


   if (error) {


     return console.error(error);


   }


   console.log('Successfully joined room');


 });







 room.on('members', m => {


   members = m;


   updateMembersDOM();


 });







 room.on('member_join', member => {


   members.push(member);


   updateMembersDOM();


 });







 room.on('member_leave', ({id}) => {


   const index = members.findIndex(member => member.id === id);


   members.splice(index, 1);


   updateMembersDOM();


 });







 room.on('data', (text, member) => {


   if (member) {


     addMessageToListDOM(text, member);


   } else {
   }


 });


});

drone.on('close', event => {
 console.log('Connection was closed', event);
});
drone.on('error', error => {
 console.error(error);
});
}

function handleUsernameSubmit(event) {
  event.preventDefault();
  const username = DOM.nameInput.value.trim();
  
  if (username.length > 20) {
    alert('Username must be 20 characters or less!');
    return;
  }
  if(username.match(/(黑鬼|kys|kill yourself|ass|cum|retard|bitch|shit|cunt|cock|dick|fuck|shit|nigger|nigga|pussy|nazi|whore|faggot|handjob|penis|cock|pussy|sex|hitler|niger|titties|gay|tit|boob|@ss|c0ck|b!tch|pu\$\$y|por|nigas|pp|incest|p0r|rape|r@pe|slut|threesum|foursum|twosum|shiz|slut|p0r|nigg)/gi)){
    alert('lets not use that kinda language here');
    return;
  }
  // Hide username form and show chat
  DOM.nameModal.style.display = 'none';
  DOM.form.style.display = 'flex';
  DOM.input.focus();

  initializeDrone(username);
}

function getRandomName() {


 const adjs = ["cool", "angry", "giant", "fat", "stupid", "yummy", "slimy", "bloody", "floppy","tiny", "salty", "dirty", "crazy", "lazy", "adorable", "average", "bored", "greasy", "chubby", "useless", "foolish", "nasty", "helpless", "nutty", "juicy","itchy","sportsy","jolly","hot","cold","saucy","old","innocent","embarrassing","monstrous","powerful","sexy","darth","deadly","star_spangled","patriotic","short_handed","mentally_insane","insane","ice_cold","man-eating","cold_blooded","long_distance","shocking","agents_of","disturbing","burning","frosty","chilly","freeze","beefy","radical","wacky","moist","hairy","spicy","slimy","totally_tubular","tubular","literally_insane","gaming","eating_this"];


 const nouns = ["bagel", "kitty", "guy", "muffin", "cat", "corndog", "keyboard", "salt", "gamer", "fish", "dog", "chicken", "nugget", "nerd", "face","paper","hotdog","burger","fries","drink","mouse","tiger","doofus","president","taylor_swift","discord_mod","policeman","spider","fridge","robot","rice","ninja","egg","sausage","girlfriend","boyfriend","bro","dude","sterling","turtle","toothbrush","peanut_butter","spider_man","vader","star","iron_man","destroyer","captain","michael_jordan","bull","maul","batman","alien","big_mac","stormtrooper","shield","mickey_mouse","zombie","ghost","snowman","turkey","jerky","mustard","tree","meme","baka","smuggler","bounty_hunter","officer","critical","copyright"];
  

   
 return (


   adjs[Math.floor(Math.random() * adjs.length)] +


   "_" +


   nouns[Math.floor(Math.random() * nouns.length)]


 );
  



}







function getRandomColor() {


 return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);


}







//------------- DOM STUFF







const DOM = {


 membersCount: document.querySelector('.members-count'),


 membersList: document.querySelector('.members-list'),


 messages: document.querySelector('.messages'),


 input: document.querySelector('.message-form__input'),


 form: document.querySelector('.message-form'),


 nameInput: document.querySelector('#nameInput'),

 nameForm: document.querySelector('#nameForm'),

 nameModal: document.querySelector('#nameModal'),

};



// Event listeners
DOM.nameForm.addEventListener('submit', handleUsernameSubmit);
DOM.form.addEventListener('submit', sendMessage);
DOM.form.style.display = 'none'; // Hide chat until username is submitted







  function startCoolDown () {
    lastClick = Date.now() // maybe useless function
  }
  function checkCoolDown () {
    const notOver = Date.now() - lastClick < coolDown
    if (notOver){
    alert('no spamming pls');
    }
    // using an alert it will block javascript loops
    return !notOver;
  }


function sendMessage(event) {
  event.preventDefault();
  
  if (!drone) {
    alert('Not connected yet.');
    return;
  }
  
  if (!checkCoolDown()) {
    return; // Cooldown check will show alert if triggered
  }
  
  startCoolDown();
  
  const value = DOM.input.value;
  
  if (value === '') {
    return;
  }
  
  if(value.match(/(黑鬼|ass|cum|retard|bitch|shit|cunt|cock|dick|fuck|shit|nigger|nigga|pussy|nazi|whore|faggot|handjob|penis|cock|pussy|sex|hitler|niger|titties|gay|tit|boob|@ss|c0ck|b!tch|pu\$\$y|por|nigas|pp|incest|p0r|rape|r@pe|slut|threesum|foursum|twosum|shiz|slut|p0r|nigg)/gi)){
    alert('cmon man why you saying that kinda stuff?');
    return;
  }
  
  if(value.length > 100){
    alert('my guy, that message is too big.. just like your mom gottem');
    return; 
  }
  
  DOM.input.value = '';
  
  drone.publish({
    room: 'observable-room',
    message: value,
  });
  
  // Easter egg: special message for "2 + 2 = 4"
  if (value == "2 + 2 = 4" || value == "2+2=4"){
    drone.publish({
      room: 'observable-room',
      message: "It is coming...",
    });
  }
}

 







function createMemberElement(member) {


 const { name, color } = member.clientData;


 const el = document.createElement('div');


 el.appendChild(document.createTextNode(name));


 el.className = 'member';


 el.style.color = color;


 return el;


}







function updateMembersDOM() {


 DOM.membersCount.innerText = `${members.length} people online:`;


 DOM.membersList.innerHTML = '';


 members.forEach(member =>


   DOM.membersList.appendChild(createMemberElement(member))


 );


}


//dont look at this next part if you are sensitive to swear words







function createMessageElement(text, member) {



// let gamer = text.replace(/[^A-Za-z0-9\s!?]/g,”);
// testing to see if this is the problem



 

  const el = document.createElement('div');


 el.appendChild(createMemberElement(member));


 el.appendChild(document.createTextNode(text));


 el.className = 'message';



 return el;


}











function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const atBottom =
    el.scrollTop + el.clientHeight >= el.scrollHeight - 5;

  el.appendChild(createMessageElement(text, member));

  if (atBottom) {
    el.scrollTop = el.scrollHeight;
  }

}