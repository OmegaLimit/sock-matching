var averageValues;
var expectedValues;
var pairCounts;

const simulations = 10000;

/**
 * This is the main function.
 */
function runSimulation() {
  
  averageValues = [];
  expectedValues = [];
  pairCounts = [];
  
  for(var pairs = 10; pairs < 101; pairs++)
    simulate(pairs);
	
	outputResults();
}

function simulate(pairs) {
  
  console.log("Simulating " + pairs);
  
  var i, picks;
  var socks = [];
  var frequencies = [];
  for (i = 0; i < pairs; i++) frequencies.push(0);
  
  pairCounts.push(pairs);
  
  for (i = 0; i < simulations; i++) {
    socks = resetSocks(pairs);
    socks = shuffleSocks(socks);
	  picks = picksToMatch(socks);
	  frequencies[picks-2]++;
  }
  
  averageValues.push(averageValue(frequencies));
  
  expectedValues.push(expectedValue(pairs));

}

function resetSocks(pairs) {
  var socks = [];
  
  for(var i = 0; i < 2 * pairs; i++) {
    socks.push(Math.ceil((i + 1)/2));
  }
  
  return socks;
}

function shuffleSocks(inArray) {
  
  var j, x, i;
  
  for (i = inArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = inArray[i];
    inArray[i] = inArray[j];
    inArray[j] = x;
  }
  
  return inArray;
}

function picksToMatch(socks) {
  
  var p = 0;
  var i;
  
  var pairs = [];
  for(i = 0; i < socks.length/2; i++) pairs.push(0);
  
  var keepGoing = true;
  i = 0;
  while(keepGoing) {
    p++;
    if (pairs[socks[i] - 1] === 0) pairs[socks[i] - 1]++;
    else keepGoing = false;
    
    i++;
  }
  
  return p;
}

function averageValue(frequencies) {
  var sum = 0;
  
  for(var i = 0; i < frequencies.length; i++)
    sum += (i+2) * frequencies[i];
    
  return sum / simulations;
}

function theoreticalProbability(N, k) {
  var numerator = k-1;
  var denominator = 2*N-k+1;
  var probability = numerator/denominator;
  
  for(var i = 0; i < k-2; i++) {
    numerator = (2*(N-1-i));
    denominator = (2*N - 1 - i);
    probability *= numerator/denominator;
  }
  
  return probability;
}

function expectedValue(N) {
  var sum = 0;
  for(var k = 2; k < N + 2; k++)
   sum += k * theoreticalProbability(N, k);
  return sum;
}

function calculateExpectedValues() {
  
  pairCounts = [];
  expectedValues = [];
  
  for(var i = 0; i < 1000; i++) {
    pairCounts.push(i+1);
    expectedValues.push(expectedValue(i+1));
  }
  
  outputExpectedValues();
}

/**
 * This function outputs the results.
 */

function outputResults() {
  
	var output = "<table><tr><th>Pairs</th><th>Average Number of Picks</th><th>Expected Value</th></tr>";
	
	for(var i = 0; i < pairCounts.length; i++) {
		output += "<tr><td>" + pairCounts[i] + "</td><td>" + averageValues[i] + "</td><td>" + expectedValues[i] + "</td></tr>";
	}
	output += "</table>";
	
	document.getElementById("results").innerHTML = output;
}

function outputExpectedValues() {
  
	var output = "<table><tr><th>Pairs</th><th>Expected Value</th></tr>";
	
	for(var i = 0; i < pairCounts.length; i++) {
		output += "<tr><td>" + pairCounts[i] + "</td><td>" + expectedValues[i] + "</td></tr>";
	}
	output += "</table>";
	
	document.getElementById("results").innerHTML = output;
}
