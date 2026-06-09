module.exports = (sequelize, Sequelize) => {
  const PaymentTransaction = sequelize.define("paymentTransaction", {
    paymentMethod: {
      type: Sequelize.ENUM("credit_card", "debit_card", "paypal"),
      allowNull: false,
    },
    paymentStatus: {
      type: Sequelize.ENUM("pending", "completed", "failed", "refunded"),
      allowNull: false,
      defaultValue: "pending",
    },
    amount: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: false,
    },
    paidAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  return PaymentTransaction;
};
