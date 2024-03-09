import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const PrivacyPolicy = () => {
  const paperStyle = {
    padding: "16px",
    marginTop: "16px",
  };

  return (
    <Container maxWidth="md">
      <Paper style={paperStyle}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography paragraph>
          Welcome to Online Mall's Privacy Policy. Your privacy is important to
          us.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Information We Collect
        </Typography>

        <Typography paragraph>
          We collect information from you when you register on our site, place
          an order, subscribe to our newsletter, respond to a survey, or fill
          out a form.
        </Typography>

        <Typography variant="h5" gutterBottom>
          How We Use Your Information
        </Typography>

        <Typography paragraph>
          We may use the information we collect from you to personalize your
          experience, improve our website, process transactions, send periodic
          emails, and provide customer service.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Information Protection
        </Typography>

        <Typography paragraph>
          We implement a variety of security measures to maintain the safety of
          your personal information when you place an order or enter, submit, or
          access your personal information.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Cookies
        </Typography>

        <Typography paragraph>
          We use cookies to understand and save your preferences for future
          visits and compile aggregate data about site traffic and site
          interaction so that we can offer better site experiences and tools in
          the future.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Disclosure to Third Parties
        </Typography>

        <Typography paragraph>
          We do not sell, trade, or otherwise transfer to outside parties your
          personally identifiable information. This does not include trusted
          third parties who assist us in operating our website, conducting our
          business, or servicing you, as long as those parties agree to keep
          this information confidential.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Changes to Our Privacy Policy
        </Typography>

        <Typography paragraph>
          If we decide to change our privacy policy, we will post those changes
          on this page.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Contacting Us
        </Typography>

        <Typography paragraph>
          If there are any questions regarding this privacy policy, you may
          contact us using the information below.
        </Typography>

        <Typography>
          Online Mall
          <br />
          123 Main Street
          <br />
          Tel Aviv, Israel
          <br />
          hackerufullstack@gmail.com
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
