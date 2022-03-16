// 应税综合所得
//  const taxableAmountInput = document.querySelector(
//   '#taxableAmountInput'
// );

new Vue({
  el: '#app',
  data() {
    return {
      taxRates: [0.03, 0.1, 0.2, 0.25, 0.3, 0.35, 0.45],
      deductedAmounts: [0, 2520, 16920, 31920, 52920, 85920, 181920],
      // taxRateIndex: 0,
      // 月收入
      incomeMonth: 0,
      // 年收入
      incomeYear: 0,
      // 平均每月应纳税
      taxAmountMonth: 0,
      // 年度应纳税
      taxAmountYear: 0,
      // taxRateValue:0,
      // 专项扣除金额
      special: 0,
      // 应税税综合所得
      taxableAmount: 0,
    };
  },
  computed: {
    // 适用的税率
    taxRate() {
      let taxableAmount = this.incomeYear - 60000;
      let index = 0;
      let taxRates = [0.03, 0.1, 0.2, 0.25, 0.3, 0.35, 0.45];
      if (taxableAmount > 0 && taxableAmount <= 36000) {
        index = 0;
      } else if (taxableAmount > 36000 && taxableAmount <= 144000) {
        index = 1;
      } else if (taxableAmount > 144000 && taxableAmount <= 300000) {
        index = 2;
      } else if (taxableAmount > 300000 && taxableAmount <= 420000) {
        index = 3;
      } else if (taxableAmount > 420000 && taxableAmount <= 660000) {
        index = 4;
      } else if (taxableAmount > 660000 && taxableAmount <= 960000) {
        index = 5;
      } else if (taxableAmount > 960000) {
        index = 6;
      }
      return taxRates[index];
    },
    // 适用的速算数
    deductedAmount() {
      let index = 0;
      let taxableAmount = this.incomeYear - 60000;
      let deductedAmounts = [0, 2520, 16920, 31920, 52920, 85920, 181920];
      if (taxableAmount > 0 && taxableAmount <= 36000) {
        index = 0;
      } else if (taxableAmount > 36000 && taxableAmount <= 144000) {
        index = 1;
      } else if (taxableAmount > 144000 && taxableAmount <= 300000) {
        index = 2;
      } else if (taxableAmount > 300000 && taxableAmount <= 420000) {
        index = 3;
      } else if (taxableAmount > 420000 && taxableAmount <= 660000) {
        index = 4;
      } else if (taxableAmount > 660000 && taxableAmount <= 960000) {
        index = 5;
      } else if (taxableAmount > 960000) {
        index = 6;
      }
      return deductedAmounts[index];
    },
  },
  methods: {
    calc() {
      // 税率
      // let taxRate = this.taxRate;
      // // 速算值
      // let deductedAmount = this.deductedAmount;

      // this.taxAmountYear = this.incomeYear * taxRate - deductedAmount;
      // console.log(taxRate);
      // console.log(deductedAmount);
      // console.log(this.taxAmountYear);
      // this.taxAmountMonth = this.taxAmountYear / 12;
      this.taxAmountYear =
        this.taxableAmount * this.taxRate - this.deductedAmount;
      this.taxAmountMonth = this.taxAmountYear / 12;
    },

    incomeMonthChange() {
      this.incomeYear = this.incomeMonth * 12;
      this.taxableAmount = this.incomeYear - 60000 - this.special;
      this.calc();
    },
    incomeYearChange() {
      this.incomeMonth = this.incomeYear / 12;
      this.taxableAmount = this.incomeYear - 60000 - this.special;
      this.calc();
    },
    specialChange() {
      this.taxableAmount = this.incomeYear - 60000 - this.special;
      this.calc();
    },
    taxableAmountChange() {},
    taxAmountYearChange() {},
    taxAmountMonthChange() {},
  },
});

// let taxRates = [0.03, 0.1, 0.2, 0.25, 0.3, 0.35, 0.45];
// let deductedAmounts = [0, 2520, 16920, 31920, 52920, 85920, 181920];
// let taxRateIndex = 0;
// // let taxRateValue = 0;
// // let taxAmount = 0;
// // let taxAmountValue = 0;
// // let tax = 0;
// // let taxValue = 0;
// // let taxAfter = 0;
// // let taxAfterValue = 0;
// let amount = 20000;

// // taxableAmountInput.addEventListener('input', function (e) {
// // const taxableAmount = e.target.value;
// const taxableAmount = amount * 12 - 60000;
// if (taxableAmount > 0) {
//   if (taxableAmount > 0 && taxableAmount <= 36000) {
//     taxRateIndex = 0;
//   } else if (taxableAmount > 36000 && taxableAmount <= 144000) {
//     taxRateIndex = 1;
//   } else if (taxableAmount > 144000 && taxableAmount <= 300000) {
//     taxRateIndex = 2;
//   } else if (taxableAmount > 300000 && taxableAmount <= 420000) {
//     taxRateIndex = 3;
//   } else if (taxableAmount > 420000 && taxableAmount <= 660000) {
//     taxRateIndex = 4;
//   } else if (taxableAmount > 660000 && taxableAmount <= 960000) {
//     taxRateIndex = 5;
//   } else {
//     taxRateIndex = 6;
//   }

//   let taxRate = taxRates[taxRateIndex];
//   let deductedAmount = deductedAmounts[taxRateIndex];
//   console.log(taxRate);

//   const taxAmountYear = taxableAmount * taxRate - deductedAmount;

//   const taxAmountMonth = taxAmountYear / 12;
// }
