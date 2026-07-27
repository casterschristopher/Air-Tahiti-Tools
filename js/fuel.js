/*==================================================
    FUEL.JS
    Air Tahiti Tools
==================================================*/


/*==================================================
    DOM
==================================================*/

const densityInput = document.getElementById("fuelDensity");

const densityStatus = document.getElementById("densityStatus");

const densityStatusText = document.getElementById("densityStatusText");



const fuelQuantity = document.getElementById("fuelQuantity");

const fuelUnit = document.getElementById("fuelUnit");

const fuelResult = document.getElementById("fuelResult");

const fuelResultUnit = document.getElementById("fuelResultUnit");



const fuelOnboard = document.getElementById("fuelOnboard");

const fuelRequired = document.getElementById("fuelRequired");

const fuelUploadResult = document.getElementById("fuelUploadResult");



const unitValue = document.getElementById("unitValue");

const conversionType = document.getElementById("conversionType");

const unitResult = document.getElementById("unitResult");

const unitResultUnit = document.getElementById("unitResultUnit");



const resetFuel = document.getElementById("resetFuel");
/*==================================================
    GLOBAL VARIABLES
==================================================*/

let fuelDensity = 0;

const MIN_DENSITY = 0.7300;

const MAX_DENSITY = 0.8500;



/*==================================================
    CONVERSION CONSTANTS
==================================================*/

const KG_TO_LB = 2.20462262185;

const LB_TO_KG = 1 / KG_TO_LB;



const LITER_TO_US_GAL = 0.26417205236;

const US_GAL_TO_LITER = 1 / LITER_TO_US_GAL;



const LITER_TO_IMP_GAL = 0.21996924830;

const IMP_GAL_TO_LITER = 1 / LITER_TO_IMP_GAL;



/*==================================================
    STATUS
==================================================*/

const STATUS = {

    WAITING: "waiting",

    VALID: "valid",

    CHECK: "check"

};
/*==================================================
    UTILITIES
==================================================*/

function isValidNumber(value){

    return !isNaN(value) && value !== "";

}



function formatDensity(value){

    return Number(value).toFixed(4);

}



function round(value, decimals = 2){

    return Number(value).toFixed(decimals);

}



/*==================================================
    RESULT ANIMATION
==================================================*/

function animateResult(element){

    element.classList.remove("updated");

    void element.offsetWidth;

    element.classList.add("updated");

}



/*==================================================
    STATUS
==================================================*/

function setDensityStatus(status){

    densityStatus.classList.remove(

        "status-waiting",

        "status-valid",

        "status-check"

    );

    switch(status){

        case STATUS.VALID:

            densityStatus.classList.add("status-valid");

            densityStatusText.textContent = "Valid";

            break;

        case STATUS.CHECK:

            densityStatus.classList.add("status-check");

            densityStatusText.textContent = "Check";

            break;

        default:

            densityStatus.classList.add("status-waiting");

            densityStatusText.textContent = "Waiting";

            break;

    }

}



/*==================================================
    RESULTS
==================================================*/

function updateResult(element, value, decimals = 2){

    element.textContent = round(value, decimals);

    animateResult(element);

}
/*==================================================
    FUEL DENSITY
==================================================*/

function updateDensity(){

    const value = parseFloat(densityInput.value);

    if(!isValidNumber(densityInput.value)){

        fuelDensity = 0;

        setDensityStatus(STATUS.WAITING);

        densityInput.value = "";

        calculateFuelConverter();

        calculateFuelUplift();

        return;

    }

    fuelDensity = value;

    densityInput.value = formatDensity(fuelDensity);

    if(fuelDensity >= MIN_DENSITY && fuelDensity <= MAX_DENSITY){

        setDensityStatus(STATUS.VALID);

    }else{

        setDensityStatus(STATUS.CHECK);

    }

    calculateFuelConverter();

    calculateFuelUplift();

}



/*==================================================
    DENSITY EVENTS
==================================================*/

densityInput.addEventListener(

    "blur",

    updateDensity

);


densityInput.addEventListener(

    "keydown",

    function(event){

        if(event.key === "Enter"){

            densityInput.blur();

        }

    }

);
/*==================================================
    FUEL CONVERTER
==================================================*/

function calculateFuelConverter(){

    const quantity = parseFloat(fuelQuantity.value);

    if(!isValidNumber(fuelQuantity.value) || fuelDensity <= 0){

        fuelResult.textContent = "0.00";

        fuelResultUnit.textContent = "—";

        return;

    }

    let result = 0;

    switch(fuelUnit.value){

        case "liters":

            result = quantity * fuelDensity;

            fuelResultUnit.textContent = "kg";

            break;

        case "kilograms":

            result = quantity / fuelDensity;

            fuelResultUnit.textContent = "L";

            break;

        case "pounds":

            result = (quantity * LB_TO_KG) / fuelDensity;

            fuelResultUnit.textContent = "L";

            break;

        case "usgallons":

            result = (quantity * US_GAL_TO_LITER) * fuelDensity;

            fuelResultUnit.textContent = "kg";

            break;

        case "impgallons":

            result = (quantity * IMP_GAL_TO_LITER) * fuelDensity;

            fuelResultUnit.textContent = "kg";

            break;

    }

    updateResult(fuelResult, result);

}



/*==================================================
    CONVERTER EVENTS
==================================================*/

fuelQuantity.addEventListener(

    "input",

    calculateFuelConverter

);


fuelUnit.addEventListener(

    "change",

    calculateFuelConverter

);
/*==================================================
    FUEL UPLIFT
==================================================*/

function calculateFuelUplift(){

    const onboard = parseFloat(fuelOnboard.value);

    const required = parseFloat(fuelRequired.value);

    if(
        !isValidNumber(fuelOnboard.value) ||
        !isValidNumber(fuelRequired.value)
    ){

        fuelUploadResult.textContent = "0.0";

        return;

    }

    const upload = Math.max(0, required - onboard);

    updateResult(

        fuelUploadResult,

        upload,

        1

    );

}



/*==================================================
    UPLIFT EVENTS
==================================================*/

fuelOnboard.addEventListener(

    "input",

    calculateFuelUplift

);


fuelRequired.addEventListener(

    "input",

    calculateFuelUplift

);
/*==================================================
    UNIT CONVERTER
==================================================*/

function calculateUnitConverter(){

    const value = parseFloat(unitValue.value);

    if(!isValidNumber(unitValue.value)){

        unitResult.textContent = "0.00";

        unitResultUnit.textContent = "—";

        return;

    }

    let result = 0;

    switch(conversionType.value){

        case "kg-lb":

            result = value * KG_TO_LB;

            unitResultUnit.textContent = "lb";

            break;

        case "lb-kg":

            result = value * LB_TO_KG;

            unitResultUnit.textContent = "kg";

            break;

        case "l-usg":

            result = value * LITER_TO_US_GAL;

            unitResultUnit.textContent = "US gal";

            break;

        case "usg-l":

            result = value * US_GAL_TO_LITER;

            unitResultUnit.textContent = "L";

            break;

        case "l-impg":

            result = value * LITER_TO_IMP_GAL;

            unitResultUnit.textContent = "Imp gal";

            break;

        case "impg-l":

            result = value * IMP_GAL_TO_LITER;

            unitResultUnit.textContent = "L";

            break;

    }

    updateResult(

        unitResult,

        result

    );

}



/*==================================================
    UNIT CONVERTER EVENTS
==================================================*/

unitValue.addEventListener(

    "input",

    calculateUnitConverter

);


conversionType.addEventListener(

    "change",

    calculateUnitConverter

);
/*==================================================
    RESET
==================================================*/

function resetFuelTools(){

    fuelQuantity.value = "";

    fuelUnit.selectedIndex = 0;

    fuelResult.textContent = "0.00";

    fuelResultUnit.textContent = "—";



    fuelOnboard.value = "";

    fuelRequired.value = "";

    fuelUploadResult.textContent = "0.0";



    unitValue.value = "";

    conversionType.selectedIndex = 0;

    unitResult.textContent = "0.00";

    unitResultUnit.textContent = "—";

}



resetFuel.addEventListener(

    "click",

    resetFuelTools

);



/*==================================================
    INITIALIZATION
==================================================*/

setDensityStatus(

    STATUS.WAITING

);

resetFuelTools();

calculateFuelConverter();

calculateFuelUplift();

calculateUnitConverter();
