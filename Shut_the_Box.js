// Code written by Hamid Ali
// in this code i have used tile word instead of block to declare variables
  
var tileNumber = [];  // to show the blocks/ tiles from which user can turn down the tile
var closedTile = []; // to show which tiles/blocks are closed duruing computer or user turn
var scorePlayer1;   // computer player
var scorePlayer2;  // user player
var player;       // a boolean variable, true represent that computer is playing and false means user

startGame();   // this function ask from user who has to start the game ..user or computer

// first while will be run  untill both players end their turn
while (scorePlayer1 == -1 || scorePlayer2 == -1) {
let diceNumber;
if (tileNumber.length > 0) {
   diceNumber = generateDiceNumber(tileTotal()); 
}
else{
scoreTotal(0);      // if there is no tile left opened in the box call the score function and to assign score to respective player 
}
  if (player == false) {
    if (tileNumber.includes(diceNumber) || combinationExist(diceNumber) == true) {
      let flag = true;
      while (flag) {
        let ui = userInput();
        if (ui == diceNumber && tileNumber.includes(ui)) {
          //call single tile for user
          oneTileDown(ui);
          flag = false;
        } else if ((userInputCheck(ui, diceNumber)) == true) {
          flag = false;
        } else {
          alert("Again Input Number.... the dice is " + diceNumber);
          flag = true;
        }
      }  // end of while
    }
   
    else {
      alert("No CObination exist...so game over..........!!!! we dont need input...");
      scoreTotal(tileTotal());
    }
    
  } /// end of if (player rule)

  // start computer player rulesssss
  else if(tileNumber.includes(diceNumber)){
               oneTileDown(diceNumber);
            }
      else{
        if(twoTileDown(diceNumber)==true){
     scoreTotal(tileTotal());
    } 
    }  // end of computer player
    
// this condition checks if the score of both players are equal (in a tie condition) then ask user to play again or not      
if (scorePlayer1 == 0 && scorePlayer2 ==0) {
let playAgain = prompt("The game is draw...would you like to play again? Press 8 for play again or any other for quit!!!...");
    if (playAgain == 8) {
        tileNumber.splice(tileNumber);
               closedTile = [];
      startGame(); 
    } else {
      alert("Thank you for playing the Shut the box");
    }
}   // end of if condition (tie game condition)
    
} // end of 1 while

//  below condition will announce the player who is winner after end game
if(scorePlayer1 != -1 && scorePlayer2 != -1){   
    announceWinner(scorePlayer1, scorePlayer2);
    }


function  startGame(){
scorePlayer1 = -1; scorePlayer2 = -1;
generateBlocks(); // calling this function to set up blocks/ tiles from 1-9
// asking the user to select whos has to start the game   0 for computer and any other key for player
var selectPlayer = prompt("Who have to start the game? 'Computer' (Press '0') or 'You' (Press Any Key!)?");
if (selectPlayer == 0) {
  player = true;
} else {
  player = false;
}
}      // end of startGAme function
    
    

function generateBlocks() { //generate the numners from 1-9
  for (i = 1; i < 10; i++) {
    tileNumber.push(i);
  }
} // end of generateBlocks function


function tileTotal() {    // checking the sum of opened/stand tiles or blocks....
  let tileSum;
  tileSum = tileNumber.reduce((a, b) => a + b, 0);
  return tileSum;
} // end of function tileTotal


function generateDiceNumber(tileSum) {   // this function generating the dice number through random number and checking condition to throw one dice or two dice
  let diceSum;
  if (tileSum <= 6) {
    diceSum = Math.floor(Math.random() * 6 + 1);
  } else {
    diceSum = Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1);
  }
  alert("The generated diceSum is " + diceSum);
  return diceSum;
} // end of generateDiceNumber function


function oneTileDown(diceSum) {        // this function will down the one tile only if dice number is equal to number on tile
  closedTile.unshift(tileNumber.splice(tileNumber.indexOf(diceSum), 1));
  alert("One tile has removed and the closed tile is  " + closedTile + " AND remaining tiles are " + tileNumber);
} // end of  one-Tile-Down function


function twoTileDown(diceSum) {    // this function runs only in computer case to check combination exist of by adding 2 stand tiles or not
  let c = true; // if it remains true it means there is no combination exist for dice number
  let i = 0
  // we will run this while loop until we find combination or array length is finished
  while (c == true && i < tileNumber.length) { 
    // this condition is checking that difference should be less than 9  becasuse we
    //have only tiles upto 9 not true for than sum of 11, and the current number should not be equal to difference because we
    //have only one tile of one number    // for e.g for dice number-6 it will not allow to splice  3 & 3 from array....
    if (tileNumber.includes(diff = diceSum - tileNumber[i]) && diff != tileNumber[i]) {
      closedTile.unshift(tileNumber.splice(tileNumber.indexOf(diff), 1));
      closedTile.unshift(tileNumber.splice(tileNumber.indexOf(tileNumber[i]), 1));
      alert("Two tiles have removed and the closed tiles are  " + closedTile + " remaining tiles are " + tileNumber);
      c = false;
    } else {
      i++;
    }
  }
  return c;

} // end two-tile down function for Computer

function userInput() {
  let input = parseInt(prompt("Enter a numbers for taking tile down for from the open-Blocks '").replace(/\D/g, ""));
  return input;
  // the above input condition  does not take zero(0) in account and removes blank spaces and gives only digits from 1-9
} // end of userInput function

function userInputCheck(x, diceSum) {
  let c = true;  // this boolean will check different condition on user entered 2 numbers and true means that user entered number 
  //will down the tile which are equal to diceNumber
  let inputSum;
  let inputNumber1 = parseInt(x.toString().charAt());
  let inputNumber2 = parseInt(x.toString().charAt(1));
  inputSum = inputNumber1 + inputNumber2;

  if (inputSum == diceSum && tileNumber.includes(inputNumber1) && tileNumber.includes(inputNumber2)) {
    twoTileDownUser(inputNumber1, inputNumber2);
    c = true;
  } else if (inputNumber1 == inputNumber2) {  // user enters two same number it will gives error
    alert("You have entered 2 same numbers!!!!! Thats wrong..Please enter different number for ' " + diceSum + " '.");
    c = false;
  } else if (inputSum == diceSum && (tileNumber.includes(inputNumber1) == false || tileNumber.includes(inputNumber2) == false)) {
  // user entered such numbers from which one or both numbers are down! it will gives error
    alert("You have entered such numbers from which one or both numbers are down!!!!! Thats wrong..Please enter different number for ' " + diceSum + " '.");
    c = false;
  } else if (inputSum != diceSum) { // user entered such number whose sum is not equal to diceSum
    alert("invalide input");
    c = false;
  }
      return c;
} // end of userInput Check function

// this function runs only in user case to check down the block/tile after checking the user input
function twoTileDownUser(num1, num2) { 
  closedTile.unshift(tileNumber.splice(tileNumber.indexOf(num1), 1));
  closedTile.unshift(tileNumber.splice(tileNumber.indexOf(num2), 1));
  alert("Two tiles have removed and the closed tiles are  " + closedTile + " remaining tiles are " + tileNumber);
} //end two-tile down function for user


// this function will run before asking user input that combination exist or not for diceNumber 
function combinationExist(diceSum) {
  let c = false; // if it remains false it means there is no combination exist for dice number
  let i = 0;
  let diff;
  while (c == false && i < tileNumber.length) {
    if (tileNumber.includes(diff = diceSum - tileNumber[i]) && diff != tileNumber[i]) {
      c = true;
    } else {
      i++;
    }
  }
  return c;
} // end of combination Exist  function


  function scoreTotal(tileSum) { // this function  assign score to the respective players of game....
  alert("your game is over...!!!! no combination left");
  if(player==true){
   scorePlayer1 = tileSum;
      alert("The score of p1 (computer) is " + scorePlayer1);
     player =false;
     resetTile();
  }
  else{
  scorePlayer2 = tileSum;
  alert("The score of p2 (user) is " + scorePlayer2);
   player =true;
     resetTile();
}
}   // end of scoreTotal function

 function announceWinner(scorePlayer1, scorePlayer2) {     // this function announe the winner.....
  if (scorePlayer1 < scorePlayer2) {
    alert("The Winner of the game is Player-1(Computer) whose score is " + scorePlayer1);
  }
  else{
   alert("The Winner of the game is Player-2(user) whose score is " + scorePlayer2);
  }
  
} // end of Announce winner function


function resetTile(){  // this function reset the tiles for next player turn
tileNumber.splice(tileNumber);
closedTile = [];
 generateBlocks();
} // end of resetTile function
