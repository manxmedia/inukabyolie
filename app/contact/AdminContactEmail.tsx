import React from "react";

type AdminContactEmailProps = {
  firstName: string;
  lastName: string;
  senderEmail: string;
  phone?: string;
  subject?: string;
  message: string;
};

export default function AdminContactEmail({
  firstName,
  lastName,
  senderEmail,
  phone,
  subject,
  message,
}: AdminContactEmailProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "650px",
        margin: "0 auto",
        padding: "20px",
        lineHeight: "1.8",
      }}
    >
      <h2 style={{ color: "#0f172a" }}>
        📩 New Contact Form Submission
      </h2>

      <p>
        A new enquiry has been submitted through the INUKA by Olie website.
      </p>

      <hr />

      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{firstName} {lastName}</td>
          </tr>

          <tr>
            <td><strong>Email:</strong></td>
            <td>{senderEmail}</td>
          </tr>

          <tr>
            <td><strong>Phone:</strong></td>
            <td>{phone || "-"}</td>
          </tr>

          <tr>
            <td><strong>Subject:</strong></td>
            <td>{subject || "General Enquiry"}</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h3>Customer Message</h3>

      <div
        style={{
          background: "#f5f5f5",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        {message}
      </div>

      <br />

      <p>
        This email was automatically generated from the INUKA by Olie Contact
        Form.
      </p>
    </div>
  );
}