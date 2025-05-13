const atomicWeights = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999,
  F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06,
  Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867, V: 50.942,
  Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
  Ga: 69.723, Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468,
  Sr: 87.62, Y: 88.906, Zr: 91.224, Nb: 92.906, Mo: 95.95, Tc: 98.0, Ru: 101.07,
  Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41, In: 114.82, Sn: 118.71, Sb: 121.76,
  Te: 127.60, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33, La: 138.91, Ce: 140.12,
  Pr: 140.91, Nd: 144.24, Pm: 145.0, Sm: 150.36, Eu: 151.96, Gd: 157.25, Tb: 158.93,
  Dy: 162.50, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05, Lu: 174.97, Hf: 178.49,
  Ta: 180.95, W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97,
  Hg: 200.59, Tl: 204.38, Pb: 207.2, Bi: 208.98, Th: 232.04, U: 238.03
};

function calculateMolarMass(formula) {
  const stack = [];
  let element = '', count = '', total = 0;
  let i = 0;

  while (i < formula.length) {
    let char = formula[i];

    if (char === '(') {
      stack.push({ total, multiplier: 1 });
      total = 0;
      i++;
    } else if (char === ')') {
      i++;
      let num = '';
      while (i < formula.length && /\d/.test(formula[i])) num += formula[i++];
      num = parseInt(num || '1');
      const prev = stack.pop();
      total = prev.total + total * num;
    } else if (/[A-Z]/.test(char)) {
      element = char;
      i++;
      if (i < formula.length && /[a-z]/.test(formula[i])) {
        element += formula[i++];
      }
      count = '';
      while (i < formula.length && /\d/.test(formula[i])) count += formula[i++];
      count = parseInt(count || '1');
      if (!atomicWeights[element]) {
        alert(`Unknown element: ${element}`);
        return null;
      }
      total += atomicWeights[element] * count;
    } else {
      i++;
    }
  }

  return total;
}

document.getElementById('calculate').addEventListener('click', () => {
  const formula = document.getElementById('formula').value.trim();
  const mass = parseFloat(document.getElementById('mass').value.trim()) || null;
  const moles = parseFloat(document.getElementById('moles').value.trim()) || null;
  const resultBox = document.getElementById('results');
  resultBox.innerHTML = '';

  if (!formula) {
    resultBox.innerHTML = '<p>Please enter a chemical formula.</p>';
    return;
  }

  const molarMass = calculateMolarMass(formula);
  if (molarMass === null) return;

  let result = `<strong>Molar Mass of ${formula}</strong>: ${molarMass.toFixed(3)} g/mol<br/>`;

  if (mass) {
    result += `<strong>Moles in ${mass} g:</strong> ${(mass / molarMass).toFixed(4)} mol<br/>`;
  }

  if (moles) {
    result += `<strong>Grams in ${moles} mol:</strong> ${(molarMass * moles).toFixed(4)} g<br/>`;
  }

  resultBox.innerHTML = result;
});const atomicWeights = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999,
  F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06,
  Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867, V: 50.942,
  Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
  Ga: 69.723, Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468,
  Sr: 87.62, Y: 88.906, Zr: 91.224, Nb: 92.906, Mo: 95.95, Tc: 98.0, Ru: 101.07,
  Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41, In: 114.82, Sn: 118.71, Sb: 121.76,
  Te: 127.60, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33, La: 138.91, Ce: 140.12,
  Pr: 140.91, Nd: 144.24, Pm: 145.0, Sm: 150.36, Eu: 151.96, Gd: 157.25, Tb: 158.93,
  Dy: 162.50, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05, Lu: 174.97, Hf: 178.49,
  Ta: 180.95, W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97,
  Hg: 200.59, Tl: 204.38, Pb: 207.2, Bi: 208.98, Th: 232.04, U: 238.03
};

function calculateMolarMass(formula) {
  const stack = [];
  let element = '', count = '', total = 0;
  let i = 0;

  while (i < formula.length) {
    let char = formula[i];

    if (char === '(') {
      stack.push({ total, multiplier: 1 });
      total = 0;
      i++;
    } else if (char === ')') {
      i++;
      let num = '';
      while (i < formula.length && /\d/.test(formula[i])) num += formula[i++];
      num = parseInt(num || '1');
      const prev = stack.pop();
      total = prev.total + total * num;
    } else if (/[A-Z]/.test(char)) {
      element = char;
      i++;
      if (i < formula.length && /[a-z]/.test(formula[i])) {
        element += formula[i++];
      }
      count = '';
      while (i < formula.length && /\d/.test(formula[i])) count += formula[i++];
      count = parseInt(count || '1');
      if (!atomicWeights[element]) {
        alert(`Unknown element: ${element}`);
        return null;
      }
      total += atomicWeights[element] * count;
    } else {
      i++;
    }
  }

  return total;
}

document.getElementById('calculate').addEventListener('click', () => {
  const formula = document.getElementById('formula').value.trim();
  const mass = parseFloat(document.getElementById('mass').value.trim()) || null;
  const moles = parseFloat(document.getElementById('moles').value.trim()) || null;
  const resultBox = document.getElementById('results');
  resultBox.innerHTML = '';

  if (!formula) {
    resultBox.innerHTML = '<p>Please enter a chemical formula.</p>';
    return;
  }

  const molarMass = calculateMolarMass(formula);
  if (molarMass === null) return;

  let result = `<strong>Molar Mass of ${formula}</strong>: ${molarMass.toFixed(3)} g/mol<br/>`;

  if (mass) {
    result += `<strong>Moles in ${mass} g:</strong> ${(mass / molarMass).toFixed(4)} mol<br/>`;
  }

  if (moles) {
    result += `<strong>Grams in ${moles} mol:</strong> ${(molarMass * moles).toFixed(4)} g<br/>`;
  }

  resultBox.innerHTML = result;
});
