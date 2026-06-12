export const sendConfirmationEmail = async (userEmail: string, userName: string, planName: string) => {
  console.log(`[Email Mock] Sending confirmation email to ${userEmail} for the ${planName} plan.`);
  return { success: true };
};

