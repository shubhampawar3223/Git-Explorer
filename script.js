let rowElement= document.querySelector(".content");
let userN;
let firstInput = document.querySelector("#userName")
let submiInput = document.querySelector(".submit")
submiInput.addEventListener("click",(e)=>{    
        rowElement.innerHTML="";
        getUserProfile(firstInput.value)
})

async function getUserProfile(data){
    try{ 
    let userSearchData = await fetch("https://api.github.com/search/users?q="+data)
    let userData = await userSearchData.json()
    printUserData(userData.items[0])   
    let fetchData= await fetch("https://api.github.com/users/"+data) 
    let profileData = await fetchData.json();
    console.log(profileData)
    let repoFetchData = await fetch("https://api.github.com/users/"+data+"/repos")
    let repoData = await repoFetchData.json()
    printRepoData(repoData);
    }
    catch(e){
        let err_statement = document.createElement("p");
        rowElement.append(err_statement);
        err_statement.innerHTML="Please Enter Valid Input.";
        err_statement.style.marginLeft="25%";
        err_statement.style.marginTop="10%"
        err_statement.style.color="red";
        err_statement.style.fontSize="90px"
    }
}

function checkClearance(element){
    if(element !== undefined){
         element.remove();
         console.log("Need to Clear")
         return;
    }
    else{
        console.log("Clear")
        return;
    }
}

function printUserData(uData){
       let userInfoCol = document.createElement("div");
       userInfoCol.setAttribute("class","col-12 col-md-12 co-lg-6 col-xl-6 userInfo")    
       let titleUser = document.createElement("div");
       titleUser.setAttribute("class","col-8 col-sm-8 col-md-7 col-lg-8 col-xl-8 bg-dark text-white")
       titleUser.style.fontSize="25px"
       titleUser.style.marginLeft = "15%"
       titleUser.innerHTML="User Info."
       titleUser.style.textAlign ="center";
       userInfoCol.append(titleUser)
       let keys =Object.keys(uData)
       let value =Object.values(uData)  
       for(i=0;i<keys.length;i++){
           let para = createPara();
           let s = document.createElement("span")
           s.innerHTML=keys[i]+": ";
           s.style.fontWeight="bold"
           para.append(s);
           let s2 = document.createElement("span")
           s2.innerHTML=value[i]
           para.append(s2);
        //    para.innerHTML= + ": "+value[i];
           para.style.marginTop="1%" 
           para.style.marginLeft="15%"
           userInfoCol.append(para)
           rowElement.append(userInfoCol);
       }   
}

function createPara(){
    let p = document.createElement("div")
    p.setAttribute("class","col-8 col-sm-8 col-md-7 col-lg-8 col-xl-8")
    return p;
}

function printRepoData(rData){
    let repoDiv = document.createElement("div");
    repoDiv.setAttribute("class","col-12 col-md-12 co-lg-6 col-xl-6 repoInfo")
    rowElement.append(repoDiv);
    let titleRepo = document.createElement("div");
    titleRepo.setAttribute("class","col-8 col-sm-8 col-md-7 col-lg-8 col-xl-8 bg-dark text-white");
    titleRepo.innerHTML = "Repo List";
    titleRepo.style.fontSize="25px"
    titleRepo.style.marginLeft="15%"
    titleRepo.style.textAlign ="center";
    repoDiv.append(titleRepo)
    // document.write('<br/>');
    repoDiv.style.position ="relative";
    for(let i=0; i< rData.length; i++){
        let temp = rData[i];        
        let innerDiv = document.createElement("div");
         innerDiv.setAttribute("class","col-8 col-sm-8 col-md-7 col-lg-8 col-xl-8 bg-white")
        innerDiv.style.marginTop="1%";
        innerDiv.style.marginLeft="15%"
         let sp= document.createElement("p");
        sp.innerHTML = temp.name;
        sp.style.fontWeight="bold"
        let butElement = document.createElement("button");
        butElement.setAttribute("class","btn btn-secondary btn-sm")
        butElement.innerHTML="Explore";
        butElement.addEventListener("click",()=>{
            modal(temp)
        })
        
        butElement.style.position="absolute"
        butElement.style.right="0px"
        butElement.style.top="-6px"
        repoDiv.append(innerDiv);
        innerDiv.append(sp,butElement)
    }  

}

//modal() generates modal element and fill necessary info in it.
function modal(data){

    let modalDiv = document.createElement("div")
    setModalDiv(modalDiv)
    let modalNextDiv = document.createElement("div")
    setModalNextDiv(modalNextDiv);
    // let spanElement = document.createElement("span");
    // spanElement.innerHTML = "&times;"
    // //spanElement.style.backgroundColor="red"
    // spanElement.style.margin="0px"
    // spanElement.style.fontWeight = "bold"
    // spanElement.style.color ="black";
    // spanElement.style.float ="right";
    // spanElement.style.fontSize ="30px"
    // spanElement.style.fontWeight ="300px"
    let spanElement = document.createElement("button");
    spanElement.setAttribute("Class","btn btn-sm");
    spanElement.style.float ="right";
    spanElement.addEventListener("click",spanClick);
    
    modalDiv.style.display="block";
    document.body.append(modalDiv)
    let modalContent= setModalElements(data);
    window.onclick = function(event){ 
        if(event.target == modalDiv)
             modalDiv.remove()
    }
    modalDiv.append(modalNextDiv);
    modalNextDiv.append(spanElement,modalContent);
    
}

//spanclick() function performs removal of modal on clicking 'X' at right corner. 
function spanClick(e){
    e.path[2].remove();
}

//setModalElement() creates necessary fields and writes necessary info in modal-box.
function setModalElements(data){
    let colour1 = document.createElement("div"); 
    colour1.style.padding="40px";
    //define id
    let paraElement1 = document.createElement("p");
    paraElement1.innerHTML ="Id: " + data.id
    //define Repo Name
    let paraElement2 = document.createElement("p");
    paraElement2.innerHTML ="Repo. Name: " + data.name
    //define private
    let paraElement3 = document.createElement("p");
    paraElement3.innerHTML ="Private: " + data.private
    //define HTML_url
    let creDiv = document.createElement("p")
    let spanElement4 = document.createElement("span");
    spanElement4.innerHTML ="HTML_Url: "
    let anchorElement = document.createElement("a");
    anchorElement.href= data.html_url;
    anchorElement.target= "blank";
    anchorElement.innerHTML= data.html_url;
    creDiv.append(spanElement4,anchorElement);
    //define description
    let paraElement5 = document.createElement("p");
    paraElement5.innerHTML ="Description: " + data.desscription
    //define cloneUrl
    let paraElement6 = document.createElement("p");
    paraElement6.innerHTML ="Clone_Url: " + data.clone_url;
    colour1.append(paraElement1,paraElement2,paraElement3,creDiv,paraElement5,paraElement6)
    return colour1;
}

//setModalDiv() sets css of outer screen of model box.
function setModalDiv(modalDiv){
    modalDiv.style.display="none";
    modalDiv.style.position="fixed"
    modalDiv.style.paddingTop = "100px";
    modalDiv.style.zIndex = "1"
    modalDiv.style.left = "0";
    modalDiv.style.top = "0";
    modalDiv.style.width = "100%";
    modalDiv.style.height = "100%";
    modalDiv.style.overflow = "auto";
    modalDiv.style.backgroundColor = "rgb(0,0,0)";
    modalDiv.style.backgroundColor = "rgba(0,0,0,0.4)";

}

//setModalNextDiv() sets css of content box of modal.
function setModalNextDiv(modalNextDiv){
    modalNextDiv.style.backgroundColor="#fefefe";
    modalNextDiv.style.margin="auto";
    modalNextDiv.style.border = "1px solid #888";
    modalNextDiv.style.width = "60%"
}

