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
    slcVrienden.addEventListener("change",GetSelectedFriend);
}

/**
 * gets the selected friend
 */
function GetSelectedFriend()
{
    
}
/**
 * fills the form
 * @param {*} selectedFriend 
 */
function FillForm(selectedFriend)
{
  
}
/**
 * loads the friends in the list
 */
function LoadFriendsInList()
{
   
}
/**
 * resets the form and calculates new id
 */
function ResetForm()
{
   
}
/**
 * Deletes a friend
 */
function DeleteFriend()
{
   
}
/**
 * saves a friend
 */
function StoreFriend()
{
    
}

/**
 * validation functions
 */

/**
 * performs all validations
 */
function ValidateNewFriend()
{
   
}

/**
 * checks the age
 */
function CheckAge()
{
}
/**
 * checks if friend already exists
 */
function FriendExists()
{
   
}
/**
 * checks length of name
 */
function CheckName()
{
}