import React from "react";

type CustomerContactEmailProps = {
  firstName: string;
};

export default function CustomerContactEmail({
  firstName,
}: CustomerContactEmailProps) {
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
        Thank You for Contacting INUKA by Olie
      </h2>

      <p>Hello {firstName},</p>

      <p>
        Thank you for contacting <strong>INUKA by Olie</strong>.
      </p>

      <p>
        We have successfully received your enquiry and one of our team members
        will get back to you as soon as possible.
      </p>

      <p>
        We appreciate your interest in our products and services and look
        forward to assisting you.
      </p>

      <hr />

      <h3>Need urgent assistance?</h3>

      <p>
        📧 info@inukabyolie.co.za
        <br />
        📞 +27 79 754 1315
      </p>

      <br />

      <p>
        Kind Regards,
      </p>

      <strong>INUKA by Olie Team</strong>

      <br />
      <br />

      <small>
        This is an automated confirmation email. Please do not reply directly
        to this message.
      </small>
    </div>
  );
}