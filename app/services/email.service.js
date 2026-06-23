const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendSeatConfirmationEmail({ to, booking, tickets }) {
  const rows = tickets.map((ticket) => {
    const seat = ticket.seat ? ticket.seat.seatNumber : "N/A";
    const showtime = ticket.showtime
      ? new Date(ticket.showtime.startDateTime).toLocaleString()
      : "N/A";
    const show = ticket.showtime && ticket.showtime.show
      ? ticket.showtime.show.name
      : "Planetarium Show";

    return `
      <tr>
        <td>${show}</td>
        <td>${showtime}</td>
        <td>${seat}</td>
        <td>${ticket.ticketType}</td>
        <td>$${ticket.ticketPrice}</td>
        <td>${ticket.qrCode}</td>
      </tr>
    `;
  }).join("");

  return transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject: `Planetarium Ticket Confirmation - Booking #${booking.id}`,
    html: `
      <h2>Planetarium Ticket Confirmation</h2>
      <p>Thank you for your purchase.</p>
      <p><strong>Booking ID:</strong> ${booking.id}</p>
      <p><strong>Total Price:</strong> $${booking.totalPrice}</p>

      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>Show</th>
            <th>Showtime</th>
            <th>Seat</th>
            <th>Ticket Type</th>
            <th>Price</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `,
  });
}

module.exports = {
  sendSeatConfirmationEmail,
};