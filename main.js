const cards = Array.from(document.querySelectorAll(".card"));
const cardsCont = document.querySelector(".m-cont__flex");
const clicksBox = document.querySelector(".clicks-box__clicks");
const srcs = [
  "images/card_0.png",
  "images/card_1.png",
  "images/card_2.png",
  "images/card_3.png",
  "images/card_4.png",
];

const randomNum = (max, min) => Math.round(Math.random() * (max - min) + min);

const rangeOfNums = new Set([0, 1, 2, 3, 4]);

for (let card of cards) {
  let num;
  do {
    num = randomNum(rangeOfNums.size - 1, 0);
  } while (document.querySelectorAll(`.img_${num}`).length === 6);

  card.classList.add(`card_${num}`);
  card.innerHTML = `<img class="img-from-js" src=${srcs[num]}>`;
  card.classList.add(`img_${num}`);
}

console.log(document.querySelectorAll(`.img_${0}`).length);
console.log(document.querySelectorAll(`.img_${1}`).length);
console.log(document.querySelectorAll(`.img_${2}`).length);
console.log(document.querySelectorAll(`.img_${3}`).length);
console.log(document.querySelectorAll(`.img_${4}`).length);

// cards.forEach((el) => {
//   const num = randomNum(4, 0);
//   el.classList.add(`card_${num}`);
//   el.innerHTML = `<img class="img-from-js" src=${srcs[num]}>`;
//   el.classList.add(`img_${num}`);
//   if (document.querySelectorAll(`img_${num}`).length === 6) {
//     if (num - 1 === -1) num += 1;
//     else if (num + 1 === 5) num -= 1;
//     el.classList.add(`card_${num}`);
//     el.innerHTML = `<img class="img-from-js" src=${srcs[num]}>`;
//     el.classList.add(`img_${num}`);
//   }
// });

let clicks = 0;
function cardClicked(e) {
  if (
    e.target.classList.contains("card") &&
    e.target.localName === "div" &&
    !e.target.classList.contains("card-clicked")
  ) {
    const card = e.target;

    clicksBox.textContent = parseInt(clicksBox.textContent) - 1;

    if (
      clicksBox.textContent <= 15 &&
      !clicksBox.parentElement.classList.contains("few-clicks-to-lose")
    ) {
      clicksBox.parentElement.style.animationName = "clicks-box";
      clicksBox.parentElement.style.animationDuration = "2s";
      clicksBox.parentElement.style.animationDirection = "alternate";
      clicksBox.parentElement.style.animationIterationCount = "infinite";
      clicksBox.parentElement.style.animationTimingFunction = "ease-in-out";
      clicksBox.parentElement.classList.add("few-clicks-to-lose");
    }

    if (clicks === 0) {
      card.style.transition = ".5s";
      card.style.transform = "rotateY(90deg)";
      card.firstChild.classList.add("first-card");
      card.classList.add("card-clicked");

      setTimeout(() => {
        card.firstChild.style.display = "block";
        card.style.transform = "rotateY(0deg)";
      }, 300);
      clicks++;
    } else if (clicks === 1) {
      document.removeEventListener("click", cardClicked);

      card.firstChild.classList.add("second-card");
      card.classList.add("card-clicked");
      card.style.transition = ".5s";
      card.style.transform = "rotateY(90deg)";

      setTimeout(() => {
        card.firstChild.style.display = "block";
        card.style.transform = "rotateY(0deg)";
      }, 300);
      const firstCard = document.querySelector(".first-card");
      const secondCard = document.querySelector(".second-card");

      for (let i = 0; i < 5; i++) {
        if (
          firstCard.parentElement.classList.contains(`img_${i}`) &&
          secondCard.parentElement.classList.contains(`img_${i}`)
        ) {
          firstCard.classList.add("founded");
          secondCard.classList.add("founded");
        } else if (
          !(
            firstCard.parentElement.classList.contains(`img_${i}`) &&
            secondCard.parentElement.classList.contains(`img_${i}`)
          )
        ) {
          firstCard.classList.add("not-founded");
          secondCard.classList.add("not-founded");
        }
      }

      if (
        firstCard.classList.contains("founded") &&
        secondCard.classList.contains("founded")
      ) {
        console.log("pair founded");
        firstCard.parentElement.classList.add("pair-founded");
        secondCard.parentElement.classList.add("pair-founded");

        setTimeout(() => {
          firstCard.parentElement.style.animationName = "card-founded";
          firstCard.parentElement.style.animationDuration = ".5s";

          secondCard.parentElement.style.animationName = "card-founded";
          secondCard.parentElement.style.animationDuration = ".5s";

          setTimeout(() => {
            firstCard.parentElement.style.animationName = "";
            firstCard.parentElement.style.animationDuration = "";

            secondCard.parentElement.style.animationName = "";
            secondCard.parentElement.style.animationDuration = "";
            document.addEventListener("click", cardClicked);
          }, 400);
        }, 600);

        firstCard.classList.remove("first-card", "founded", "not-founded");
        secondCard.classList.remove("second-card", "founded", "not-founded");
      } else {
        setTimeout(() => {
          firstCard.parentElement.style.animationName = "card-not-founded";
          firstCard.parentElement.style.animationDuration = ".5s";

          secondCard.parentElement.style.animationName = "card-not-founded";
          secondCard.parentElement.style.animationDuration = ".5s";
          setTimeout(() => {
            firstCard.parentElement.style.transform = "rotateY(90deg)";
            secondCard.parentElement.style.transform = "rotateY(90deg)";

            firstCard.parentElement.style.animationName = "";
            firstCard.parentElement.style.animationDuration = "";

            secondCard.parentElement.style.animationName = "";
            secondCard.parentElement.style.animationDuration = "";

            setTimeout(() => {
              firstCard.parentElement.style.transform = "rotateY(0deg)";
              secondCard.parentElement.style.transform = "rotateY(0deg)";

              firstCard.style.display = "none";
              secondCard.style.display = "none";
              document.addEventListener("click", cardClicked);
            }, 400);
          }, 500);
        }, 600);

        firstCard.classList.remove("first-card", "founded", "not-founded");
        secondCard.classList.remove("second-card", "founded", "not-founded");

        firstCard.parentElement.classList.remove("card-clicked");
        secondCard.parentElement.classList.remove("card-clicked");
      }

      clicks = 0;
    }

    if (document.querySelectorAll(".pair-founded").length === 30) {
      document.removeEventListener("click", cardClicked);
      document.getElementById("you-win").style.display = "block";
      clicksBox.parentElement.style.animationName = "";
      clicksBox.parentElement.style.color = "#0f0";
      cards.forEach((el) => {
        el.style.animationName = "card-founded";
        el.style.animationDuration = ".7s";
      });
      console.log("You Win");
    }

    if (clicksBox.textContent <= 0) {
      document.removeEventListener("click", cardClicked);
      document.getElementById("you-lose").style.display = "block";
      clicksBox.parentElement.style.color = "#f00";
      clicksBox.parentElement.style.animationName = "";
      cards.forEach((el) => {
        el.style.animationName = "card-not-founded";
        el.style.animationDuration = ".7s";
      });
      console.log("You Lose");
    }
  }
}
document.addEventListener("click", cardClicked);
