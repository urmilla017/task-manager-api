const calculateTip = (total, tipPercent = 0.25) => {
    const tip = total * tipPercent;
    return total + tip;
};

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8;
};

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32;
};

const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0) {
                return reject('numbers must not be negative');
            }
            resolve(a + b);
        }, 2000);
    });
};

module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
};