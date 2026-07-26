/*==========================================================
 AIR TAHITI TOOLS
 Fuel Engine v1.0
==========================================================*/

"use strict";

const DEFAULT_DENSITY = 0.800;
const LITRES_PER_US_GALLON = 3.785411784;
const LITRES_PER_IMP_GALLON = 4.54609;

const densityInput = document.getElementById("density");
const kgInput = document.getElementById("kg");
const litresInput = document.getElementById("litres");
const usInput = document.getElementById("usGallons");
const impInput = document.getElementById("impGallons");

const copyButton = document.getElementById("copyButton");
const resetButton = document.getElementById("resetButton");

let activeField = null;
let updating = false;

/*==========================================================*/

function format(value) {
    return Number(value).toFixed(3);
}

function getDensity() {

    let d = parseFloat(densityInput.value);

    if (isNaN(d))
        d = DEFAULT_DENSITY;

    d = Math.max(0.700, Math.min(0.850, d));

    densityInput.value = format(d);

    return d;

}

/*==========================================================*/

function updateFromKg() {

    const kg = parseFloat(kgInput.value);

    if (isNaN(kg)) return;

    const density = getDensity();

    const litres = kg / density;

    litresInput.value = format(litres);
    usInput.value = format(litres / LITRES_PER_US_GALLON);
    impInput.value = format(litres / LITRES_PER_IMP_GALLON);

}

function updateFromLitres() {

    const litres = parseFloat(litresInput.value);

    if (isNaN(litres)) return;

    const density = getDensity();

    kgInput.value = format(litres * density);
    usInput.value = format(litres / LITRES_PER_US_GALLON);
    impInput.value = format(litres / LITRES_PER_IMP_GALLON);

}

function updateFromUS() {

    const us = parseFloat(usInput.value);

    if (isNaN(us)) return;

    const litres = us * LITRES_PER_US_GALLON;

    litresInput.value = format(litres);

    const density = getDensity();

    kgInput.value = format(litres * density);
    impInput.value = format(litres / LITRES_PER_IMP_GALLON);

}

function updateFromIMP() {

    const imp = parseFloat(impInput.value);

    if (isNaN(imp)) return;

    const litres = imp * LITRES_PER_IMP_GALLON;

    litresInput.value = format(litres);

    const density = getDensity();

    kgInput.value = format(litres * density);
    usInput.value = format(litres / LITRES_PER_US_GALLON);

}

/*==========================================================*/

function refresh() {

    if (updating)
        return;

    updating = true;

    switch (activeField) {

        case "kg":
            updateFromKg();
            break;

        case "litres":
            updateFromLitres();
            break;

        case "us":
            updateFromUS();
            break;

        case "imp":
            updateFromIMP();
            break;

    }

    updating = false;

}

/*==========================================================*/

kgInput.addEventListener("input", () => {

    activeField = "kg";
    refresh();

});

litresInput.addEventListener("input", () => {

    activeField = "litres";
    refresh();

});

usInput.addEventListener("input", () => {

    activeField = "us";
    refresh();

});

impInput.addEventListener("input", () => {

    activeField = "imp";
    refresh();

});

densityInput.addEventListener("input", refresh);

/*==========================================================*/

resetButton.addEventListener("click", () => {

    kgInput.value = "";
    litresInput.value = "";
    usInput.value = "";
    impInput.value = "";

    densityInput.value = format(DEFAULT_DENSITY);

    activeField = null;

});

/*==========================================================*/

copyButton.addEventListener("click", async () => {

    const text =
`Jet A-1 Fuel

Density : ${densityInput.value}

Kilograms : ${kgInput.value}

Litres : ${litresInput.value}

US Gallons : ${usInput.value}

Imperial Gallons : ${impInput.value}`;

    try {

        await navigator.clipboard.writeText(text);

    } catch {

        console.log(text);

    }

});

/*==========================================================*/

densityInput.value = format(DEFAULT_DENSITY);
