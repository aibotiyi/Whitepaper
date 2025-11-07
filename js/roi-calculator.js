// AIBOT IYI Protocol - ROI Calculator Suite
// Advanced calculators for AI Bot Trading, GPU Mining, and Lending Vaults

class ROICalculator {
    static init() {
        this.setupTabSwitching();
        this.initializeCharts();
        this.setupEventListeners();
    }

    static setupTabSwitching() {
        const tabs = document.querySelectorAll('.tab-button');
        const sections = document.querySelectorAll('.calculator-section');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update active section
                sections.forEach(s => {
                    s.classList.remove('active');
                    if (s.id === targetTab) {
                        s.classList.add('active');
                    }
                });
            });
        });
    }

    static initializeCharts() {
        // Initialize empty charts
        this.aibotChart = null;
        this.gpuChart = null;
        this.vaultChart = null;
        this.comparisonChart = null;
        
        this.createComparisonChart();
    }

    static setupEventListeners() {
        // Real-time calculation on input change
        const inputs = document.querySelectorAll('.calculator-input, .calculator-select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                // Auto-calculate if all required fields are filled
                this.autoCalculate();
            });
        });
    }

    static autoCalculate() {
        // Auto-calculate based on active tab
        const activeTab = document.querySelector('.tab-button.active').dataset.tab;
        
        setTimeout(() => {
            switch(activeTab) {
                case 'aibot-trading':
                    if (this.validateAIBotInputs()) this.calculateAIBot();
                    break;
                case 'gpu-mining':
                    if (this.validateGPUInputs()) this.calculateGPU();
                    break;
                case 'lending-vault':
                    if (this.validateVaultInputs()) this.calculateVault();
                    break;
            }
        }, 100);
    }

    // AI Bot Trading Calculator
    static validateAIBotInputs() {
        const investment = document.getElementById('aibot-investment').value;
        const rate = document.getElementById('aibot-rate').value;
        const period = document.getElementById('aibot-period').value;
        return investment && rate && period && investment >= 100 && rate >= 12 && rate <= 15;
    }

    static calculateAIBot() {
        const investment = parseFloat(document.getElementById('aibot-investment').value);
        const monthlyRate = parseFloat(document.getElementById('aibot-rate').value) / 100;
        const period = parseInt(document.getElementById('aibot-period').value);

        if (!investment || investment < 100 || !monthlyRate || monthlyRate < 0.12 || monthlyRate > 0.15 || !period) {
            this.clearAIBotResults();
            return;
        }

        const monthlyReturn = investment * monthlyRate;
        const totalProfit = monthlyReturn * period;
        const totalReturn = investment + totalProfit;
        const roiPercentage = (totalProfit / investment) * 100;

        // Update results
        document.getElementById('aibot-monthly').textContent = '$' + monthlyReturn.toLocaleString('en-US', {maximumFractionDigits: 0});
        document.getElementById('aibot-total-profit').textContent = '$' + totalProfit.toLocaleString('en-US', {maximumFractionDigits: 0});
        document.getElementById('aibot-total-return').textContent = '$' + totalReturn.toLocaleString('en-US', {maximumFractionDigits: 0});
        document.getElementById('aibot-roi').textContent = roiPercentage.toFixed(1) + '%';

        // Update profit indicator
        this.updateProfitIndicator('aibot-profit-indicator', roiPercentage);

        // Create chart
        this.createAIBotChart(investment, monthlyReturn, period);
    }

    static clearAIBotResults() {
        document.getElementById('aibot-monthly').textContent = '$0';
        document.getElementById('aibot-total-profit').textContent = '$0';
        document.getElementById('aibot-total-return').textContent = '$0';
        document.getElementById('aibot-roi').textContent = '0%';
    }

    static createAIBotChart(investment, monthlyReturn, period) {
        const ctx = document.getElementById('aibotChart').getContext('2d');
        
        if (this.aibotChart) {
            this.aibotChart.destroy();
        }

        const labels = Array.from({length: period + 1}, (_, i) => `Month ${i}`);
        const data = Array.from({length: period + 1}, (_, i) => investment + (monthlyReturn * i));

        this.aibotChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Portfolio Value',
                    data: data,
                    borderColor: '#eab308',
                    backgroundColor: 'rgba(234, 179, 8, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    x: { 
                        ticks: { color: '#9ca3af' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    y: { 
                        ticks: { 
                            color: '#9ca3af',
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                }
            }
        });
    }

    // GPU Mining Calculator
    static validateGPUInputs() {
        const quantity = document.getElementById('gpu-quantity').value;
        const period = document.getElementById('gpu-period').value;
        return quantity && period && quantity > 0;
    }

    static calculateGPU() {
        const machineType = document.getElementById('gpu-machine').value;
        const quantity = parseInt(document.getElementById('gpu-quantity').value);
        const period = parseInt(document.getElementById('gpu-period').value);

        if (!quantity || !period || quantity <= 0) {
            this.clearGPUResults();
            return;
        }

        // Machine specifications
        const machines = {
            nexus: { price: 3200, roi: 0.14, monthlyExpenses: 99, freeMonths: 7 },
            quantum: { price: 18500, roi: 0.18, monthlyExpenses: 199, freeMonths: 5 },
            titan: { price: 48000, roi: 0.22, monthlyExpenses: 399, freeMonths: 4 }
        };

        const machine = machines[machineType];
        const totalInvestment = machine.price * quantity;
        const monthlyRevenue = totalInvestment * machine.roi;
        
        // Calculate operating expenses (free for initial months)
        let totalOperatingCost = 0;
        for (let month = 1; month <= period; month++) {
            if (month > machine.freeMonths) {
                totalOperatingCost += machine.monthlyExpenses * quantity;
            }
        }
        
        const totalRevenue = monthlyRevenue * period;
        const netMonthlyReturn = (totalRevenue - totalOperatingCost) / period;
        const totalProfit = totalRevenue - totalOperatingCost - totalInvestment;
        const breakEvenMonths = Math.ceil(totalInvestment / monthlyRevenue);

        // Update results
        document.getElementById('gpu-monthly').textContent = '$' + netMonthlyReturn.toLocaleString('en-US', {maximumFractionDigits: 0});
        document.getElementById('gpu-investment').textContent = '$' + totalInvestment.toLocaleString('en-US');
        document.getElementById('gpu-profit').textContent = '$' + totalProfit.toLocaleString('en-US', {maximumFractionDigits: 0});
        document.getElementById('gpu-roi').textContent = ((totalProfit / totalInvestment) * 100).toFixed(1) + '%';

        // Update profit indicator
        const roiPercentage = (totalProfit / totalInvestment) * 100;
        this.updateProfitIndicator('gpu-profit-indicator', roiPercentage);

        // Create chart
        this.createGPUChart(totalInvestment, netMonthlyReturn, period);
    }

    static clearGPUResults() {
        document.getElementById('gpu-monthly').textContent = '$0';
        document.getElementById('gpu-investment').textContent = '$0';
        document.getElementById('gpu-profit').textContent = '$0';
        document.getElementById('gpu-roi').textContent = '0%';
    }

    static createGPUChart(investment, monthlyReturn, period) {
        const ctx = document.getElementById('gpuChart').getContext('2d');
        
        if (this.gpuChart) {
            this.gpuChart.destroy();
        }

        const labels = Array.from({length: period + 1}, (_, i) => `Month ${i}`);
        const cumulativeData = Array.from({length: period + 1}, (_, i) => i === 0 ? -investment : -investment + (monthlyReturn * i));

        this.gpuChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Net Profit/Loss',
                    data: cumulativeData,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    x: { 
                        ticks: { color: '#9ca3af' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    y: { 
                        ticks: { 
                            color: '#9ca3af',
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                }
            }
        });
    }

    // Lending Vault Calculator
    static validateVaultInputs() {
        const amount = document.getElementById('vault-amount').value;
        const price = document.getElementById('vault-price').value;
        return amount && price && amount > 0 && price > 0;
    }

    static calculateVault() {
        const tier = document.getElementById('vault-tier').value;
        const amount = parseFloat(document.getElementById('vault-amount').value);
        const price = parseFloat(document.getElementById('vault-price').value);
        const compound = document.getElementById('vault-compound').checked;

        if (!amount || !price || amount <= 0 || price <= 0) {
            this.clearVaultResults();
            return;
        }

        // Vault tier specifications
        const vaults = {
            conservative: { apy: 0.132, months: 3 },
            moderate: { apy: 0.216, months: 6 },
            aggressive: { apy: 0.36, months: 9 },
            premium: { apy: 0.72, months: 12 }
        };

        const vault = vaults[tier];
        const initialValue = amount * price;
        
        let finalAmount;
        if (compound) {
            // Compound monthly
            const monthlyRate = vault.apy / 12;
            finalAmount = amount * Math.pow(1 + monthlyRate, vault.months);
        } else {
            // Simple interest
            const totalReturn = vault.apy * (vault.months / 12);
            finalAmount = amount * (1 + totalReturn);
        }
        
        const finalValue = finalAmount * price;
        const totalProfit = finalValue - initialValue;

        // Update results
        document.getElementById('vault-initial').textContent = '$' + initialValue.toLocaleString('en-US', {maximumFractionDigits: 0});
        document.getElementById('vault-final-tokens').textContent = finalAmount.toLocaleString('en-US', {maximumFractionDigits: 0}) + ' AIB';
        document.getElementById('vault-final-value').textContent = '$' + finalValue.toLocaleString('en-US', {maximumFractionDigits: 0});
        document.getElementById('vault-profit').textContent = '$' + totalProfit.toLocaleString('en-US', {maximumFractionDigits: 0});

        // Update profit indicator
        const roiPercentage = (totalProfit / initialValue) * 100;
        this.updateProfitIndicator('vault-profit-indicator', roiPercentage);

        // Create chart
        this.createVaultChart(amount, finalAmount, vault.months, compound, vault.apy);
    }

    static clearVaultResults() {
        document.getElementById('vault-initial').textContent = '$0';
        document.getElementById('vault-final-tokens').textContent = '0 AIB';
        document.getElementById('vault-final-value').textContent = '$0';
        document.getElementById('vault-profit').textContent = '$0';
    }

    static createVaultChart(initialAmount, finalAmount, months, compound, apy) {
        const ctx = document.getElementById('vaultChart').getContext('2d');
        
        if (this.vaultChart) {
            this.vaultChart.destroy();
        }

        const labels = Array.from({length: months + 1}, (_, i) => `Month ${i}`);
        let data;
        
        if (compound) {
            const monthlyRate = apy / 12;
            data = Array.from({length: months + 1}, (_, i) => initialAmount * Math.pow(1 + monthlyRate, i));
        } else {
            const monthlyGrowth = (finalAmount - initialAmount) / months;
            data = Array.from({length: months + 1}, (_, i) => initialAmount + (monthlyGrowth * i));
        }

        this.vaultChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'AIB Balance',
                    data: data,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    x: { 
                        ticks: { color: '#9ca3af' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    y: { 
                        ticks: { 
                            color: '#9ca3af',
                            callback: function(value) {
                                return value.toLocaleString() + ' AIB';
                            }
                        },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                }
            }
        });
    }

    // Comparison Chart
    static createComparisonChart() {
        const ctx = document.getElementById('comparisonChart').getContext('2d');
        
        // Realistic data for comparison (starting with $10,000 investment)
        const labels = ['0M', '3M', '6M', '12M', '18M', '24M'];
        
        // AI Bot Trading: 13.5% average monthly
        const aibotData = [10000];
        for (let i = 1; i <= 5; i++) {
            aibotData.push(aibotData[i-1] + (10000 * 0.135 * (i * 3)));
        }
        
        // GPU Mining: Nexus A1 example (15% monthly, $3,200 investment, scaled to $10,000)
        const gpuData = [10000];
        const gpuQuantity = Math.floor(10000 / 3200); // 3 machines
        const gpuMonthlyRevenue = (3200 * 3 * 0.15);
        for (let i = 1; i <= 5; i++) {
            const months = i * 3;
            const freeMonths = Math.min(months, 12);
            const paidMonths = Math.max(0, months - 12);
            const totalRevenue = gpuMonthlyRevenue * months;
            const totalExpenses = paidMonths * 99 * 3; // $99 per machine after free period
            gpuData.push(10000 + totalRevenue - totalExpenses);
        }
        
        // Lending Vault: Conservative tier (13.2% APY, 3 months cycles)
        const vaultData = [10000];
        for (let i = 1; i <= 5; i++) {
            const months = i * 3;
            const cycles = Math.floor(months / 3);
            let value = 10000;
            for (let c = 0; c < cycles; c++) {
                value *= (1 + 0.132 * 0.25); // 13.2% APY for 3 months
            }
            vaultData.push(value);
        }
        
        this.comparisonChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'AI Bot Trading (12-15% monthly)',
                        data: aibotData,
                        borderColor: '#eab308',
                        backgroundColor: 'rgba(234, 179, 8, 0.1)',
                        borderWidth: 3,
                        tension: 0.4
                    },
                    {
                        label: 'GPU Mining (15-22% monthly)',
                        data: gpuData,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        tension: 0.4
                    },
                    {
                        label: 'Lending Vault (13.2-72% APY)',
                        data: vaultData,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 3,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { 
                            color: '#ffffff',
                            padding: 20
                        }
                    },
                    title: {
                        display: true,
                        text: 'Investment Growth Comparison ($10,000 Initial)',
                        color: '#ffffff',
                        font: { size: 16 }
                    }
                },
                scales: {
                    x: { 
                        ticks: { color: '#9ca3af' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    y: { 
                        ticks: { 
                            color: '#9ca3af',
                            callback: function(value) {
                                return '$' + (value / 1000) + 'K';
                            }
                        },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                }
            }
        });
    }

    // Utility Methods
    static updateProfitIndicator(elementId, roiPercentage) {
        const indicator = document.getElementById(elementId);
        const icon = indicator.querySelector('i');
        
        if (roiPercentage > 0) {
            icon.className = 'fas fa-trending-up';
            indicator.style.color = '#10b981';
        } else if (roiPercentage < 0) {
            icon.className = 'fas fa-trending-down';
            indicator.style.color = '#ef4444';
        } else {
            icon.className = 'fas fa-equals';
            indicator.style.color = '#6b7280';
        }
    }
}

// Global calculation functions
function calculateAIBot() {
    ROICalculator.calculateAIBot();
}

function calculateGPU() {
    ROICalculator.calculateGPU();
}

function calculateVault() {
    ROICalculator.calculateVault();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ROICalculator.init();
});