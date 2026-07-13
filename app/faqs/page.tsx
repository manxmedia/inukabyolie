export default function HelpSupportPage() {
  const faqs = [
    {
      category: "Orders",
      questions: [
        {
          q: "How do I place an order?",
          a: "Browse our products, add your desired items to the cart, proceed to checkout, provide your information, select your delivery method, and complete payment.",
        },
        {
          q: "Can I change or cancel my order?",
          a: "If your order has not yet been processed or dispatched, please contact us as soon as possible and we will do our best to assist.",
        },
        {
          q: "Will I receive an order confirmation?",
          a: "Yes. Once your order is successfully placed, you will receive an order confirmation.",
        },
      ],
    },
    {
      category: "Payments",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept the payment methods displayed during checkout, including card payments, EFT, bank transfer, and cash on collection where applicable.",
        },
        {
          q: "Is my payment information secure?",
          a: "Yes. Payments are processed through secure payment providers and we do not store your full card details.",
        },
      ],
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          q: "How long does delivery take?",
          a: "Delivery times vary depending on your location. Most orders are delivered within 2–7 business days after dispatch.",
        },
        {
          q: "Do you deliver throughout South Africa?",
          a: "Yes. We currently deliver nationwide within South Africa.",
        },
        {
          q: "Can I track my order?",
          a: "Where tracking is available, tracking information will be provided once your order has been dispatched.",
        },
      ],
    },
    {
      category: "Self Collection",
      questions: [
        {
          q: "Can I collect my order?",
          a: "Yes. You may select Self Collection during checkout where available.",
        },
        {
          q: "When can I collect my order?",
          a: "We will notify you once your order is ready for collection.",
        },
        {
          q: "What do I need to bring when collecting?",
          a: "Please bring your order confirmation and a valid form of identification if requested.",
        },
      ],
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          q: "How do I return an item?",
          a: "Contact our support team with your order number and reason for the return. We will provide further instructions.",
        },
        {
          q: "What if I receive a damaged or incorrect item?",
          a: "Please contact us within 7 days of receiving your order and include photographs where possible.",
        },
        {
          q: "How long do refunds take?",
          a: "Refund processing times may vary depending on your payment provider and financial institution.",
        },
      ],
    },
    {
      category: "Account & Support",
      questions: [
        {
          q: "How can I contact customer support?",
          a: "You can reach us through our Contact page, email, WhatsApp, or phone during business hours.",
        },
        {
          q: "What are your support hours?",
          a: "Our support team is available during normal business hours, Monday to Friday.",
        },
      ],
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-2">
        Help & Support
      </h1>

      <p className="text-gray-600 mb-10">
        Find answers to our most frequently asked questions.
      </p>

      <div className="space-y-10">
        {faqs.map((section) => (
          <section key={section.category}>
            <h2 className="text-2xl font-semibold mb-4">
              {section.category}
            </h2>

            <div className="space-y-4">
              {section.questions.map((faq, index) => (
                <details
                  key={index}
                  className="border rounded-lg p-4 bg-white shadow-sm"
                >
                  <summary className="cursor-pointer font-medium">
                    {faq.q}
                  </summary>

                  <p className="mt-3 text-gray-600">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="bg-gray-50 border rounded-xl p-8 mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Still Need Help?
          </h2>

          <p className="mb-4">
            If you cannot find the answer you are looking for, please contact us
            and we will gladly assist you.
          </p>

          <div className="space-y-2">
            <p>
              <strong>Email:</strong>{" "}
              support@inukabyolie.co.za
            </p>

            <p>
              <strong>Website:</strong>{" "}
              https://inukabyolie.co.za/contact
            </p>

            <p>
              <strong>Business Hours:</strong>{" "}
              Monday – Friday, 08:00 – 17:00
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}