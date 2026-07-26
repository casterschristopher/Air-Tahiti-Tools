/*==========================================================
 AIR TAHITI TOOLS
 Fuel Tools PRO
 Version 2.0
==========================================================*/

"use strict";

/*==========================================================
CONSTANTS
==========================================================*/

const US_GAL = 3.785411784;
const IMP_GAL = 4.54609;

/*==========================================================
DOM - CONVERTER
==========================================================*/

const valueInput = document.getElementById("value");
const unitSelect = document.getElementById("unit");
const densityInput = document.getElementById("density");

const kgOutput = document.getElementById("kg");
const litresOutput = document.getElementById("litres");
const usgOutput = document.getElementById("usg");
const impOutput = document.getElementById("imp");

const copyConverter = document.getElementById("copyConverter");
const resetConverter = document.getElementById("resetConverter");

/*==========================================================
DOM - UPLIFT
==========================================================*/

const fobInput = document.getElementById("fob");
const requiredInput = document.getElementById("requiredFuel");
const upliftDensity = document.getElementById("upliftDensity");

const fuelToAdd = document.getElementById("fuelToAdd");
const fuelToAddL = document.getElementById("fuelToAddL");

const copyUplift = document.getElementById("copyUplift");
const resetUplift = document.getElementById("resetUplift");

/*==========================================================
DEFAULT DENSITY
==========================================================*/

const savedDensity =
    localStorage.getItem("att_density") || "0.800";

if (densityInput)
    densityInput.value = savedDensity;

if (upliftDensity)
    upliftDensity.value = savedDensity;

/*==========================================================
CONVERTER
==========================================================*/

function convertFuel() {

    if (!valueInput) return;

    const value = parseFloat(valueInput.value);

    if (isNaN(value)) {

        kgOutput.value = "";
        litresOutput.value = "";
        usgOutput.value = "";
        impOutput.value = "";

        return;

    }

    const density = parseFloat(densityInput.value) || 0.800;

    let kg;

    switch (unitSelect.value) {

        case "kg":
            kg = value;
            break;

        case "litre":
            kg = value * density;
            break;

        case "usg":
            kg = value * US_GAL * density;
            break;

        case "imp":
            kg = value * IMP_GAL * density;
            break;

    }

    const litres = kg / density;

    kgOutput.value = kg.toFixed(3);
    litresOutput.value = litres.toFixed(3);
    usgOutput.value = (litres / US_GAL).toFixed(3);
    impOutput.value = (litres / IMP_GAL).toFixed(3);

}

/*==========================================================
UPLIFT
==========================================================*/

function calculateUplift() {

    if (!fobInput) return;

    const fob = parseFloat(fobInput.value) || 0;
    const required = parseFloat(requiredInput.value) || 0;
    const density = parseFloat(upliftDensity.value) || 0.800;

    const addKg = Math.max(required - fob, 0);
    const addL = addKg / density;

    fuelToAdd.value = addKg.toFixed(3);
    fuelToAddL.value = addL.toFixed(3);

}

/*==========================================================
COPY
==========================================================*/

async function copyConverterResult() {

    const text =
`Fuel Conversion

kg : ${kgOutput.value}
L : ${litresOutput.value}
US gal : ${usgOutput.value}
Imp gal : ${impOutput.value}
Density : ${densityInput.value}`;

    await navigator.clipboard.writeText(text);

}

async function copyUpliftResult() {

    const text =
`Fuel Uplift

FOB : ${fobInput.value} kg
Required : ${requiredInput.value} kg
Add : ${fuelToAdd.value} kg
Add : ${fuelToAddL.value} L
Density : ${upliftDensity.value}`;

    await navigator.clipboard.writeText(text);

}

/*==========================================================
RESET
==========================================================*/

function resetConverterValues() {

    valueInput.value = "";

    densityInput.value = savedDensity;

    kgOutput.value = "";
    litresOutput.value = "";
    usgOutput.value = "";
    impOutput.value = "";

}

function resetUpliftValues() {

    fobInput.value = "";
    requiredInput.value = "";

    upliftDensity.value = savedDensity;

    fuelToAdd.value = "";
    fuelToAddL.value = "";

}

/*==========================================================
TABS
==========================================================*/

document.querySelectorAll(".tab").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".tab")
            .forEach(tab => tab.classList.remove("active"));

        document.querySelectorAll(".tab-page")
            .forEach(page => page.classList.remove("active"));

        button.classList.add("active");

        document
            .getElementById(button.dataset.tab)
            .classList.add("active");

    });

});

/*==========================================================
EVENTS
==========================================================*/

valueInput?.addEventListener("input", convertFuel);
densityInput?.addEventListener("input", convertFuel);
unitSelect?.addEventListener("change", convertFuel);

fobInput?.addEventListener("input", calculateUplift);
requiredInput?.addEventListener("input", calculateUplift);
upliftDensity?.addEventListener("input", calculateUplift);

copyConverter?.addEventListener("click", copyConverterResult);
copyUplift?.addEventListener("click", copyUpliftResult);

resetConverter?.addEventListener("click", resetConverterValues);
resetUplift?.addEventListener("click", resetUpliftValues);

/*==========================================================
INIT
==========================================================*/

convertFuel();
calculateUplift();
