/* ==========================================================
   AIR TAHITI TOOLS
   Fuel Tools
   Version 1.0
========================================================== */

"use strict";

/*==========================================================
  CONSTANTS
==========================================================*/

const KG_PER_US_GAL = 3.785411784;
const KG_PER_IMP_GAL = 4.54609;

const DEFAULT_DENSITY = 0.800;

/*==========================================================
  DOM
==========================================================*/

const kgInput = document.getElementById("kg");
const litreInput = document.getElementById("litres");
const usInput = document.getElementById("usGallons");
const impInput = document.getElementById("impGallons");
const densityInput = document.getElementById("density");

const copyButton = document.getElementById("copyButton");
const resetButton = document.getElementById("resetButton");

/*==========================================================
  UTILITIES
==========================================================*/

function round(value) {
    return Number(value).toFixed(3);
}

function density() {

    let d = parseFloat(densityInput.value);

    if (isNaN(d))
        d = DEFAULT_DENSITY;

    if (d < 0.700)
        d = 0.700;

    if (d > 0.850)
        d = 0.850;

    densityInput.value = d.toFixed(3);

    return d;
}

function clearFields(except) {

    const fields = [
        kgInput,
        litreInput,
        usInput,
        impInput
    ];

    fields.forEach(field => {

        if (field !== except) {

            field.value = "";

        }

    });

}

/*==========================================================
  CONVERSIONS
==========================================================*/

function fromKg() {

    const kg = parseFloat(kgInput.value);

    if (isNaN(kg))
        return;

    const d = density();

    litreInput.value = round(kg / d);

    usInput.value = round((kg / d) / KG_PER_US_GAL);

    impInput.value = round((kg / d) / KG_PER_IMP_GAL);

}

function fromLitres() {

    const litres = parseFloat(litreInput.value);

    if (isNaN(litres))
        return;

    const d = density();

    const kg = litres * d;

    kgInput.value = round(kg);

    usInput.value = round(litres / KG_PER_US_GAL);

    impInput.value = round(litres / KG_PER_IMP_GAL);

}

function fromUS() {

    const us = parseFloat(usInput.value);

    if (isNaN(us))
        return;

    const litres = us * KG_PER_US_GAL;

    litreInput.value = round(litres);

    const kg = litres * density();

    kgInput.value = round(kg);

    impInput.value = round(litres / KG_PER_IMP_GAL);

}

function fromIMP() {

    const imp = parseFloat(impInput.value);

    if (isNaN(imp))
        return;

    const litres = imp * KG_PER_IMP_GAL;

    litreInput.value = round(litres);

    const kg = litres * density();

    kgInput.value = round(kg);

    usInput.value = round(litres / KG_PER_US_GAL);

}

/*==========================================================
  EVENTS
==========================================================*/

kgInput.addEventListener("input", () => {

    clearFields(kgInput);

    fromKg();

});

litreInput.addEventListener("input", () => {

    clearFields(litreInput);

    fromLitres();

});

usInput.addEventListener("input", () => {

    clearFields(usInput);

    fromUS();

});

impInput.addEventListener("input", () => {

    clearFields(impInput);

    fromIMP();

});

densityInput.addEventListener("input", () => {

    if (kgInput.value !== "")
        fromKg();

    else if (litreInput.value !== "")
        fromLitres();

    else if (usInput.value !== "")
        fromUS();

    else if (impInput.value !== "")
        fromIMP();

});

/*==========================================================
  COPY
==========================================================*/

copyButton.addEventListener("click", async () => {

    const text =
`Fuel Conversion

Density : ${densityInput.value}

Kilograms : ${kgInput.value}

Litres : ${litreInput.value}

US Gallons : ${usInput.value}

Imp Gallons : ${impInput.value}`;

    await navigator.clipboard.writeText(text);

    alert("Copied.");

});

/*==========================================================
  RESET
==========================================================*/

resetButton.addEventListener("click", () => {

    kgInput.value = "";
    litreInput.value = "";
    usInput.value = "";
    impInput.value = "";

    densityInput.value = DEFAULT_DENSITY.toFixed(3);

});

/*==========================================================
  INIT
==========================================================*/

densityInput.value = DEFAULT_DENSITY.toFixed(3);
