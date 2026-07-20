import React from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Address {
  street: string;
  apartment?: string;
  suburb?: string;
  city: string;
  province: string;
  postalCode: string;
}

interface Order {
  orderId: string;
  customer: Customer;
  deliveryMethod: "delivery" | "pickup";
  address: Address | null;
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentChannel: string | null;
  paymentReference: string | null;
  paidAt: string | null;
}

interface Props {
  order: Order;
}

export default function CustomerOrderEmail({
  order,
}: Props) {

  const logo =
    "https://inukabyolie.co.za/images/logo.png";

  return (

    <html>

      <body
        style={{
          margin: 0,
          padding: 40,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >

        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
        >

          <tbody>

            <tr>

              <td align="center">

                <table
                  width="700"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >

                  <tbody>
                    <tr>
  <td
    align="center"
    style={{
      backgroundColor: "#D4AF37",
      padding: "40px 30px",
    }}
  >
    <img
      src={logo}
      alt="INUKA by Olie"
      width="180"
      style={{
        display: "block",
        marginBottom: 25,
      }}
    />

    <h1
      style={{
        color: "#ffffff",
        margin: 0,
        fontSize: 34,
        fontWeight: 700,
      }}
    >
      Thank You For Your Order!
    </h1>

    <p
      style={{
        color: "#ffffff",
        marginTop: 15,
        fontSize: 18,
        lineHeight: 1.6,
      }}
    >
      Your payment has been received successfully.
    </p>

    <div
      style={{
        display: "inline-block",
        backgroundColor: "#22C55E",
        color: "#ffffff",
        padding: "12px 24px",
        borderRadius: 50,
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 16,
      }}
    >
      ✔ PAYMENT SUCCESSFUL
    </div>
  </td>
</tr>

<tr>
  <td
    style={{
      padding: "40px",
    }}
  >
    <h2
      style={{
        color: "#D4AF37",
        marginTop: 0,
      }}
    >
      Hello {order.customer.firstName},
    </h2>

    <p
      style={{
        color: "#444",
        fontSize: 16,
        lineHeight: 1.8,
      }}
    >
      Thank you for shopping with
      <strong> INUKA by Olie</strong>.
      <br />
      <br />
      We have successfully received your payment and your
      order is now being prepared.
    </p>
        <table
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: 8,
        marginTop: 30,
        marginBottom: 30,
      }}
    >
      <tbody>

        <tr
          style={{
            backgroundColor: "#F8F5FC",
          }}
        >
          <td
            colSpan={2}
            style={{
              padding: "18px 24px",
              fontSize: 20,
              fontWeight: "bold",
              color: "#D4AF37",
            }}
          >
            Order Details
          </td>
        </tr>

        <tr>
          <td
            style={{
              padding: "16px 24px",
              fontWeight: "bold",
              width: "35%",
            }}
          >
            Order Number
          </td>

          <td
            style={{
              padding: "16px 24px",
            }}
          >
            {order.orderId}
          </td>
        </tr>

        <tr
          style={{
            backgroundColor: "#FAFAFA",
          }}
        >
          <td
            style={{
              padding: "16px 24px",
              fontWeight: "bold",
            }}
          >
            Payment Status
          </td>

          <td
            style={{
              padding: "16px 24px",
              color: "#16A34A",
              fontWeight: "bold",
            }}
          >
            PAID
          </td>
        </tr>

        <tr>
          <td
            style={{
              padding: "16px 24px",
              fontWeight: "bold",
            }}
          >
            Payment Method
          </td>

          <td
            style={{
              padding: "16px 24px",
            }}
          >
            {order.paymentChannel ?? "Card"}
          </td>
        </tr>

        <tr
          style={{
            backgroundColor: "#FAFAFA",
          }}
        >
          <td
            style={{
              padding: "16px 24px",
              fontWeight: "bold",
            }}
          >
            Payment Reference
          </td>

          <td
            style={{
              padding: "16px 24px",
              wordBreak: "break-all",
            }}
          >
            {order.paymentReference}
          </td>
        </tr>

        <tr>
          <td
            style={{
              padding: "16px 24px",
              fontWeight: "bold",
            }}
          >
            Paid On
          </td>

          <td
            style={{
              padding: "16px 24px",
            }}
          >
            {order.paidAt
              ? new Date(order.paidAt).toLocaleString("en-ZA")
              : "-"}
          </td>
        </tr>

      </tbody>
    </table>

        <h2
      style={{
        color: "#D4AF37",
        marginBottom: 20,
      }}
    >
      Items Ordered
    </h2>

    <table
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      style={{
        borderCollapse: "collapse",
        border: "1px solid #E5E7EB",
        marginBottom: 30,
      }}
    >

      <thead>

        <tr
          style={{
            backgroundColor: "#D4AF37",
            color: "#ffffff",
          }}
        >
          <th
            align="left"
            style={{
              padding: 16,
            }}
          >
            Product
          </th>

          <th
            align="center"
            style={{
              padding: 16,
            }}
          >
            Qty
          </th>

          <th
            align="right"
            style={{
              padding: 16,
            }}
          >
            Price
          </th>

          <th
            align="right"
            style={{
              padding: 16,
            }}
          >
            Total
          </th>

        </tr>

      </thead>

      <tbody>

        {order.cart.map((item) => (

          <tr
            key={item.id}
            style={{
              borderBottom: "1px solid #EEEEEE",
            }}
          >

            <td
              style={{
                padding: 16,
              }}
            >
              {item.name}
            </td>

            <td
              align="center"
              style={{
                padding: 16,
              }}
            >
              {item.quantity}
            </td>

            <td
              align="right"
              style={{
                padding: 16,
              }}
            >
              R{item.price.toFixed(2)}
            </td>

            <td
              align="right"
              style={{
                padding: 16,
                fontWeight: "bold",
              }}
            >
              R{(item.price * item.quantity).toFixed(2)}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

    <table
      align="right"
      width="320"
      cellPadding={0}
      cellSpacing={0}
      style={{
        marginBottom: 40,
      }}
    >

      <tbody>

        <tr>

          <td
            style={{
              padding: 10,
            }}
          >
            Subtotal
          </td>

          <td
            align="right"
            style={{
              padding: 10,
            }}
          >
            R{order.subtotal.toFixed(2)}
          </td>

        </tr>

        <tr>

          <td
            style={{
              padding: 10,
            }}
          >
            Shipping
          </td>

          <td
            align="right"
            style={{
              padding: 10,
            }}
          >
            {order.shipping === 0
              ? "FREE"
              : `R${order.shipping.toFixed(2)}`}
          </td>

        </tr>

        <tr>

          <td
            style={{
              padding: 14,
              fontWeight: "bold",
              fontSize: 18,
              borderTop: "2px solid #D4AF37",
            }}
          >
            Total Paid
          </td>

          <td
            align="right"
            style={{
              padding: 14,
              fontWeight: "bold",
              fontSize: 20,
              color: "#D4AF37",
              borderTop: "2px solid #D4AF37",
            }}
          >
            R{order.total.toFixed(2)}
          </td>

        </tr>

      </tbody>

    </table>

    <div style={{ clear: "both" }} />
        <div
      style={{
        clear: "both",
        marginTop: 30,
      }}
    />

    <table
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: 8,
        marginBottom: 35,
      }}
    >
      <tbody>

        <tr
          style={{
            backgroundColor: "#F8F5FC",
          }}
        >
          <td
            style={{
              padding: "18px 24px",
              fontSize: 20,
              fontWeight: "bold",
              color: "#D4AF37",
            }}
          >
            Delivery Information
          </td>
        </tr>

        <tr>
          <td
            style={{
              padding: 24,
              color: "#444",
              lineHeight: 1.8,
            }}
          >

            <strong>Delivery Method:</strong>{" "}
            {order.deliveryMethod === "delivery"
              ? "Delivery"
              : "Self Pickup"}

            <br />
            <br />

            {order.deliveryMethod === "delivery" &&
              order.address && (
                <>
                  <strong>Delivery Address</strong>

                  <br />

                  {order.address.street}

                  <br />

                  {order.address.apartment &&
                    <>
                      {order.address.apartment}
                      <br />
                    </>
                  }

                  {order.address.suburb &&
                    <>
                      {order.address.suburb}
                      <br />
                    </>
                  }

                  {order.address.city},{" "}
                  {order.address.province}

                  <br />

                  {order.address.postalCode}
                </>
              )}

            {order.deliveryMethod === "pickup" && (
              <>
                Your order will be prepared for collection.

                <br />

                We'll notify you as soon as it is ready.
              </>
            )}

          </td>
        </tr>

      </tbody>
    </table>

    <hr
      style={{
        border: 0,
        borderTop: "1px solid #E5E7EB",
        margin: "40px 0",
      }}
    />

    <h3
      style={{
        color: "#D4AF37",
      }}
    >
      Need Assistance?
    </h3>

    <p
      style={{
        color: "#555",
        lineHeight: 1.8,
      }}
    >
      📧 support@inukabyolie.co.za

      <br />

      📧 orders@inukabyolie.co.za

      <br />

      🌐 https://inukabyolie.co.za
    </p>

    <p
      style={{
        marginTop: 40,
        color: "#666",
        lineHeight: 1.8,
      }}
    >
      Thank you for choosing
      <strong> INUKA by Olie</strong>.

      <br />

      We appreciate your support and look forward to serving you again.
    </p>

    <div
      style={{
        backgroundColor: "#D4AF37",
        color: "#ffffff",
        textAlign: "center",
        padding: "20px",
        marginTop: 40,
        fontSize: 14,
      }}
    >
      © {new Date().getFullYear()} INUKA by Olie

      <br />

      Wellness • Beauty • Lifestyle
    </div>

    </td>

            </tr>

                  </tbody>

                </table>

              </td>

            </tr>

          </tbody>

        </table>

      </body>

    </html>

  );

}