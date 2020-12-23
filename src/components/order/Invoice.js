import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const Invoice = ({ order }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>

        {/* Date */}
        ~ {new Date().toLocaleString()} ~
      </Text>
      {/* Title of Invoice */}
      <Text style={styles.title}>Order Invoice</Text>
      {/* Our Name */}
      <Text style={styles.author}>Handicraft Nepal</Text>
      {/* Order Details */}
      <Text style={styles.subtitle}>Order Summary</Text>
      
      {/* Title of Table */}
      <Table>
        <TableHeader>
          <TableCell>Title</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Brand</TableCell>
          <TableCell>Color</TableCell>
        </TableHeader>
      </Table>

      {/* Order details */}
      <Table data={order.products}>
        <TableBody>
          <DataTableCell getContent={(x) => x.product.title} />
          <DataTableCell getContent={(x) => `Rs. ${x.product.price}`} />
          <DataTableCell getContent={(x) => x.count} />
          <DataTableCell getContent={(x) => x.product.brand} />
          <DataTableCell getContent={(x) => x.product.color} />
        </TableBody>
      </Table>

      {/* Styling */}
      <Text style={styles.text}>
        <Text>
          Date: {"               "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </Text>
        {"\n"}
        <Text>
          Order Id: {"         "}
          {order.paymentIntent.id}
        </Text>
        {"\n"}
        <Text>
          Order Status: {"  "}
          {order.orderStatus}
        </Text>
        {"\n"}
        <Text>
          Total Paid: {"       "}
          Rs. {order.paymentIntent.amount * 100}
        </Text>
      </Text>

      {/* Footer text */}
      <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default Invoice;
