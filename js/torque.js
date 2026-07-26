/*==========================================================
 AIR TAHITI TOOLS
 Torque & Units Engine
 Version 1.0
==========================================================*/

"use strict";

/*==========================================================
UNITS
==========================================================*/

const units = {

    torque: {
        "Nm": 1,
        "ft-lb": 1.355817948,
        "in-lb": 0.112984829
    },

    length: {
        "mm": 0.001,
        "cm": 0.01,
        "m": 1,
        "in": 0.0254,
        "ft": 0.3048
    },

    mass: {
        "g": 0.001,
        "kg": 1,
        "lb": 0.45359237
    },

    pressure: {
        "Pa": 1,
        "kPa": 1000,
        "MPa": 1000000,
        "bar": 100000,
        "psi": 6894.757293
    }

};

/*==========================================================
DOM
==========================================================*/

const category = document.getElementById("category");
const value = document.getElementById("value");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");

const copyButton = document.getElementById("copyButton");
const resetButton = document.getElementById("resetButton");

/*==========================================================
LOAD UNITS
==========================================================*/

function loadUnits() {

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    const type = category.value;

    if (type === "temperature") {

        ["°C","°F","K"].forEach(unit => {

            fromUnit.add(new Option(unit, unit));
            toUnit.add(new Option(unit, unit));

        });

        toUnit.selectedIndex = 1;

        return;

    }

    Object.keys(units[type]).forEach(unit => {

        fromUnit.add(new Option(unit, unit));
        toUnit.add(new Option(unit, unit));

    });

    if (toUnit.options.length > 1)
        toUnit.selectedIndex = 1;

}

/*==========================================================
TEMPERATURE
==========================================================*/

function convertTemperature(v, from, to) {

    let c;

    switch (from) {

        case "°C":
            c = v;
            break;

        case "°F":
            c = (v - 32) * 5 / 9;
            break;

        case "K":
            c = v - 273.15;
            break;

    }

    switch (to) {

        case "°C":
            return c;

        case "°F":
            return c * 9 / 5 + 32;

        case "K":
            return c + 273.15;

    }

}

/*==========================================================
STANDARD CONVERSION
==========================================================*/

function convert() {

    const input = parseFloat(value.value);

    if (isNaN(input)) {

        result.value = "";

        return;

    }

    const type = category.value;

    let output;

    if (type === "temperature") {

        output = convertTemperature(
            input,
            fromUnit.value,
            toUnit.value
        );

    }

    else {

        const base =
            input * units[type][fromUnit.value];

        output =
            base / units[type][toUnit.value];

    }

    result.value = output.toFixed(3);

}

/*==========================================================
COPY
==========================================================*/

copyButton.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(result.value);

    }

    catch {

        console.log(result.value);

    }

});

/*==========================================================
RESET
==========================================================*/

resetButton.addEventListener("click", () => {

    value.value = "";
    result.value = "";

    category.selectedIndex = 0;

    loadUnits();

});

/*==========================================================
EVENTS
==========================================================*/

category.addEventListener("change", () => {

    loadUnits();
    convert();

});

value.addEventListener("input", convert);

fromUnit.addEventListener("change", convert);

toUnit.addEventListener("change", convert);

/*==========================================================
INIT
==========================================================*/

loadUnits();
