import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  const faqData = [
    {
      question: "How can I place an order?",
      answer:
        "To place an order, simply browse our catalog, select the items you want, and proceed to checkout. Follow the on-screen instructions to complete your purchase.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept a variety of payment methods, including credit/debit cards and PayPal. You can view the available payment options during the checkout process.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order has been shipped, you will receive a tracking number via email. You can use this tracking number to monitor the status and location of your package.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Our return policy allows you to return items within 30 days of purchase.",
    },
    {
      question: "Do you ship internationally?",
      answer: "NO, we don't offer international shipping.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "Our customer support team is available via email at support@onlinemall.com. Please allow up to 24 hours for a response. For urgent matters, you can also reach us by phone at +1 (123) 456-7890.",
    },
    {
      question: "Can I modify or cancel my order after placing it?",
      answer:
        "Once an order is placed, modifications or cancellations may not be possible. Please review your order carefully before completing the purchase. If you need assistance, contact our customer support team.",
    },
    {
      question: "Do you offer gift cards?",
      answer: "At this time , we don't offer gift cards.",
    },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions (FAQ)
      </Typography>

      {faqData.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQ;
