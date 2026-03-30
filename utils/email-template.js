export const emailTemplate = [
  7, 5, 3, 2, 1,0
].map((days) => ({
  type: `reminder-${days}-days`,
  generateSubject: ({ subscriptionName }) =>
    `Reminder: ${subscriptionName} renews in ${days} day${days > 1 ? "s" : ""}`,
  generateBody: ({ userName, subscriptionName, renewalDate, price }) => `
    <h2>Hello ${userName},</h2>
    <p>Your subscription <strong>${subscriptionName}</strong> will renew in <strong>${days} day${days > 1 ? "s" : ""}</strong>.</p>
    <p>Renewal date: <strong>${renewalDate}</strong></p>
    <p>Plan: <strong>${price}</strong></p>
    <p>If this is no longer needed, cancel before renewal date.</p>
  `
}));