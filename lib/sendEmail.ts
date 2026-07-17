import nodemailer from 'nodemailer';

// Configure the email transport using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderConfirmationEmails = async (order: any) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    // 1. Generate the HTML for the Items List
    const itemsHtml = order.items.map((item: any) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eeeeee;">
          <p style="margin: 0; font-weight: bold; color: #0f1b2e;">${item.name}</p>
          <p style="margin: 0; font-size: 12px; color: #666666;">Qty: ${item.quantity}</p>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eeeeee; text-align: right; font-weight: bold; color: #0f1b2e;">
          ₹${(item.price * item.quantity).toLocaleString()}
        </td>
      </tr>
    `).join('');

    // 2. USER EMAIL TEMPLATE (The Invoice)
    const userMailOptions = {
      from: `"Namoh Horeca Solutions" <${process.env.EMAIL_USER}>`,
      to: order.userEmail,
      subject: `Order Confirmation - Namoh Horeca Solutions (#${order.razorpayOrderId || order._id})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0f1b2e; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">Thank you for your order!</h1>
            <p style="color: #c69c4e; margin-top: 10px; font-size: 16px;">We've received your order and are processing it now.</p>
          </div>
          
          <div style="padding: 30px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #333;">Hi <strong>${order.customerDetails.fullName}</strong>,</p>
            <p style="font-size: 15px; color: #555; line-height: 1.5;">Your order <strong>#${order.razorpayOrderId || order._id}</strong> has been confirmed. Below is your official receipt.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 30px; margin-bottom: 30px;">
              <thead>
                <tr style="background-color: #f8f9fa;">
                  <th style="padding: 12px; text-align: left; color: #0f1b2e; font-size: 12px; text-transform: uppercase;">Item Description</th>
                  <th style="padding: 12px; text-align: right; color: #0f1b2e; font-size: 12px; text-transform: uppercase;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td style="padding: 12px; text-align: right; color: #666;">Subtotal:</td>
                  <td style="padding: 12px; text-align: right; font-weight: bold; color: #0f1b2e;">₹${order.pricing.subTotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; text-align: right; color: #666;">GST (18%):</td>
                  <td style="padding: 12px; text-align: right; font-weight: bold; color: #0f1b2e;">₹${order.pricing.tax.toLocaleString()}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 15px 12px; text-align: right; font-weight: bold; color: #0f1b2e; font-size: 18px;">Grand Total:</td>
                  <td style="padding: 15px 12px; text-align: right; font-weight: bold; color: #c69c4e; font-size: 18px;">₹${order.pricing.total.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #0f1b2e; font-size: 14px; text-transform: uppercase;">Shipping Address</h3>
              <p style="margin: 5px 0; color: #555;">${order.customerDetails.streetAddress}</p>
              <p style="margin: 5px 0; color: #555;">${order.customerDetails.city}, ${order.customerDetails.state} - ${order.customerDetails.pinCode}</p>
              <p style="margin: 5px 0; color: #555;">Phone: ${order.customerDetails.phone}</p>
            </div>
          </div>
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
            <p style="margin: 0; font-size: 12px; color: #999;">Namoh Horeca Solutions © 2026. All rights reserved.</p>
          </div>
        </div>
      `
    };

    // 3. ADMIN ALERT EMAIL TEMPLATE
    const adminMailOptions = {
      from: `"Namoh Store Alerts" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `🚨 NEW ORDER RECEIVED: ₹${order.pricing.total} - ${order.customerDetails.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #28a745;">New Order Alert!</h2>
          <p><strong>Customer:</strong> ${order.customerDetails.fullName} (${order.userEmail})</p>
          <p><strong>Phone:</strong> ${order.customerDetails.phone}</p>
          <p><strong>Order ID:</strong> ${order.razorpayOrderId || order._id}</p>
          <p><strong>Total Amount:</strong> ₹${order.pricing.total.toLocaleString()}</p>
          <hr/>
          <h3>Shipping Address:</h3>
          <p>${order.customerDetails.streetAddress}, ${order.customerDetails.city}, ${order.customerDetails.state} - ${order.customerDetails.pinCode}</p>
          <br/>
          <a href="https://yourwebsite.com/admin/dashboard" style="background-color: #0f1b2e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Dashboard</a>
        </div>
      `
    };

    // 4. Send both emails simultaneously
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    console.log("✅ Order confirmation emails sent successfully.");
    return { success: true };
    
  } catch (error) {
    console.error("❌ Error sending emails:", error);
    return { success: false, error };
  }
};