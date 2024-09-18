const stripe = require("../config/stripe");

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, projectId, tier } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
      metadata: { projectId, tier },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
