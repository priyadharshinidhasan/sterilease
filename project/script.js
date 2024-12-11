const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})


function updatePredictiveGraph() {
    const fillBar = document.getElementById('fillBar');
    const alertMessage = document.getElementById('alertMessage');
    const fillPercentage = Math.floor(Math.random() * 101); // Random fill value

    fillBar.style.width = fillPercentage + '%';

    if (fillPercentage >= 70) {
        fillBar.style.backgroundColor = 'red';
        alertMessage.style.display = 'block'; // Show alert
    } else if (fillPercentage >= 40) {
        fillBar.style.backgroundColor = 'yellow';
        alertMessage.style.display = 'none'; // Hide alert
    } else {
        fillBar.style.backgroundColor = 'green';
        alertMessage.style.display = 'none'; // Hide alert
    }
}

const ctx = document.getElementById('resourcePieChart').getContext('d');
const dummyPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Empty', 'Full'],
        datasets: [{
            data: [40, 25],
            backgroundColor: ['blue', 'darkblue'],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    }
});

// Update predictive graph every 2 seconds
setInterval(updatePredictiveGraph, 2000);



const chartData = {
week: { 
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 
    flushes: [5, 10, 15, 20, 25, 30, 35], 
    water: [20, 40, 60, 80, 100, 120, 140], 
    power: [2, 4, 6, 8, 10, 12, 14] 
},
month: { 
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], 
    flushes: [100, 150, 200, 250], 
    water: [500, 600, 700, 800], 
    power: [50, 60, 70, 80] 
},
year: { 
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
    flushes: [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300], 
    water: [6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000], 
    power: [600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700] 
}
};

function createChart(chartId, type, dataset) {
return new Chart(document.getElementById(chartId), {
    type,
    data: { 
        labels: chartData.week.labels, 
        datasets: [{ 
            label: dataset.label, 
            data: chartData.week[dataset.data], 
            backgroundColor: dataset.bgColor, 
            borderColor: dataset.borderColor, 
            borderWidth: 1 
        }] 
    },
    options: { 
        responsive: true, 
        scales: { 
            y: { beginAtZero: true } 
        } 
    }
});
}

const flushesBarChart = createChart('flushesBarChart', 'bar', { 
label: 'Flushes', 
data: 'flushes', 
bgColor: 'rgba(54, 162, 235, 0.2)', 
borderColor: 'rgba(54, 162, 235, 1)' 
});
const waterLineChart = createChart('waterLineChart', 'line', { 
label: 'Water Usage', 
data: 'water', 
bgColor: 'rgba(75, 192, 192, 0.2)', 
borderColor: 'rgba(75, 192, 192, 1)' 
});
const powerLineChart = createChart('powerLineChart', 'line', { 
label: 'Power Usage', 
data: 'power', 
bgColor: 'rgba(153, 102, 255, 0.2)', 
borderColor: 'rgba(153, 102, 255, 1)' 
});

const resourcePieChart = new Chart(document.getElementById('resourcePieChart'), {
type: 'pie',
data: {
    labels: ['Empty', 'Full'],
    datasets: [{
        data: [35, 45],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)']
    }]
},
options: { responsive: true }
});

function updateChart(chartId, period) {
const chart = Chart.getChart(chartId);
const datasetIndex = 0;
chart.data.labels = chartData[period].labels;
chart.data.datasets[datasetIndex].data = chartData[period][chart.data.datasets[datasetIndex].label.toLowerCase()];
chart.update();
};