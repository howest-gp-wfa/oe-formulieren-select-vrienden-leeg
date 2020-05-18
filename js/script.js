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
var divFeedback;//voor de validatie


window.addEventListener('load', Initieer);

/**
 * Main program function
 */
function Initieer() 
{
    BindElements();
    addEvents();
    LoadFriendsInList();
};


/**FUNCTIONS */

/**
 * bind the elements
 */

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
/**
 * Add the event listeners
 */
function addEvents()
{
    btnNieuw.addEventListener("click",ResetForm);
    btnVerwijder.addEventListener("click",DeleteFriend);
    btnSlaOp.addEventListener("click",StoreFriend);
    //event listener op de lijst
    slcVrienden.addEventListener("change",GetSelectedFriend);
}

/**
 * gets the selected friend
 * and fill the form with the friend data
 */
function GetSelectedFriend()
{
    //haal het id op
    let id = slcVrienden.options[slcVrienden.selectedIndex].value;
    //haal de vriend op uit de array
    //met high order function find
    let selectedFriend = vrienden.find(friend =>
        {
            //voorwaarde om te zoeken
            return friend.Id == id;
        });
    //Geef door aan FillForm om het formulier te vullen
    FillForm(selectedFriend);
}
/**
 * fills the form
 * @param {Friend} selectedFriend 
 */
function FillForm(selectedFriend)
{
    //vul de formelementen
    lblId.innerHTML = selectedFriend.Id;
    txtNaam.value = selectedFriend.Naam;
    txtGeboortejaar.value = selectedFriend.Geboortejaar;
}
/**
 * loads the friends in the list
 */
function LoadFriendsInList()
{
   //lijst leegmaken
   slcVrienden.innerHTML = "";
   //lengte van de lijst aanpassen aan de array
   //size property
   slcVrienden.size = vrienden.length;
   //vullen van de lijst higher order function
   //met arrow function
   vrienden.forEach(vriend => 
    {
        slcVrienden.options.add
        (
            new Option(`${vriend.Naam}°${vriend.Geboortejaar}`,vriend.Id)
        );//voeg option toe aan lijst
    });
}
/**
 * resets the form and calculates new id
 */
function ResetForm()
{
   //form elementen leegmaken
   txtGeboortejaar.value = "";
   txtNaam.value = "";
   //genereer Id laatste vriend + 1
   let laatsteId = vrienden[vrienden.length-1].Id+1;
   lblId.innerHTML = laatsteId;
}
/**
 * Deletes a friend
 */
function DeleteFriend()
{
   //haal het id op = geselecteerde vriend
   let id = slcVrienden.options[slcVrienden.selectedIndex].value;
   //verwijder de vriend uit de array
   //high order filter methode gebruiken
   vrienden = vrienden.filter(vriend =>
   {
        return vriend.Id != id;
   });
   //herlaad de lijst
   LoadFriendsInList();
   //maak het formulier klaar voor een nieuwe vriend
   ResetForm();
   
}
/**
 * saves a friend
 */
function StoreFriend()
{
    //valideren
    if(!ValidateNewFriend())
    {
        return; 
    }
    //nieuw friend object
    let nieuweVriend = new Object(); //object prototype
    //zelf properties aan toevoegen
    //data toevoegen aan object
    nieuweVriend.Id = parseInt(lblId.innerHTML);
    nieuweVriend.Naam = txtNaam.value;
    nieuweVriend.Geboortejaar = txtGeboortejaar.value;
    //object gaan toevoegen aan einde array
    vrienden.push(nieuweVriend);
    //lijst herladen
    LoadFriendsInList();
    //selecteer nieuwe vriend in lijst
    slcVrienden.options[slcVrienden.length-1].selected = true;
}

/**
 * validation functions
 */

/**
 * performs all validations
 * returns true or false
 */
function ValidateNewFriend()
{
   //check age
   if(!CheckAge())
   {
       divFeedback.innerHTML = "Leeftijd niet correct!";
       return false;
   }
   if(FriendExists())//id bestaat al
   {
       divFeedback.innerHTML = "Geef een uniek Id in!"; 
       return false;
   }
   if(!CheckName())
   {
       divFeedback.innerHTML = "Naam moet minimum 3 karakters lang zijn!";
       return false;
   }
   return true;
}

/**
 * checks the age
 */
function CheckAge()
{
    let geboorteJaar = parseInt(txtGeboortejaar.value)
    if(geboorteJaar < 1920 || geboorteJaar > 2002 ||
        isNaN(geboorteJaar))
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
    //haal het nieuwe id op
    let nieuwId = lblId.innerHTML;
    //zoeken het Id 
    let zoekVriend = vrienden.find(vriend =>
        {
            return vriend.Id == nieuwId;
        });
    if(zoekVriend)
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
    //length moet minimum 3 zijn
    if(txtNaam.value.length < 3)
       return false;
    return true;
}