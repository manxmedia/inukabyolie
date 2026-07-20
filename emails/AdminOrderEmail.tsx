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
  paymentTransactionId: string | null;
  paidAt: string | null;
}

interface Props {
  order: Order;
}

export default function AdminOrderEmail({ order }: Props) {
  return (
    <html>
      <body
        style={{
          margin: 0,
          padding: 40,
          background: "#f5f5f5",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <table width="100%" cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr>
              <td align="center">
                <table
                  width="700"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    background: "#ffffff",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          background: "#8B0000",
                          color: "#ffffff",
                          textAlign: "center",
                          padding: 30,
                        }}
                      >
                        <h1 style={{ margin: 0 }}>
                          🚨 New Paid Order
                        </h1>

                        <p style={{ marginTop: 10 }}>
                          A customer has completed payment.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ padding: 35 }}>
                        <h2 style={{ color: "#D4AF37" }}>
                          Order Summary
                        </h2>

                        <p>
                          <strong>Order:</strong> {order.orderId}
                        </p>

                        <p>
                          <strong>Customer:</strong>{" "}
                          {order.customer.firstName}{" "}
                          {order.customer.lastName}
                        </p>

                        <p>
                          <strong>Email:</strong>{" "}
                          {order.customer.email}
                        </p>

                        <p>
                          <strong>Phone:</strong>{" "}
                          {order.customer.phone}
                        </p>

                        <p>
                          <strong>Payment Channel:</strong>{" "}
                          {order.paymentChannel}
                        </p>

                        <p>
                          <strong>Reference:</strong>{" "}
                          {order.paymentReference}
                        </p>

                        <p>
                          <strong>Paid At:</strong>{" "}
                          {order.paidAt
                            ? new Date(order.paidAt).toLocaleString("en-ZA")
                            : "-"}
                        </p>

                        <p>
                          <strong>Delivery Method:</strong>{" "}
                          {order.deliveryMethod}
                        </p>

                        {order.deliveryMethod === "delivery" &&
                          order.address && (
                            <>
                              <h3>Delivery Address</h3>

                              <p>
                                {order.address.street}
                                <br />
                                {order.address.apartment && (
                                  <>
                                    {order.address.apartment}
                                    <br />
                                  </>
                                )}
                                {order.address.suburb && (
                                  <>
                                    {order.address.suburb}
                                    <br />
                                  </>
                                )}
                                {order.address.city},{" "}
                                {order.address.province}
                                <br />
                                {order.address.postalCode}
                              </p>
                            </>
                          )}

                        <h2 style={{ color: "#D4AF37" }}>
                          Items Purchased
                        </h2>

                        <table
                          width="100%"
                          cellPadding={8}
                          cellSpacing={0}
                          style={{
                            borderCollapse: "collapse",
                          }}
                        >
                          <thead>
                            <tr style={{ background: "#8B0000", color: "#fff" }}>
                              <th align="left">Product</th>
                              <th>Qty</th>
                              <th align="right">Price</th>
                              <th align="right">Total</th>
                            </tr>
                          </thead>

                          <tbody>
                            {order.cart.map((item) => (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td align="center">
                                  {item.quantity}
                                </td>
                                <td align="right">
                                  R{item.price.toFixed(2)}
                                </td>
                                <td align="right">
                                  R{(
                                    item.price *
                                    item.quantity
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <hr />

                        <p>
                          <strong>Subtotal:</strong> R
                          {order.subtotal.toFixed(2)}
                        </p>

                        <p>
                          <strong>Shipping:</strong>{" "}
                          {order.shipping === 0
                            ? "FREE"
                            : `R${order.shipping.toFixed(2)}`}
                        </p>

                        <p
                          style={{
                            fontSize: 22,
                            color: "#D4AF37",
                            fontWeight: "bold",
                          }}
                        >
                          Total Paid: R
                          {order.total.toFixed(2)}
                        </p>
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