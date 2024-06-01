const inputEl=document.querySelector('#num')
const submitBtnEl=document.querySelector('#sub-btn')
const resetitBtnEl=document.querySelector('#reset-btn')
const chanceEl=document.querySelector('#chance')
const hintEl=document.querySelector('#hint')
const guessEl=document.querySelector('#guess')
let chance=5
let randumNum=Math.trunc(math.random()*20)+1
chanceEl.textContent=`chance:${chance}`
submitBtnEl.addEventListener('click',()=>{
    chance--
    const inputValue= +inputEl.value
    if(inputValue===randumNum){
        
        inputEl.disabled=true
        submitBtnEl.disabled=true
        hintEl.textContent ='you win'
        guessEl.textContent +=`${inputValue}-`
        inputEl.value=''
    }else{
        if(chance===0){
           
            inputEl.disabled=true
            submitBtnEl.disabled=true
            hintEl.textContent ='you lose'
            guessEl.textContent +=`${inputValue}- randomNam is ${randumNum}`
            inputEl.value=''
    }else{
        if(randumNum>inputValue){
            inputEl.disabled=false
            submitBtnEl.disabled=false
            hintEl.textContent ='randumName is bigger than your guess.'
            guessEl.textContent +=`${inputValue}-`
            inputEl.value=''
        }
    }chanceEl.textContent=`chance:${chance}`
}})
resetitBtnEl.addEventListener('click',()=>{
    randumNum=Math.trunc(math.random()*20)+1
    chance=5
    hintEl.textContent=''
    guessEl.textContent=''
    inputEl=''
    inputEl.disabled=false
    submitBtnEl.disabled=false
    chanceEl.textContent=`chance:${chance}`
})