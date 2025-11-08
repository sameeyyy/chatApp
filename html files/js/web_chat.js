import { getLocalStorage, setLocalStorage } from "./helper.js";

let saveReceiverBtn = document.querySelector("#saveReceiver");
let receiverInp = document.querySelector("#add_receiver");
function addReceiver() {
  let oldReceivers = getLocalStorage("receivers");
  let receiverArr = oldReceivers ? oldReceivers : [];
  receiverInp.value = "";
  receiverArr.push(receiverInp.value);
  setLocalStorage("receivers", receiverArr);
  printReceivers();
}
saveReceiverBtn.addEventListener("click", addReceiver);

function printReceivers() {
  let oldReceivers = getLocalStorage("receivers");
  let chatList = document.querySelector(".chat-list");
  chatList.innerHTML = "";
  oldReceivers.forEach((rec, index) => {
    let chatList = document.querySelector(".chat-list");
    let htmlChat = `
      <div class="chat-item" id="receiverItem${index}" data-index="${index}">
      <img src="../image/art.jpg" alt="Profile" />
      <div class="chat-info">
      <h4>${rec}</h4>
      <p>Hey, how are you?</p>
      </div>
      </div>`;
    chatList.insertAdjacentHTML("beforeend", htmlChat);
  });
  let chatListItems = document.querySelectorAll(".chat-item");
  chatListItems.forEach((chList) => {
    let indexAttr = chList.getAttribute("data-index");
    chList.addEventListener("click", () => selectReceiver(indexAttr));
  });
  let activeRec = getLocalStorage("activeReceiver");
  if (activeRec) {
    selectReceiver(Object.keys(activeRec)[0]);
  }
}
printReceivers();
// document.addEventListener("load", printReceivers);
function selectReceiver(index) {
  let chatListItems = document.querySelectorAll(".chat-item");
  chatListItems.forEach((chList) => {
    chList.classList.remove("active");
  });
  document.querySelector("#receiverItem" + index).classList.add("active");
  let oldReceivers = getLocalStorage("receivers");
  console.log(oldReceivers);

  let activeReceiver = oldReceivers[index];
  setLocalStorage("activeReceiver", { [index]: activeReceiver });
  document.querySelector("#receiverChatName").innerText = activeReceiver;
}
function sendMessage() {
  let activeRec = getLocalStorage("activeReceiver");
  let msgText = document.querySelector("#messageText");
  console.log(activeRec, msgText);
}
let sendButton = document.querySelector("#sendBtn");
sendButton.addEventListener("click", sendMessage);
