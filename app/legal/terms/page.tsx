import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Terms of Service</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none text-muted-foreground">
        <p>Last updated: January 1, 2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Compass Console (&quot;the Service&quot;), you
          agree to be bound by these Terms of Service. If you do not agree to
          these terms, please do not use the Service.
        </p>

        <h2>2. Use of Service</h2>
        <p>
          You agree to use the Service only for lawful purposes and in
          accordance with these Terms. You are responsible for maintaining the
          confidentiality of your account credentials.
        </p>

        <h2>3. User Accounts</h2>
        <p>
          You must provide accurate and complete information when creating an
          account. You are responsible for all activities that occur under your
          account.
        </p>

        <h2>4. Data Privacy</h2>
        <p>
          Your use of the Service is also governed by our Privacy Policy, which
          is incorporated into these Terms by reference.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          In no event shall Compass Console be liable for any indirect,
          incidental, special, consequential, or punitive damages arising from
          your use of the Service.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Changes will
          be effective immediately upon posting. Your continued use of the
          Service constitutes acceptance of the modified Terms.
        </p>

        <h2>7. Contact</h2>
        <p>
          If you have questions about these Terms, please contact us at
          support@compassconsole.com.
        </p>
      </CardContent>
    </Card>
  )
}
