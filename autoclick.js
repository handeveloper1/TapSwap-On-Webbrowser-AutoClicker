// ==UserScript==
// @name        TabSwap AutoClicker
// @namespace   Violentmonkey Scripts
// @match       *://app.tapswap.club/*
// @grant       none
// @version     1.0
// @author      -
// @description 20.06.2024 01:38:38
// ==/UserScript==

(function () {
    const m1 = 30, m2 = 50, p1 = 100000, p2 = 300000, eT = 25, cI = 1500, mCA = 3;
    let cA = 0;

    const s = {
        s: 'background: #28a745; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        st: 'background: #8640ff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        e: 'background: #dc3545; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        i: 'background: #007bff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
    };

    const lp = '%c[TapSwapBot] ';
    const oL = console.log;
    console.log = function () {
        if (typeof arguments[0] === 'string' && arguments[0].includes('[TapSwapBot]')) {
            oL.apply(console, arguments);
        }
    };

    console.error = console.warn = console.info = console.debug = () => { };
    console.clear();
    console.log(`${lp}Starting`, s.st);


    function tE(el, eT, p) {
        const e = new MouseEvent(eT, p);
        el.dispatchEvent(e);
    }

    function gRCC(r) {
        let x, y;
        do {
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
        } while (x * x + y * y > 1);
        return { x: Math.round(x * r), y: Math.round(y * r) };
    }

    function gCE() {
        const eE = document.querySelector("div._value_tzq8x_13 h4._h4_1w1my_1");
        if (eE) {
            return parseInt(eE.textContent);
        }
        return null;
    }

    function cC() {
        const b = document.querySelector("#ex1-layer img");
        if (b) {
            console.log(`${lp}Coin found. The click is executed.`, s.s);
            cB();
        } else {
            cA++;
            if (cA >= mCA) {
                console.log(`${lp}Coin not found after 3 attempts. Reloading the page.`, s.e);
                location.reload();
            } else {
                console.log(`${lp}Coin not found. Attempt ${cA}/${mCA}. Check again after 3 seconds.`, s.e);
                setTimeout(cC, cI);
            }
        }
    }

    function cB() {
        const cE = gCE();
        if (cE !== null && cE < eT) {
            const pT = p1 + Math.random() * (p2 - p1);
            console.log(`${lp}The energy is lower ${eT}. Pause for ${Math.round(pT / 1000)} seconds.`, s.i);
            setTimeout(cB, pT);
            return;
        }

        const b = document.querySelector("#ex1-layer img");
        if (b) {
            const r = b.getBoundingClientRect();
            const rad = Math.min(r.width, r.height) / 2;
            const { x, y } = gRCC(rad);

            const cX = r.left + rad + x;
            const cY = r.top + rad + y;

            const cP = {
                bubbles: true, cancelable: true, view: window,
                clientX: cX, clientY: cY, screenX: cX, screenY: cY,
                pageX: cX, pageY: cY, pointerId: 1, pointerType: "touch",
                isPrimary: true, width: 1, height: 1, pressure: 0.5, button: 0, buttons: 1
            };

            tE(b, 'pointerdown', cP);
            tE(b, 'mousedown', cP);
            tE(b, 'pointerup', { ...cP, pressure: 0 });
            tE(b, 'mouseup', cP);
            tE(b, 'click', cP);

            const d = m1 + Math.random() * (m2 - m1);
            setTimeout(cC, d);
        } else {
            console.log(`${lp}Coin not found!`, s.e);
        }
    }

    cC();
})();
