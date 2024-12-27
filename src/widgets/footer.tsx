"use client";

import { useEffect, useState } from "react";

import { Container } from "@/shared/custom/container";

const Footer = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-border/30 py-8 dark:border-border">
      <Container>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {date.toLocaleDateString("ru-RU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
