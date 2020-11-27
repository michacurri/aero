import React from "react";

const Customer = ({ customer }) => {
  console.log(customer);
  return <h1>{`Here is the ${customer.firstName} ${customer.lastName}`}</h1>;
};

export default Customer;
