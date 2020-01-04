//  store health variables
var hlt1 = 3;
var sta1 = 3;
var hlt2 = 3;
var sta2 = 3;

// var rstBtn = document.getElementById("rst");
var blkBtn = document.getElementById("blk");
var evdBtn = document.getElementById("evd");
var atkBtn = document.getElementById("atk");
var rstBtn = document.getElementById("rst");
var rst2Btn = document.getElementById("rst2");
var blk2Btn = document.getElementById("blk2");
var evd2Btn = document.getElementById("evd2");
var atk2Btn = document.getElementById("atk2");

// image to change during different moves
var pic = document.getElementById("fight");
var health1 = document.getElementById("health1");
var health2 = document.getElementById("health2");
var dice1 = document.getElementById("dice1");
var dice2 = document.getElementById("dice2");

// variables for later moves
var mv1;
var mv2;

//function to simulate a 4 sided die roll
function roll() {
  // generates a random number and then breaks it into quarters as if it were a 4 sided die.
  return Math.floor(Math.random() * 4) + 1;
}

//set up button event listeners
document.getElementById("choices1").addEventListener("click", function(e) {
  mv1 = e.target.id;
  aiMove();
});

//  store computer input
function aiMove() {
  //generate a random number to help decide attack
  var mv = roll();
  //if cpu stamina is 0, he will try to rest
  if (sta2 <= 0) {
    mv2 = "rst";
  }
  // if player stamina is 0 enemy will capitalize by attacking.
  else if (sta1 <= 0) {
    mv2 = "atk";
  }
  //if cpu stamina is 1, he will either block, rest, or evade
  else if (sta2 == 1) {
    if (mv >= 2) {
      mv2 = "rst";
    } else if (mv == 3) {
      mv2 = "blk";
    } else {
      mv2 = "evd";
    }
  }
  //if cpu health is high and player health is low he will either block or attack, most likely attack.
  else if (hlt1 >= 2 && hlt2 <= 2) {
    if (roll == 1) {
      mv2 = "blk";
    } else {
      mv2 = "atk";
    }
    // if player health is low he will try to attack or block
  } else if (hlt2 >= 2 && hlt1 == 1) {
    if (mv == 1) {
      mv2 = "blk";
    } else {
      mv2 = "atk";
    }
    //if both have low health he will rest instead of block
  } else if (hlt2 == 1 && hlt1 == 1) {
    if (mv == 1) {
      mv2 = "evd";
    } else if (mv == 2) {
      mv2 = "atk";
    } else {
      mv2 = "rst";
    }
    // he won't rest if health is 2 or higher and stamina is two or higher
  } else if (hlt2 >= 2 && sta2 >= 2) {
    if (mv == 1) {
      mv2 = "evd";
    } else if (mv == 2) {
      mv2 = "blk";
    } else {
      mv2 = "atk";
    }
    // if no other criteria is met, attack will be random
  } else {
    if (mv == 1) {
      mv2 = "blk";
    } else if (mv == 2) {
      mv2 = "rst";
    } else if (mv == 3) {
      mv2 = "evd";
    } else {
      mv2 = "atk";
    }
  }
  move(mv1, mv2);
}

function move(mv1, mv2) {
  //roll 1 is player roll, roll 2 is cpu roll, advantage is determined by roll 1 subtract roll 2.

  var num1 = roll();
  dice1.src = "imgs/roll" + num1 + ".png";
  var num2 = roll();
  dice2.src = "imgs/roll" + num2 + ".png";

  if (mv2 == "atk") {
    atk2Btn.style.fontSize = "50px";
    blk2Btn.style.fontSize = "1em";
    rst2Btn.style.fontSize = "1em";
    evd2Btn.style.fontSize = "1em";
  } else if (mv2 == "blk") {
    atk2Btn.style.fontSize = "1em";
    blk2Btn.style.fontSize = "50px";
    rst2Btn.style.fontSize = "1em";
    evd2Btn.style.fontSize = "1em";
  } else if (mv2 == "rst") {
    atk2Btn.style.fontSize = "1em";
    blk2Btn.style.fontSize = "1em";
    rst2Btn.style.fontSize = "50px";
    evd2Btn.style.fontSize = "1em";
  } else if (mv2 == "evd") {
    atk2Btn.style.fontSize = "1em";
    blk2Btn.style.fontSize = "1em";
    rst2Btn.style.fontSize = "1em";
    evd2Btn.style.fontSize = "50px";
  }

  var adv = num1 - num2;

  // if both players attack it will cost both 1 stamina and damage dealt will depend on advantage determined from rolls
  if (mv1 == "atk") {
    if (mv2 == "atk") {
      pic.src = "imgs/atkatk.png";
      sta1 -= 1;
      sta2 -= 1;
      if (adv == -3) {
        hlt1 -= 2;
      } else if (adv == -2) {
        hlt1 -= 1;
      } else if (adv == 2) {
        hlt2 -= 1;
      } else if (adv == 3) {
        hlt2 -= 2;
      }
      // If a disadvantaged roll consumes more stamina than a knight currently has, it will drain health instead only if opponent is attacking, otherwise nothing
    } else if (mv2 == "blk") {
      pic.src = "imgs/atkblk.png";
      sta1 -= 1;
      sta2 -= 1;
      if (adv == -3) {
        sta1 -= 2;
      } else if (adv == -2) {
        sta1 -= 1;
      } else if (adv == 2) {
        if (sta2 >= 1) {
          sta2 -= 1;
          hlt2 -= 1;
        } else {
          hlt2 -= 2;
        }
      } else if (adv == 3) {
        if (sta2 >= 2) {
          sta2 -= 2;
          hlt2 -= 1;
        } else if (sta2 == 1) {
          sta2 -= 1;
          hlt2 -= 2;
        } else {
          htl2 -= 3;
        }
      }
      // rests will yeild less benefit even on an advantaged roll if your opponent is attacking.
    } else if (mv2 == "rst") {
      pic.src = "imgs/atkrst.png";
      sta1 -= 1;
      if (adv == -3) {
        sta2 += 2;
      } else if (adv == -2) {
        sta2 += 1;
      } else if (adv == 0) {
        sta2 -= 1;
      } else if (adv == 1) {
        if (sta2 >= 2) {
          sta2 -= 2;
        } else {
          sta2 -= 1;
          hlt2 -= 1;
        }
      } else if (adv == 2) {
        if (sta2 >= 1) {
          sta2 -= 1;
          hlt2 -= 1;
        } else {
          hlt2 -= 2;
        }
      } else if (adv == 3) {
        if (sta2 >= 2) {
          sta2 -= 2;
          hlt2 -= 1;
        } else if (sta2 == 1) {
          sta2 -= 1;
          hlt2 -= 2;
        } else if (sta2 == 0) {
          hlt2 -= 3;
        }
      }
      // evading will always use stamina, even if you're not under attack, whereas blocking only uses stamina when you are attacked and damage dealt depends on stamina.
    } else if (mv2 == "evd") {
      pic.src = "imgs/atkevd.png";
      sta1 -= 1;
      sta2 -= 2;
      if (adv >= -3 && adv <= -1) {
        sta2 += 1;
      } else if (adv == 2) {
        hlt2 -= 1;
      } else if (adv == 3) {
        hlt2 -= 2;
      }
    }
    // inverse of code from line 152 to match the opposite effect. (atk/blk vs blk/atk)
  } else if (mv1 == "blk") {
    if (mv2 == "atk") {
      pic.src = "imgs/blkatk.png";
      sta1 -= 1;
      sta2 -= 1;
      if (adv == -3) {
        if (sta1 >= 2) {
          sta1 -= 2;
          hlt1 -= 1;
        } else if (sta1 == 1) {
          sta1 -= 1;
          hlt1 -= 2;
        } else {
          htl1 -= 3;
        }
      } else if (adv == -2) {
        if (sta1 >= 1) {
          sta1 -= 1;
          hlt1 -= 1;
        } else {
          hlt1 -= 2;
        }
      } else if (adv == 2) {
        sta2 -= 1;
      } else if (adv == 3) {
        sta2 -= 2;
      }
      //nothing happens if both knights block
    } else if (mv2 == "blk") {
      pic.src = "imgs/blkblk.png";
      //blocking when not under attack is useless no matter the roll. Resting works better when not under attack but still depends on roll/ advantage.
    } else if (mv2 == "rst") {
      pic.src = "imgs/blkrst.png";
      if (adv == -3) {
        hlt2 += 1;
        sta2 += 2;
      } else if (adv == -2) {
        hlt2 += 1;
        sta2 += 1;
      } else if (adv >= -1 && adv <= 1) {
        sta2 += 1;
      }
      //evading uses stamina but can gain it back on an advantaged roll.
    } else if (mv2 == "evd") {
      pic.src = "imgs/blkevd.png";
      sta2 -= 1;
      if (adv <= 1) {
        sta2 += 1;
      }
    }
    //inverse of line 179
  } else if (mv1 == "rst") {
    if (mv2 == "atk") {
      pic.src = "imgs/rstatk.png";
      sta2 -= 1;
      if (adv == -3) {
        if (sta1 >= 2) {
          sta1 -= 2;
          hlt1 -= 1;
        } else if (sta1 == 1) {
          sta1 -= 1;
          hlt1 -= 2;
        } else if (sta1 == 0) {
          hlt1 -= 3;
        }
      } else if (adv == -2) {
        if (sta1 >= 1) {
          sta1 -= 1;
          hlt1 -= 1;
        } else {
          hlt1 -= 2;
        }
      } else if (adv == -1) {
        if (sta1 >= 2) {
          sta1 -= 2;
        } else {
          sta1 -= 1;
          hlt1 -= 1;
        }
      } else if (adv == 0) {
        sta1 -= 1;
      } else if (adv == 2) {
        sta1 += 1;
      } else if (adv == 3) {
        sta2 += 2;
      }
      // inverse of line 259
    } else if (mv2 == "blk") {
      pic.src = "imgs/rstblk.png";
      if (adv >= -1 && adv <= 1) {
        sta1 += 1;
      } else if (adv == 2) {
        hlt1 += 1;
        sta1 += 1;
      } else if (adv == 3) {
        hlt1 += 1;
        sta1 += 2;
      }
      //resting restores stamina and even health on a high advantage roll
    } else if (mv2 == "rst") {
      pic.src = "imgs/rstrst.png";
      if (adv == -3) {
        sta2 += 2;
        hlt2 += 1;
      } else if (adv == -2) {
        hlt2 += 1;
        sta2 += 1;
      } else if (adv >= -1 && adv <= 1) {
        sta1 += 1;
        sta2 += 1;
      } else if (adv == 2) {
        sta1 += 1;
        hlt1 += 1;
      } else if (adv == 3) {
        sta1 += 2;
        hlt1 += 1;
      }
      // if opponent evades and you rest
    } else if (mv2 == "evd") {
      pic.src = "imgs/rstevd.png";
      sta2 -= 1;
      if (adv >= -3 && adv <= -1) {
        sta2 += 1;
      } else if (adv == 0) {
        sta1 += 1;
      } else if (adv == 1) {
        sta1 += 2;
      } else if (adv == 2) {
        hlt1 += 1;
        sta1 += 1;
      } else if (adv == 3) {
        hlt1 += 1;
        sta1 += 2;
      }
    }
    // inverse of line 214
  } else if (mv1 == "evd") {
    if (mv2 == "atk") {
      pic.src = "imgs/evdatk.png";
      sta1 -= 1;
      sta2 -= 1;
      if (adv == -3) {
        hlt1 -= 2;
      } else if (adv == -2) {
        hlt1 -= 1;
      } else if (adv >= 1 && adv <= 3) {
        sta1 += 1;
      }
    } else if (mv2 == "blk") {
      pic.src = "imgs/evdblk.png";
      if (adv > -1) {
        sta1 += 1;
      }
      // inverse of line 353
    } else if (mv2 == "rst") {
      pic.src = "imgs/evdrst.png";
      st1 -= 1;
      if (adv == -3) {
        sta2 += 2;
        hlt2 += 1;
      } else if (adv == -2) {
        hlt2 += 1;
        sta2 += 1;
      } else if (adv == -1) {
        sta2 += 1;
      } else if (adv == 0) {
        sta2 += 1;
      } else if (adv >= 1 && adv <= 3) {
        sta1 += 1;
      }
      // if both players evade
    } else if (mv2 == "evd") {
      pic.src = "imgs/evdevd.png";
      sta1 -= 1;
      sta2 -= 1;
      if (adv < 0) {
        sta2 += 1;
      } else if (adv > 0) {
        sta1 += 1;
      }
    }
  }
  checkIfOver();
  renderLeft();
  renderRight();
}

function checkIfOver() {
  if (hlt1 <= 0 && hlt2 <= 0) {
    health2.src = "imgs/health0.png";
    health1.src = "imgs/health0.png";

    setTimeout(function() {
      pic.src = "imgs/draw.png";
      blkBtn.disabled = true;
      atkBtn.disabled = true;
      evdBtn.disabled = true;
      rstBtn.disabled = true;
    }, 1000);
  } else if (hlt1 <= 0) {
    health1.src = "imgs/health0.png";
    blkBtn.disabled = true;
    atkBtn.disabled = true;
    evdBtn.disabled = true;
    rstBtn.disabled = true;
    setTimeout(function() {
      pic.src = "imgs/lose.png";
      health2.src = "imgs/health0.png";
    }, 1000);
  } else if (hlt2 <= 0) {
    blkBtn.disabled = true;
    atkBtn.disabled = true;
    evdBtn.disabled = true;
    rstBtn.disabled = true;
    health2.src = "imgs/health0.png";
    setTimeout(function() {
      pic.src = "imgs/win.png";
      health2.src = "imgs/health0.png";
    }, 1000);
  }
}
function renderLeft() {
  if (sta1 >= 1) {
    blkBtn.disabled = false;
    atkBtn.disabled = false;
    evdBtn.disabled = false;
  }
  if (hlt1 >= 3 && sta1 >= 3) {
    hlt1 = 3;
    sta1 = 3;
    health1.src = "imgs/health.png";
  } else if (hlt1 >= 3 && sta1 == 2) {
    hlt1 = 3;
    health1.src = "imgs/healthst-1.png";
  } else if (hlt1 >= 3 && sta1 == 1) {
    hlt1 = 3;
    health1.src = "imgs/healthst-2.png";
  } else if (hlt1 >= 3 && sta1 <= 0) {
    hlt1 = 3;
    sta = 0;
    blkBtn.disabled = true;
    atkBtn.disabled = true;
    evdBtn.disabled = true;
    health1.src = "imgs/healthst-3.png";
  } else if (hlt1 == 2 && sta1 >= 3) {
    sta1 = 3;
    health1.src = "imgs/health-1.png";
  } else if (hlt1 == 2 && sta1 == 2) {
    health1.src = "imgs/health-1st-1.png";
  } else if (hlt1 == 2 && sta1 == 1) {
    health1.src = "imgs/health-1st-2.png";
  } else if (hlt1 == 2 && sta1 >= 0) {
    sta = 0;
    blkBtn.disabled = true;
    atkBtn.disabled = true;
    evdBtn.disabled = true;
    health1.src = "imgs/health-1st-3.png";
  } else if (hlt1 == 1 && sta1 >= 3) {
    sta1 = 3;
    health1.src = "imgs/health-2.png";
  } else if (hlt1 == 1 && sta1 == 2) {
    health1.src = "imgs/health-2st-1.png";
  } else if (hlt1 == 1 && sta1 == 1) {
    health1.src = "imgs/health-2st-2.png";
  } else if (hlt1 == 1 && sta1 <= 0) {
    sta1 = 0;
    blkBtn.disabled = true;
    atkBtn.disabled = true;
    evdBtn.disabled = true;
    health1.src = "imgs/health-2st-3.png";
  }
}
function renderRight() {
  if (hlt2 >= 3 && sta2 >= 3) {
    hlt2 = 3;
    sta2 = 3;
    health2.src = "imgs/health.png";
  } else if (hlt2 >= 3 && sta2 == 2) {
    hlt2 = 3;
    health2.src = "imgs/healthst-1.png";
  } else if (hlt2 >= 3 && sta2 == 1) {
    hlt2 = 3;
    health2.src = "imgs/healthst-2.png";
  } else if (hlt2 >= 3 && sta2 <= 0) {
    hlt2 = 3;
    sta2 = 0;
    health2.src = "imgs/healthst-3.png";
  } else if (hlt2 == 2 && sta2 >= 3) {
    sta2 = 3;
    health2.src = "imgs/health-1.png";
  } else if (hlt2 == 2 && sta2 == 2) {
    health2.src = "imgs/health-1st-1.png";
  } else if (hlt2 == 2 && sta2 == 1) {
    health2.src = "imgs/health-1st-2.png";
  } else if (hlt2 == 2 && sta2 >= 0) {
    sta2 = 0;
    health2.src = "imgs/health-1st-3.png";
  } else if (hlt2 == 1 && sta2 >= 3) {
    sta1 = 3;
    health2.src = "imgs/health-2.png";
  } else if (hlt2 == 1 && sta2 == 2) {
    health2.src = "imgs/health-2st-1.png";
  } else if (hlt2 == 1 && sta2 == 1) {
    health2.src = "imgs/health-2st-2.png";
  } else if (hlt2 == 1 && sta2 <= 0) {
    sta2 = 0;
    health2.src = "imgs/health-2st-3.png";
  }
}
