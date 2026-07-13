export default function ShippingPolicyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-2">
        Shipping & Delivery Policy
      </h1>

      <p className="text-gray-600 mb-10">
        Last Updated: July 2026
      </p>

      <div className="space-y-8 text-gray-700 leading-8">

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            1. Our Delivery Commitment
          </h2>

          <p>
            At Inuka by Olie, we are committed to delivering your order safely,
            efficiently and as quickly as possible. This Shipping & Delivery
            Policy explains how we process, ship and deliver your orders within
            South Africa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            2. Delivery Areas
          </h2>

          <p>
            We currently deliver throughout South Africa using trusted courier
            partners.
          </p>

          <p className="mt-3">
            Unfortunately, we do not currently offer international shipping.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            3. Order Processing
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              Orders are processed once payment has been successfully received
              and confirmed.
            </li>
            <li>
              Orders are processed during normal business days (Monday to
              Friday), excluding public holidays.
            </li>
            <li>
              Orders placed after business hours, on weekends or public holidays
              will be processed on the next business day.
            </li>
            <li>
              During promotional periods or holidays, processing times may be
              slightly longer.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            4. Delivery Timeframes
          </h2>

          <p>
            Estimated delivery times begin once your order has been dispatched.
          </p>

          <div className="overflow-x-auto mt-4">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">
                    Destination
                  </th>
                  <th className="border px-4 py-2 text-left">
                    Estimated Delivery
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border px-4 py-2">
                    Major Cities
                  </td>
                  <td className="border px-4 py-2">
                    2–5 Business Days
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2">
                    Regional Areas
                  </td>
                  <td className="border px-4 py-2">
                    3–7 Business Days
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2">
                    Remote / Outlying Areas
                  </td>
                  <td className="border px-4 py-2">
                    5–10 Business Days
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            Delivery times are estimates only and may vary depending on courier
            operations, weather conditions or other unforeseen circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Shipping Costs
          </h2>

          <p>
            Shipping charges are calculated during checkout based on your
            delivery location and the size or weight of your order.
          </p>

          <p className="mt-3">
            Any free shipping promotions will be clearly displayed on our
            website where applicable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            6. Self Collection
          </h2>

          <p>
            Customers who choose <strong>Self Collection</strong> during
            checkout will receive a notification once their order is ready for
            collection.
          </p>

          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Please wait for confirmation before collecting.</li>
            <li>
              Please bring your order confirmation or proof of purchase.
            </li>
            <li>
              A valid ID may be requested when collecting your order.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            7. Order Tracking
          </h2>

          <p>
            Where available, tracking information will be provided once your
            order has been dispatched so that you can monitor the progress of
            your delivery.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            8. Failed Deliveries
          </h2>

          <p>
            Please ensure that your delivery address and contact details are
            accurate when placing your order.
          </p>

          <p className="mt-3">
            If delivery cannot be completed because incorrect information was
            supplied or no one is available to receive the parcel, additional
            delivery charges may apply for re-delivery.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            9. Delays
          </h2>

          <p>
            While we make every effort to meet estimated delivery times, delays
            may occur due to factors beyond our control, including:
          </p>

          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Extreme weather conditions.</li>
            <li>Public holidays.</li>
            <li>Courier operational delays.</li>
            <li>Industrial action.</li>
            <li>Natural disasters.</li>
            <li>Incorrect delivery information.</li>
          </ul>

          <p className="mt-3">
            We will keep you informed if significant delays affect your order.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            10. Damaged Parcels
          </h2>

          <p>
            If your parcel arrives damaged, please notify us as soon as possible
            after delivery. Where possible, retain the original packaging and
            take photographs to assist with our investigation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            11. Incorrect Delivery Information
          </h2>

          <p>
            Customers are responsible for providing accurate delivery details.
            We cannot be held responsible for delays or failed deliveries caused
            by incorrect or incomplete information supplied during checkout.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            12. Contact Us
          </h2>

          <p>
            If you have any questions regarding shipping or delivery, please
            contact our customer support team through the Contact page on our
            website. We will gladly assist you.
          </p>
        </section>

      </div>
    </main>
  );
}