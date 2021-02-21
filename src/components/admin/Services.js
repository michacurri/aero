import React, { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState(null);

  const loadServices = async function () {
    try {
      const response = await fetch("/api/services", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      } else {
        setServices(json.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  return services;
}
