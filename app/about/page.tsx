"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">
          About Us
        </h1>

        <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
          Welcome to <strong>INUKA by Olie</strong>, your trusted online
          destination for quality fragrances, cosmetics, beauty and personal
          care products. We are passionate about helping our customers look,
          feel and smell their very best while delivering exceptional customer
          service and value.
        </p>
      </section>

      {/* Who We Are */}
      <section className="mb-16">
        <div className="bg-white border rounded-2xl p-8 shadow-sm">

          <h2 className="text-3xl font-bold mb-6">
            Who We Are
          </h2>

          <p className="text-gray-700 leading-8 mb-5">
            <strong>INUKA by Olie</strong> is the trading name of
            <strong> Manx Media (Pty) Limited</strong>.
          </p>

          <p className="text-gray-700 leading-8 mb-5">
            We are an independent registered seller of genuine
            <strong> INUKA Products</strong>, offering customers an extensive
            range of luxury fragrances, cosmetics, skincare, body care, hair
            care and lifestyle products.
          </p>

          <p className="text-gray-700 leading-8 mb-5">
            Our official INUKA Registration Upline Member Code is:
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <p className="text-lg text-gray-700">
              Upline Member Code
            </p>

            <p className="text-4xl font-bold text-green-700 mt-2">
              GYS635
            </p>
          </div>

        </div>
      </section>

      {/* Mission */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">

          <div className="border rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Our Mission
            </h3>

            <p className="text-gray-700 leading-8">
              To provide our customers with quality INUKA products,
              outstanding service and an enjoyable shopping experience while
              building lasting relationships based on trust, integrity and
              excellence.
            </p>
          </div>

          <div className="border rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Our Vision
            </h3>

            <p className="text-gray-700 leading-8">
              To become a trusted online destination for premium beauty,
              fragrance and lifestyle products while empowering individuals who
              aspire to build their own successful businesses through the INUKA
              opportunity.
            </p>
          </div>

        </div>
      </section>

      {/* Why Shop */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Shop With Us?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="border rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🌸</div>
            <h3 className="font-semibold mb-2">
              Genuine Products
            </h3>
            <p className="text-gray-600 text-sm">
              Authentic INUKA products sourced through the official network.
            </p>
          </div>

          <div className="border rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="font-semibold mb-2">
              Reliable Delivery
            </h3>
            <p className="text-gray-600 text-sm">
              Secure delivery and collection options across South Africa.
            </p>
          </div>

          <div className="border rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">❤️</div>
            <h3 className="font-semibold mb-2">
              Customer First
            </h3>
            <p className="text-gray-600 text-sm">
              Friendly support and a commitment to customer satisfaction.
            </p>
          </div>

          <div className="border rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="font-semibold mb-2">
              Quality You Can Trust
            </h3>
            <p className="text-gray-600 text-sm">
              Carefully selected products for everyday beauty and wellness.
            </p>
          </div>

        </div>
      </section>

      {/* Business Opportunity */}
      <section className="mb-16">

        <div className="rounded-2xl bg-gradient-to-r from-green-700 to-green-900 text-white p-10">

          <h2 className="text-3xl font-bold mb-5">
            Start Your Own Business with INUKA
          </h2>

          <p className="leading-8 mb-5">
            Have you ever dreamed of owning your own business? INUKA offers an
            exciting opportunity for entrepreneurs who want to earn an income by
            selling premium beauty and fragrance products while building their
            own customer base.
          </p>

          <p className="leading-8 mb-5">
            Whether you're looking for an additional income or planning to build
            a full-time business, INUKA provides various business kit options,
            training and ongoing support to help you get started.
          </p>

          <div className="bg-white text-black rounded-xl p-6 my-8">

            <h3 className="text-xl font-bold mb-3">
              Important
            </h3>

            <p className="leading-8">
              When completing your INUKA registration, please make sure you
              enter our <strong>Upline Member Code</strong>:
            </p>

            <div className="text-center py-5">
              <p className="text-5xl font-bold text-green-700">
                GYS635
              </p>
            </div>

            <p className="text-gray-700">
              Entering this code links your registration to our support network
              so we can assist and guide you on your INUKA business journey. The
              official INUKA registration form includes a field for the Upline
              Member Code.
            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <Link
              href="https://inuka.co.za/start-your-business/"
              target="_blank"
              className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100"
            >
              How to Start Your Business
            </Link>

            <Link
              href="https://inuka.co.za/register/"
              target="_blank"
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300"
            >
              Register with INUKA
            </Link>

          </div>

        </div>

      </section>

      {/* Closing */}
      <section className="text-center">

        <h2 className="text-3xl font-bold mb-5">
          Thank You for Choosing INUKA by Olie
        </h2>

        <p className="text-gray-700 leading-8 max-w-3xl mx-auto">
          Whether you're shopping for yourself, buying a gift for someone
          special, or taking the first step towards building your own business,
          we appreciate the opportunity to serve you. We look forward to being
          part of your journey.
        </p>

      </section>

    </main>
  );
}