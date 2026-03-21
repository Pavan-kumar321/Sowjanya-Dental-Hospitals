import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASS || "your-app-password",
  },
});

export const sendAdminNotification = async (booking: any) => {
  const mailOptions = {
    from: `"Sowjanya Dental" <${process.env.EMAIL_USER}>`,
    to: "admin@sowjanyadental.in",
    subject: `New Booking: ${booking.name} for ${booking.treatment}`,
    html: `
      <h2>New Appointment Request</h2>
      <p><strong>Patient:</strong> ${booking.name}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Treatment:</strong> ${booking.treatment}</p>
      <p><strong>Doctor:</strong> ${booking.doctor}</p>
      <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${booking.timeSlot}</p>
      <p><strong>Payment ID:</strong> ${booking.paymentId}</p>
      <br />
      <a href="${process.env.NEXTAUTH_URL}/admin/dashboard/bookings" style="background: #C9A96E; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Dashboard</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Nodemailer Admin Error:", err);
  }
};

export const sendPatientConfirmation = async (booking: any) => {
  const mailOptions = {
    from: `"Sowjanya Dental Hospitals" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: `Booking ${booking.status === 'confirmed' ? 'Confirmed' : 'Update'}: Sowjanya Dental`,
    html: `
      <h2>Hello ${booking.name.split(" ")[0]},</h2>
      <p>Your appointment for <strong>${booking.treatment}</strong> with <strong>${booking.doctor}</strong> has been <strong>${booking.status}</strong>.</p>
      <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${booking.timeSlot}</p>
      ${booking.status === 'confirmed' ? 
        '<p>We look forward to seeing you at our Himayat Nagar branch!</p>' : 
        `<p><strong>Reason:</strong> ${booking.declineReason || 'Slot not available'}</p><p>Please book another slot or contact us for assistance.</p>`
      }
      <br />
      <p>Regards,<br />Team Sowjanya Dental Hospitals</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Nodemailer Patient Error:", err);
  }
};
