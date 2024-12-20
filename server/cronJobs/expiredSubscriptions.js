const cron = require("node-cron");
const db = require("../db");
const AppError = require("../utils/AppError");

// check everyday at 11:59 PM, every active subscription if today's date is greater than the end date, make it expired
// also after this, i want to remove from workout_schedule and meals_diet any workout or meal that is for this trainee id and trainer id

const expiredSubscriptionsCronJob = cron.schedule("59 23 * * *", async () => {
  try {
    const query = `UPDATE lifta_schema.subscription SET status = 'Expired' WHERE end_date < current_date AND status = 'Active'`;
    await db.query(query);

    const query2 = `DELETE FROM lifta_schema.workouts_schedule WHERE trainee_id IN (SELECT trainee_id FROM lifta_schema.subscription WHERE status = 'Expired')`;
    await db.query(query2);

    const query3 = `DELETE FROM lifta_schema.meals_diet WHERE trainee_id IN (SELECT trainee_id FROM lifta_schema.subscription WHERE status = 'Expired')`;
    await db.query(query3);
    console.log("Cron job ran successfully");
  } catch (err) {
    console.error(err);
    return next(new AppError("Error in cron job", 500));
  }
});

expiredSubscriptionsCronJob.start();
module.exports = expiredSubscriptionsCronJob;
