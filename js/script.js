"use strict";

//global vars
//form elements
var slcVrienden;
var txtNaam;
var txtGeboortejaar;
var lblId;
//buttons
var btnNieuw;
var btnSlaOp;
var btnVerwijder;
//div
var divFeedback;


window.addEventListener('load', Initieer);

function Initieer() 
{
    BindElements();
    addEvents();
    LoadFriendsInList();
};


/**FUNCTIONS */

function BindElements()
{
    slcVrienden = document.querySelector("#slcVrienden");
    lblId = document.querySelector("#lblId");
    txtNaam = document.querySelector("#txtNaam");
    txtGeboortejaar = document.querySelector("#txtGeboortejaar");
    btnNieuw = document.querySelector("#btnNieuw");
    btnSlaOp = document.querySelector("#btnSlaOp");
    btnVerwijder = document.querySelector("#btnVerwijder");
    divFeedback = document.querySelector("#divFeedBack");
}

function addEvents()
{
    btnNieuw.addEventListener("click",ResetForm);
    btnVerwijder.addEventListener("click",DeleteFriend);
    btnSlaOp.addEventListener("click",StoreFriend);
    slcVrienden.addEventListener("change",GetSelectedFriend);
}


function GetSelectedFriend()
{
    let id = slcVrienden.options[slcVrienden.selectedIndex].value;
    let selectedFriend = vrienden.find((friend) =>
    {
        return friend.Id == id;
    });
    FillForm(selectedFriend);
    
}

function FillForm(selectedFriend)
{
    lblId.innerHTML = selectedFriend.Id;
    txtNaam.value = selectedFriend.Naam;
    txtGeboortejaar.value = selectedFriend.Geboortejaar;
}

function LoadFriendsInList()
{
    //divFeedback leegmaken
    divFeedback.innerHTML = "";
    //lijst leegmaken
    slcVrienden.innerHTML = "";
    //pas lengte lijst aan aan aantal vrienden
    slcVrienden.size = vrienden.length;
    //foreach met objectnotatie
    vrienden.forEach(vriend => 
        {
            slcVrienden.options.add(new Option(`${vriend.Naam} °${vriend.Geboortejaar}`,`${vriend.Id}`));   
        });
    //vul de data van eerste vriend
    if(vrienden.length > 0)
        FillForm(vrienden[0]);
    else
        ResetForm();
}

function ResetForm()
{
    txtGeboortejaar.value = "";
    lblId.innerHTML = "";
    txtNaam.value = "";
    //Set the new Id
    lblId.innerHTML = vrienden.length+1;
}

function DeleteFriend()
{
    let id = slcVrienden.options[slcVrienden.selectedIndex].value;
    //verwijder element met filter methode
    vrienden = vrienden.filter((friend) => 
    {
        return friend.Id != id;
    })
    LoadFriendsInList();
    
}

function StoreFriend()
{
    //validate
    if(!ValidateNewFriend())
    {
            return;
    }
    let newFriend = new Object();
    newFriend.Id = lblId.innerHTML;
    
    newFriend.Naam = txtNaam.value;
    newFriend.Geboortejaar = txtGeboortejaar.value;
    vrienden.push(newFriend);
    LoadFriendsInList();
    
    //selecteer in lijst
    slcVrienden.options[slcVrienden.length-1].selected = true;
}

/**
 * validation functions
 */

/**
 * performs all validations
 */
function ValidateNewFriend()
{
    if(!CheckAge())
    {
        divFeedback.innerHTML = "Leeftijd is niet correct";
        return false;
    }
    if(FriendExists())
    {
        divFeedback.innerHTML = "U hebt al een vriend met dit Id";
        return false;
    }
    if(!CheckName())
    {
        divFeedback.innerHTML = "Naam moet min 3 karakters lang zijn!";
        return false;
    }
    return true;
}

/**
 * checks the age
 */
function CheckAge()
{
    let gebJaar = parseInt(txtGeboortejaar.value);
    if(gebJaar > 2002 || gebJaar <= 1920 
        || isNaN(gebJaar))
    {
        return false;
    }
    return true;
    
}
/**
 * checks if friend already exists
 */
function FriendExists()
{
    let newId = parseInt(lblId.innerHTML);
    let friend = vrienden.find((friend) => 
    {
        return friend.Id == newId;
    });
    if(friend)
    {
        return true;
    }
    return false;
}
/**
 * checks length of name
 */
function CheckName()
{
    if(txtNaam.value.length < 3)
        return false;
    return true;
}