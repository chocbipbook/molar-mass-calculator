const atomicWeights = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999,
  F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06,
  Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867, V: 50.942,
  Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
  Ga: 69.723, Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468,
  Sr: 87.62, Y: 88.906, Zr: 91.224, Nb: 92.906, Mo: 95.95, Tc: 98.0, Ru: 101.07,
  Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41, In: 114.82, Sn: 118.71, Sb: 121.76,
  Te: 127.60, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33, La: 138.91, Ce: 140.12,
  Pr: 140.91, Nd: 144.24, Sm: 150.36, Eu: 151.96, Gd: 157.25, Tb: 158.93, Dy: 162.50,
  Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05, Lu: 174.97, Hf: 178.49, Ta: 180.95,
  W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97, Hg: 200.59,
  Tl: 204.38, Pb: 207.2, Bi: 208.98, Th: 232.04, U: 238.03
};

function calculateMolarMass(formula) {
  const stack = [];
  let total = 0;
  let i = 0;

  while (i < formula.length) {
    if (formula[i] === '(') {
      stack.push({ total });
      total = 0;
      i++;
    } else if (formula[i] === ')') {
      i++;
      let num = '';
      while (i < formula.length && /\d/.test(formula[i])) num += formula[i++];
      let multiplier = parseInt(num || '1');
      const last = stack.pop();
      total = last.total + total * multiplier;
    } else if (/[A-Z]/.test(formula[i])) {
      let element = formula[i++];
      if (i < formula.length && /[a-z]/.test(formula[i])) {
        element += formula[i++];
      }

      let qty = '';
      while (i < formula.length && /\d/.test(formula[i])) qty += formula[i++];
      let count = parseInt(qty || '1');

      if (!atomicWeights[element]) {
        alert("Unknown element: " + element);
        return null;
      }

      total += atomicWeights[element] * count;
    } else {
      i++;
    }
  }

  return total;
}

function updateFieldVisibility() {
  const operation = document.getElementById('operation').value;
  document.getElementById('mass').parentElement.style.display = operation === 'gToMol' ? 'block' : 'none';
  document.getElementById('moles').parentElement.style.display = operation === 'molToG' ? 'block' : 'none';
}

document.getElementById('operation').addEventListener('change', updateFieldVisibility);

document.getElementById('calculate').addEventListener('click', () => {
  const formula = document.getElementById('formula').value.trim();
  const operation = document.getElementById('operation').value;
  const results = document.getElementById('results');
  const mass = parseFloat(document.getElementById('mass').value.trim()) || 0;
  const moles = parseFloat(document.getElementById('moles').value.trim()) || 0;

  results.innerHTML = '';
  if (!formula) return results.innerHTML = '⚠️ Enter a valid chemical formula.';

  const molarMass = calculateMolarMass(formula);
  if (molarMass === null) return;

  if (operation === 'molarMass') {
    results.innerHTML = `🧪 Molar Mass of ${formula}: <strong>${molarMass.toFixed(3)} g/mol</strong>`;
  } else if (operation === 'gToMol') {
    results.innerHTML = `🧪 ${mass}g of ${formula} = <strong>${(mass / molarMass).toFixed(4)} mol</strong>`;
  } else if (operation === 'molToG') {
    results.innerHTML = `🧪 ${moles} mol of ${formula} = <strong>${(moles * molarMass).toFixed(4)} g</strong>`;
  }
});

// Initialize field visibility
updateFieldVisibility();
