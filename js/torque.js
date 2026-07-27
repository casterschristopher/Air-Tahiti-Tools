/*==================================================
    TORQUE.JS
    Air Tahiti Tools
==================================================*/


/*==================================================
    ELEMENTS
==================================================*/

const setupCards = document.querySelectorAll(".setup-card");

const selectedSetupName = document.getElementById("selectedSetupName");
const setupInformation = document.getElementById("setupInformation");

const formulaText = document.getElementById("formulaText");

const torqueResult = document.getElementById("torqueResult");
const torqueResultUnit = document.getElementById("torqueResultUnit");

const differenceResult = document.getElementById("differenceResult");
const differenceUnit = document.getElementById("differenceUnit");

const warningText = document.getElementById("warningText");

const torqueInput = document.getElementById("realTorque");
const torqueUnit = document.getElementById("torqueUnit");

const inputL = document.getElementById("lengthL");
const inputL1 = document.getElementById("lengthL1");
const inputL2 = document.getElementById("lengthL2");
const inputL3 = document.getElementById("lengthL3");
const inputAngle = document.getElementById("angleValue");

const groupL = document.getElementById("groupL");
const groupL1 = document.getElementById("groupL1");
const groupL2 = document.getElementById("groupL2");
const groupL3 = document.getElementById("groupL3");
const groupAngle = document.getElementById("groupAngle");

const calculateButton = document.getElementById("calculateTorque");
const copyButton = document.getElementById("copyTorque");
const resetButton = document.getElementById("resetTorque");



/*==================================================
    CURRENT SETUP
==================================================*/

let currentSetup = null;



/*==================================================
    FORMAT
==================================================*/

function formatNumber(value){

    return Number(value).toFixed(2);

}
/*==================================================
    SETUP DATA
==================================================*/

const setups = {

    1:{

        name:"Setup 1",

        description:"Standard torque wrench. No correction required.",

        formula:"Tsetting = Trequired",

        warning:"No correction required. Set the wrench to the required torque.",

        fields:[],

        image:"../assets/diagrams/setup1.png"

    },



    2:{

        name:"Setup 2",

        description:"Inline adapter.",

        formula:"T = T × L / (L + L1)",

        warning:"Measure L and L1 carefully.",

        fields:["L","L1"],

        image:"../assets/diagrams/setup2.png"

    },



    3:{

        name:"Setup 3",

        description:"Adapter with extension.",

        formula:"T = T × L / (L + L1)",

        warning:"Measure L and L1 along the centerline.",

        fields:["L","L1"],

        image:"../assets/diagrams/setup3.png"

    },



    4:{

        name:"Setup 4",

        description:"Rear extension.",

        formula:"T = T × (L + L2) / (L + L1 + L2)",

        warning:"Verify L, L1 and L2 before calculation.",

        fields:["L","L1","L2"],

        image:"../assets/diagrams/setup4.png"

    },



    5:{

        name:"Setup 5",

        description:"90° crowfoot adapter. No correction required.",

        formula:"Tsetting = Trequired",

        warning:"The adapter is positioned at 90°. No correction required.",

        fields:[],

        image:"../assets/diagrams/setup5.png"

    },



    6:{

        name:"Setup 6",

        description:"Offset adapter.",

        formula:"T = T × L / (L + L1)",

        warning:"Use the effective offset length (L1).",

        fields:["L","L1"],

        image:"../assets/diagrams/setup6.png"

    },



    7:{

        name:"Setup 7",

        description:"Angled adapter.",

        formula:"T = T × L / (L + L3 × cos(180° − α))",

        warning:"Measure L3 and enter the adapter angle.",

        fields:["L","L3","ANGLE"],

        image:"../assets/diagrams/setup7.png"

    }

};
/*==================================================
    SELECT SETUP
==================================================*/

function selectSetup(setupNumber){

    currentSetup = setupNumber;

    const setup = setups[setupNumber];



    /*----------------------------------------------
        Active Card
    ----------------------------------------------*/

    setupCards.forEach(card=>{

        card.classList.remove("active");

    });

    document
        .querySelector(`[data-setup="${setupNumber}"]`)
        .classList.add("active");



    /*----------------------------------------------
        Information
    ----------------------------------------------*/

    selectedSetupName.textContent = setup.name;

    setupInformation.textContent = setup.description;

    formulaText.textContent = setup.formula;

    warningText.textContent = setup.warning;



    /*----------------------------------------------
        Selected Image
    ----------------------------------------------*/

    const selectedImage = document.getElementById("selectedSetupImage");

    if(selectedImage){

        selectedImage.src = setup.image;

        selectedImage.alt = setup.name;

    }



    /*----------------------------------------------
        Inputs
    ----------------------------------------------*/

    updateVisibleFields(setup.fields);



    /*----------------------------------------------
        Reset Result
    ----------------------------------------------*/

    torqueResult.textContent = "0.00";

    differenceResult.textContent = "0.00";

    torqueResultUnit.textContent = torqueUnit.value;

    differenceUnit.textContent = torqueUnit.value;

}



/*==================================================
    SETUP CARD EVENTS
==================================================*/

setupCards.forEach(card=>{

    card.addEventListener("click",()=>{

        const setupNumber = Number(card.dataset.setup);

        selectSetup(setupNumber);

    });

});



/*==================================================
    DEFAULT SETUP
==================================================*/

selectSetup(1);
/*==================================================
    DISPLAY INPUTS
==================================================*/

function hideAllFields(){

    groupL.classList.add("hidden");
    groupL1.classList.add("hidden");
    groupL2.classList.add("hidden");
    groupL3.classList.add("hidden");
    groupAngle.classList.add("hidden");

}



/*==================================================
    SHOW REQUIRED FIELDS
==================================================*/

function updateVisibleFields(fields){

    hideAllFields();



    if(fields.includes("L")){

        groupL.classList.remove("hidden");

    }



    if(fields.includes("L1")){

        groupL1.classList.remove("hidden");

    }



    if(fields.includes("L2")){

        groupL2.classList.remove("hidden");

    }



    if(fields.includes("L3")){

        groupL3.classList.remove("hidden");

    }



    if(fields.includes("ANGLE")){

        groupAngle.classList.remove("hidden");

    }

}



/*==================================================
    READ INPUT VALUES
==================================================*/

function getInputValues(){

    return{

        torque:Number(torqueInput.value),

        L:Number(inputL.value),

        L1:Number(inputL1.value),

        L2:Number(inputL2.value),

        L3:Number(inputL3.value),

        angle:Number(inputAngle.value),

        unit:torqueUnit.value

    };

}



/*==================================================
    VALIDATION
==================================================*/

function validateInputs(values){

    if(values.torque <= 0){

        alert("Enter a valid required torque.");

        return false;

    }



    if(currentSetup === 2 || currentSetup === 3 || currentSetup === 6){

        if(values.L <= 0 || values.L1 <= 0){

            alert("Enter L and L1.");

            return false;

        }

    }



    if(currentSetup === 4){

        if(values.L <= 0 || values.L1 <= 0 || values.L2 <= 0){

            alert("Enter L, L1 and L2.");

            return false;

        }

    }



    if(currentSetup === 7){

        if(values.L <= 0 || values.L3 <= 0){

            alert("Enter L and L3.");

            return false;

        }

        if(values.angle < 0 || values.angle > 180){

            alert("Angle must be between 0° and 180°.");

            return false;

        }

    }



    return true;

}
/*==================================================
    TORQUE CALCULATION
==================================================*/

function calculateTorque(){

    if(currentSetup === null){

        alert("Select a setup.");

        return;

    }

    const values = getInputValues();

    if(!validateInputs(values)){

        return;

    }

    let setting = values.torque;

    switch(currentSetup){

        /*------------------------------------------
            SETUP 1
            Standard
        ------------------------------------------*/

        case 1:

            setting = values.torque;

            break;



        /*------------------------------------------
            SETUP 2
        ------------------------------------------*/

        case 2:

            setting =
                values.torque *
                values.L /
                (values.L + values.L1);

            break;



        /*------------------------------------------
            SETUP 3
        ------------------------------------------*/

        case 3:

            setting =
                values.torque *
                values.L /
                (values.L + values.L1);

            break;



        /*------------------------------------------
            SETUP 4
        ------------------------------------------*/

        case 4:

            setting =
                values.torque *
                (values.L + values.L2) /
                (values.L + values.L1 + values.L2);

            break;



        /*------------------------------------------
            SETUP 5
            90° Crowfoot
        ------------------------------------------*/

        case 5:

            setting = values.torque;

            break;



        /*------------------------------------------
            SETUP 6
        ------------------------------------------*/

        case 6:

            setting =
                values.torque *
                values.L /
                (values.L + values.L1);

            break;



        /*------------------------------------------
            SETUP 7
        ------------------------------------------*/

        case 7:

            const radians =
                (180 - values.angle) *
                Math.PI /
                180;

            setting =
                values.torque *
                values.L /
                (
                    values.L +
                    (
                        values.L3 *
                        Math.cos(radians)
                    )
                );

            break;

    }



    /*------------------------------------------
        DISPLAY RESULT
    ------------------------------------------*/

    torqueResult.textContent = formatNumber(setting);

    torqueResultUnit.textContent = values.unit;

    differenceResult.textContent = formatNumber(setting - values.torque);

    differenceUnit.textContent = values.unit;



    /*------------------------------------------
        RESULT ANIMATION
    ------------------------------------------*/

    document
        .querySelector(".result-highlight")
        .classList.remove("updated");

    void document
        .querySelector(".result-highlight")
        .offsetWidth;

    document
        .querySelector(".result-highlight")
        .classList.add("updated");

}
/*==================================================
    COPY RESULT
==================================================*/

async function copyResult(){

    if(currentSetup === null){

        alert("No setup selected.");

        return;

    }

    const text =

`Air Tahiti Tools - Torque Calculator

Setup : ${setups[currentSetup].name}

Required Torque : ${torqueInput.value} ${torqueUnit.value}

Torque Setting : ${torqueResult.textContent} ${torqueResultUnit.textContent}

Difference : ${differenceResult.textContent} ${differenceUnit.textContent}`;

    try{

        await navigator.clipboard.writeText(text);

        copyButton.textContent = "Copied ✓";

        setTimeout(()=>{

            copyButton.textContent = "Copy Result";

        },2000);

    }

    catch(error){

        alert("Unable to copy the result.");

    }

}



/*==================================================
    RESET
==================================================*/

function resetCalculator(){

    torqueInput.value = "";

    inputL.value = "";

    inputL1.value = "";

    inputL2.value = "";

    inputL3.value = "";

    inputAngle.value = "";

    torqueUnit.selectedIndex = 0;

    torqueResult.textContent = "0.00";

    differenceResult.textContent = "0.00";

    torqueResultUnit.textContent = torqueUnit.value;

    differenceUnit.textContent = torqueUnit.value;

    selectSetup(1);

}



/*==================================================
    UPDATE UNIT
==================================================*/

function updateUnits(){

    torqueResultUnit.textContent = torqueUnit.value;

    differenceUnit.textContent = torqueUnit.value;

}
/*==================================================
    EVENT LISTENERS
==================================================*/

/*----------------------------------------------
    Calculate
----------------------------------------------*/

calculateButton.addEventListener("click", () => {

    calculateTorque();

});



/*----------------------------------------------
    Copy Result
----------------------------------------------*/

copyButton.addEventListener("click", () => {

    copyResult();

});



/*----------------------------------------------
    Reset
----------------------------------------------*/

resetButton.addEventListener("click", () => {

    resetCalculator();

});



/*----------------------------------------------
    Update Unit
----------------------------------------------*/

torqueUnit.addEventListener("change", () => {

    updateUnits();

});



/*----------------------------------------------
    Press ENTER
----------------------------------------------*/

document.querySelectorAll("input").forEach(input => {

    input.addEventListener("keydown", event => {

        if(event.key === "Enter"){

            event.preventDefault();

            calculateTorque();

        }

    });

});



/*----------------------------------------------
    Auto Update Unit at Startup
----------------------------------------------*/

updateUnits();



/*----------------------------------------------
    Initialize
----------------------------------------------*/

selectSetup(1);
