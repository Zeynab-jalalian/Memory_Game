const startPage=document.getElementById("start-page");
const startBtn=document.getElementById("start-btn");

startBtn.addEventListener("click",()=>{
   setTimeout(() => {
     startPage.style.display="none";
   }, 100);

})