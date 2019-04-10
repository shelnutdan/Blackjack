let cardSuits=['Spades','Hearts','Diamonds','Clubs'];
let cardValues=['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
let deck= new Array();
let players=new Array();
let dealer=new Array();
 var currentPlayer = 0;


deckCreation=() =>{
  deck =new Array();
  for (let value of cardValues){
    for (let suit of cardSuits){
      let weight=parseInt(value);
      if(value=='J'||value=='Q'||value=='K'){
        weight=10;
      }
      if(value=='A'){
        weight=11;
      }
      let card={
        Value: value,
        Suits: suit,
        Weight: weight
      }
      deck.push(card);
    }
  }
  console.log(deck)
}

shuffle=()=>{
  for (let i=0;i<1000;i++){
    let card1=Math.floor((Math.random()*deck.length)),
    card2=Math.floor((Math.random()*deck.length)), temp=deck[card1];
    deck[card1]=deck[card2];
    deck[card2]=temp;
  }
}

createPlayers=(n)=>{
  players=new Array();
  for (let i=1;i<=n;i++){
    let hand=new Array();
    let player={
      Name: 'Player'+i,
      Id: i,
      Points:0,
      Hand: hand
    };
    players.push(player)
  }
}
 createDealer=()=>{
   dealer=new Array();
   let hand=new Array()
   dealerInfo={
     Name: 'Dealer',
     Id:0,
     Points:0,
     Hand: hand
   }
   dealer.push(dealerInfo);
 }

playerRendering=()=>{
  for(let i=0;i<players.length;i++)
  {
    var div_player = document.createElement('div');
    var div_playerid = document.createElement('div');
    var div_hand = document.createElement('div');
    var div_points = document.createElement('div');

    div_points.className = 'points';
    div_points.id = 'points_' + i;
    div_player.id = 'player_' + i;
    div_player.className = 'player';
    div_hand.id = 'hand_' + i;

    div_playerid.innerHTML = players[i].Id;
    div_player.appendChild(div_playerid);
    div_player.appendChild(div_hand);
    div_player.appendChild(div_points);
    document.getElementById('players').appendChild(div_player);
            }
}

dealerRendering=()=>{
  var div_dealer = document.createElement('div');
  var div_dealerid = document.createElement('div');
  var div_hand = document.createElement('div');
  var div_points = document.createElement('div');

  div_points.className = 'points';
  div_points.id = 'points_' + 0;
  div_dealer.id = 'player_' + 0;
  div_dealer.className = 'player';
  div_hand.id = 'hand_' + 0;

  div_dealerid.innerHTML = dealer[0].Id;
  div_dealer.appendChild(div_dealerid);
  div_dealer.appendChild(div_hand);
  div_dealer.appendChild(div_points);
  document.getElementById('dealer').appendChild(div_dealer);
}
dealHands=()=>{
  for (let i=0;i<2;i++){
    for (let j=0;j<players.length;j++){
      let card=deck.pop();
      players[j].Hand.push(card);
      renderCard(card,j);
      updatePoints();
    }
  }
  updateDeck();
}

renderCard=(card,player)=>{
  let hand=document.getElementById('hand_' + player);
  hand.appendChild(getCardDisplay(card));
}

getCardDisplay=(card)=>{
  let element=document.createElement('div');
  var icon = '';
  if (card.Suit == 'Hearts')
  icon='&hearts;';
  else if (card.Suit == 'Spades')
  icon = '&spades;';
  else if (card.Suit == 'Diamonds')
  icon = '&diams;';
  else
  icon = '&clubs;';
  element.className='card';
  element.innerHTML=icon+'<br/>'+card.Value;
  return element;
}

updateDeck=()=>{
  document.getElementById('deckcount').innerHTML = deck.length;
}


start=()=>{
  console.log("Is this working")
  document.getElementById('start').value = 'Restart';
  document.getElementById("status").style.display="none";
  currentPlayer=0;
  deckCreation();
  shuffle();
  createPlayers(3);
  createDealer();
  playerRendering();
  dealerRendering();
  dealHands();
  document.getElementById('player_' + currentPlayer).classList.add('active');
}


hitMe=()=>{
  let card=deck.pop()
  players[currentPlayer].Hand.push(card)
  renderCard(card,currentPlayer);
  updatePoints()
  updateDeck();
  check()
}

stay=()=>{
  if (currentPlayer != players.length-1) {
      document.getElementById('player_' + currentPlayer).classList.remove('active');
      currentPlayer += 1;
      document.getElementById('player_' + currentPlayer).classList.add('active');
  }

  else {
      end();
  }
}

end=()=>{
  let winner;
  let score=0;
  for(let player of players){
    if( player.Points>score && player.Points<22){
      console.log(player)
      score=player.Points
      winner=player.Id
    }

  }
  console.log(winner)
  document.getElementById('status').innerHTML = 'Winner: Player ' + winner;
  document.getElementById("status").style.display = "inline-block";
}

getPoints=(player)=>{
  let points=0;

  for(var i = 0; i < players[player].Hand.length; i++)
  {
      points += players[player].Hand[i].Weight;
  }
  players[player].Points = points;
  return points;
}
updatePoints=()=>{
  for (var i = 0 ; i < players.length; i++)
  {
      getPoints(i);
      document.getElementById('points_' + i).innerHTML = players[i].Points;
  }
}
check=()=>{
  if(players[currentPlayer].Points>21){
            document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].Id + ' LOST';
            document.getElementById('player_' + currentPlayer).classList.remove('active');
            currentPlayer += 1;
            document.getElementById('player_' + currentPlayer).classList.add('active');
        }
}
