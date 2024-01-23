const ethers = require('ethers');

let currentPrice = ethers.parseUnits('2000', 18); // Starting price in ether
const minPrice = ethers.parseUnits('1000', 18);
const maxPrice = ethers.parseUnits('10000', 18);
let storedValue = currentPrice;

console.log(`Current Price: ${currentPrice}`);

function fluctuatePrice() {
    let maxChangePercent = 0.0025; // Standard maximum change is .25%

    let random = Math.random();
    if (random < 0.1) { // 10% chance for larger change
        maxChangePercent = 0.1;
        // console.log('10% Change!');
    }

    if (random > 0.2 && random < 0.4) { // .5% change
        maxChangePercent = 0.005;
        // console.log('0.5% Change!');
    }

    if (random < 0.001) { // 40% Flash crash
        maxChangePercent = 0.4;
        console.log('FLASH CRASH!');
    }

    // Calculate the change factor (between -maxChangePercent and +maxChangePercent)
    const changeFactor = (Math.random() - 0.5) * 2 * maxChangePercent;
    // console.log(`Change factor: ${changeFactor}`);

    // Calculate the change amount in ether (as a string)
    const changeAmountInEther = (parseFloat(ethers.formatUnits(currentPrice, 18)) * changeFactor).toString();

    // Convert the change amount to a BigNumber
    const changeAmount = ethers.parseUnits(changeAmountInEther, 18);

    // Apply the change
    currentPrice = currentPrice + (changeAmount);

    // Ensure current price is within min and max limits
    if (currentPrice < (minPrice)) {
        currentPrice = minPrice;
    } else if (currentPrice > (maxPrice)) {
        currentPrice = maxPrice;
    }

    // Check if deviation from stored value is more than 1%
    const scaleFactor = ethers.parseUnits('1000', 18)
    const deviation = ((currentPrice - storedValue) * scaleFactor) / storedValue;
    //console.log(`Deviation: ${deviation}`);

    const onePercentThreshold = 10e18; // 1% deviation threshold
    if (deviation >= onePercentThreshold || deviation <= -onePercentThreshold) {
        storedValue = currentPrice;
        console.log(`*******Deviation Push On Chain: ${storedValue} USD********`);
    }
}

function startSimulation(interval = 1000) {
    setInterval(() => {
        fluctuatePrice();
        console.log(`Time: ${new Date().toLocaleTimeString()}, ETH Price: ${currentPrice} USD`);
    }, interval);
}

// Start the simulation
startSimulation();
