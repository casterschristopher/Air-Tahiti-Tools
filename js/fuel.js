/*==================================================
    FUEL.JS
    Air Tahiti Tools
==================================================*/


/*==================================================
    DOM ELEMENTS
==================================================*/

/*---------- Fuel Density ----------*/

const densityInput = document.getElementById("fuelDensity");

const densityStatus = document.getElementById("densityStatus");

const densityStatusText = document.getElementById("densityStatusText");


/*---------- Fuel Converter ----------*/

const fuelQuantity = document.getElementById("fuelQuantity");

const fuelQuantityLabel = document.getElementById("fuelQuantityLabel");

const fuelUnit = document.getElementById("fuelUnit");

const fuelResult = document.getElementById("fuelResult");

const fuelResultUnit = document.getElementById("fuelResultUnit");


/*---------- Fuel Uplift ----------*/

const fuelOnboard = document.getElementById("fuelOnboard");

const fuelRequired = document.getElementById("fuelRequired");

const fuelUploadResult = document.getElementById("fuelUploadResult");


/*---------- Unit Converter ----------*/

const unitValue = document.getElementById("unitValue");

const unitValueLabel = document.getElementById("unitValueLabel");

const conversionType = document.getElementById("conversionType");

const unitResult = document.getElementById("unitResult");

const unitResultUnit = document.getElementById("unitResultUnit");


/*---------- Actions ----------*/

const resetFuel = document.getElementById("resetFuel");
/*==================================================
    GLOBAL VARIABLES
==================================================*/

let fuelDensity = 0;



/*==================================================
    DENSITY LIMITS
==================================================*/

const MIN_DENSITY = 0.7300;

const MAX_DENSITY = 0.8500;



/*==================================================
    MASS CONVERSIONS
==================================================*/

const KG_TO_G = 1000;

const G_TO_KG = 0.001;



const KG_TO_LB = 2.20462262185;

const LB_TO_KG = 0.45359237;



const KG_TO_OZ = 35.27396195;

const OZ_TO_KG = 0.028349523125;



const LB_TO_OZ = 16;

const OZ_TO_LB = 0.0625;



/*==================================================
    VOLUME CONVERSIONS
==================================================*/

const L_TO_ML = 1000;

const ML_TO_L = 0.001;



const L_TO_US_GAL = 0.26417205236;

const US_GAL_TO_L = 3.785411784;



const L_TO_IMP_GAL = 0.21996924830;

const IMP_GAL_TO_L = 4.54609;



const L_TO_US_FL_OZ = 33.81402270;

const US_FL_OZ_TO_L = 0.0295735295625;



const L_TO_IMP_FL_OZ = 35.19507973;

const IMP_FL_OZ_TO_L = 0.0284130625;



/*==================================================
    STATUS
==================================================*/

const STATUS = {

    WAITING : "waiting",

    VALID : "valid",

    CHECK : "check"

};
/*==================================================
    UTILITIES
==================================================*/

function isValidNumber(value){

    return value !== "" && !isNaN(value);

}



function round(value, decimals = 2){

    return Number(value).toFixed(decimals);

}



function formatDensity(value){

    return Number(value).toFixed(4);

}



/*==================================================
    RESULT ANIMATION
==================================================*/

function animateResult(element){

    element.classList.remove("updated");

    void element.offsetWidth;

    element.classList.add("updated");

}



function updateResult(element, value, decimals = 2){

    element.textContent = round(value, decimals);

    animateResult(element);

}



/*==================================================
    DENSITY STATUS
==================================================*/

function setDensityStatus(status){

    densityStatus.className = "density-status";

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
    LABELS
==================================================*/

function updateFuelQuantityLabel(){

    const labels = {

        liters: "Quantity (L)",

        milliliters: "Quantity (mL)",

        kilograms: "Quantity (kg)",

        grams: "Quantity (g)",

        pounds: "Quantity (lb)",

        ounces: "Quantity (oz)",

        usgallons: "Quantity (US gal)",

        impgallons: "Quantity (Imp gal)",

        usfloz: "Quantity (US fl oz)",

        impfloz: "Quantity (Imp fl oz)"

    };

    fuelQuantityLabel.textContent = labels[fuelUnit.value];

}



function updateUnitValueLabel(){

    const labels = {

        "kg-lb":"Value (kg)",
        "lb-kg":"Value (lb)",

        "kg-g":"Value (kg)",
        "g-kg":"Value (g)",

        "kg-oz":"Value (kg)",
        "oz-kg":"Value (oz)",

        "lb-oz":"Value (lb)",
        "oz-lb":"Value (oz)",

        "l-ml":"Value (L)",
        "ml-l":"Value (mL)",

        "l-usg":"Value (L)",
        "usg-l":"Value (US gal)",

        "l-impg":"Value (L)",
        "impg-l":"Value (Imp gal)",

        "l-usfloz":"Value (L)",
        "usfloz-l":"Value (US fl oz)",

        "l-impfloz":"Value (L)",
        "impfloz-l":"Value (Imp fl oz)"

    };

    unitValueLabel.textContent = labels[conversionType.value];

}
/*==================================================
    FUEL DENSITY
==================================================*/

function updateFuelDensity(){

    const value = parseFloat(densityInput.value);

    if(!isValidNumber(densityInput.value)){

        fuelDensity = 0;

        densityInput.value = "";

        setDensityStatus(STATUS.WAITING);

        calculateFuelConverter();

        return;

    }

    fuelDensity = value;

    densityInput.value = formatDensity(fuelDensity);

    if(
        fuelDensity >= MIN_DENSITY &&
        fuelDensity <= MAX_DENSITY
    ){

        setDensityStatus(STATUS.VALID);

    }else{

        setDensityStatus(STATUS.CHECK);

    }

    calculateFuelConverter();

}



/*==================================================
    DENSITY EVENTS
==================================================*/

densityInput.addEventListener(

    "input",

    function(){

        if(densityInput.value === ""){

            fuelDensity = 0;

            setDensityStatus(STATUS.WAITING);

            calculateFuelConverter();

        }

    }

);



densityInput.addEventListener(

    "blur",

    updateFuelDensity

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

    updateFuelQuantityLabel();

    const quantity = parseFloat(fuelQuantity.value);

    if(
        !isValidNumber(fuelQuantity.value) ||
        fuelDensity <= 0
    ){

        fuelResult.textContent = "0.00";
        fuelResultUnit.textContent = "—";

        return;

    }

    let kilograms = 0;
    let liters = 0;
    let result = 0;



    switch(fuelUnit.value){

        /*========== VOLUME =========*/

        case "liters":

            liters = quantity;
            kilograms = liters * fuelDensity;

            result = kilograms;
            fuelResultUnit.textContent = "kg";

            break;



        case "milliliters":

            liters = quantity * ML_TO_L;
            kilograms = liters * fuelDensity;

            result = kilograms;
            fuelResultUnit.textContent = "kg";

            break;



        case "usgallons":

            liters = quantity * US_GAL_TO_L;
            kilograms = liters * fuelDensity;

            result = kilograms;
            fuelResultUnit.textContent = "kg";

            break;



        case "impgallons":

            liters = quantity * IMP_GAL_TO_L;
            kilograms = liters * fuelDensity;

            result = kilograms;
            fuelResultUnit.textContent = "kg";

            break;



        case "usfloz":

            liters = quantity * US_FL_OZ_TO_L;
            kilograms = liters * fuelDensity;

            result = kilograms;
            fuelResultUnit.textContent = "kg";

            break;



        case "impfloz":

            liters = quantity * IMP_FL_OZ_TO_L;
            kilograms = liters * fuelDensity;

            result = kilograms;
            fuelResultUnit.textContent = "kg";

            break;



        /*========== MASS =========*/

        case "kilograms":

            kilograms = quantity;
            liters = kilograms / fuelDensity;

            result = liters;
            fuelResultUnit.textContent = "L";

            break;



        case "grams":

            kilograms = quantity * G_TO_KG;
            liters = kilograms / fuelDensity;

            result = liters;
            fuelResultUnit.textContent = "L";

            break;



        case "pounds":

            kilograms = quantity * LB_TO_KG;
            liters = kilograms / fuelDensity;

            result = liters;
            fuelResultUnit.textContent = "L";

            break;



        case "ounces":

            kilograms = quantity * OZ_TO_KG;
            liters = kilograms / fuelDensity;

            result = liters;
            fuelResultUnit.textContent = "L";

            break;

    }



    updateResult(

        fuelResult,

        result

    );

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

    function(){

        updateFuelQuantityLabel();

        calculateFuelConverter();

    }

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

    const upload = Math.max(

        0,

        required - onboard

    );

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

    updateUnitValueLabel();

    const value = parseFloat(unitValue.value);

    if(!isValidNumber(unitValue.value)){

        unitResult.textContent = "0.00";

        unitResultUnit.textContent = "—";

        return;

    }

    let result = 0;
    let unit = "";



    switch(conversionType.value){

        /*========== MASS ==========*/

        case "kg-lb":

            result = value * KG_TO_LB;
            unit = "lb";

            break;



        case "lb-kg":

            result = value * LB_TO_KG;
            unit = "kg";

            break;



        case "kg-g":

            result = value * KG_TO_G;
            unit = "g";

            break;



        case "g-kg":

            result = value * G_TO_KG;
            unit = "kg";

            break;



        case "kg-oz":

            result = value * KG_TO_OZ;
            unit = "oz";

            break;



        case "oz-kg":

            result = value * OZ_TO_KG;
            unit = "kg";

            break;



        case "lb-oz":

            result = value * LB_TO_OZ;
            unit = "oz";

            break;



        case "oz-lb":

            result = value * OZ_TO_LB;
            unit = "lb";

            break;



        /*========== VOLUME ==========*/

        case "l-ml":

            result = value * L_TO_ML;
            unit = "mL";

            break;



        case "ml-l":

            result = value * ML_TO_L;
            unit = "L";

            break;



        case "l-usg":

            result = value * L_TO_US_GAL;
            unit = "US gal";

            break;



        case "usg-l":

            result = value * US_GAL_TO_L;
            unit = "L";

            break;



        case "l-impg":

            result = value * L_TO_IMP_GAL;
            unit = "Imp gal";

            break;



        case "impg-l":

            result = value * IMP_GAL_TO_L;
            unit = "L";

            break;



        case "l-usfloz":

            result = value * L_TO_US_FL_OZ;
            unit = "US fl oz";

            break;



        case "usfloz-l":

            result = value * US_FL_OZ_TO_L;
            unit = "L";

            break;



        case "l-impfloz":

            result = value * L_TO_IMP_FL_OZ;
            unit = "Imp fl oz";

            break;



        case "impfloz-l":

            result = value * IMP_FL_OZ_TO_L;
            unit = "L";

            break;

    }



    unitResultUnit.textContent = unit;

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

    function(){

        updateUnitValueLabel();

        calculateUnitConverter();

    }

);
/*==================================================
    RESET
==================================================*/

function resetFuelTools(){

    /*---------- Fuel Converter ----------*/

    fuelQuantity.value = "";

    fuelUnit.selectedIndex = 0;

    fuelResult.textContent = "0.00";

    fuelResultUnit.textContent = "kg";

    updateFuelQuantityLabel();



    /*---------- Fuel Uplift ----------*/

    fuelOnboard.value = "";

    fuelRequired.value = "";

    fuelUploadResult.textContent = "0.0";



    /*---------- Unit Converter ----------*/

    unitValue.value = "";

    conversionType.selectedIndex = 0;

    unitResult.textContent = "0.00";

    unitResultUnit.textContent = "lb";

    updateUnitValueLabel();

}



/*==================================================
    RESET EVENT
==================================================*/

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

updateFuelQuantityLabel();

updateUnitValueLabel();

resetFuelTools();

calculateFuelConverter();

calculateFuelUplift();

calculateUnitConverter();



/*==================================================
    END OF FILE
==================================================*/