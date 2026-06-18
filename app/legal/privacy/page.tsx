import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Privacy Policy</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none text-muted-foreground">
        <p>Last updated: January 1, 2025</p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly, including your email
          address, name, and any data you input into the Service.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide, maintain, and improve the Service</li>
          <li>Send you technical notices and support messages</li>
          <li>Respond to your comments and questions</li>
          <li>Detect and prevent fraud or abuse</li>
        </ul>

        <h2>3. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          alteration, disclosure, or destruction.
        </p>

        <h2>4. Data Sharing</h2>
        <p>
          We do not sell your personal information. We may share your
          information with third-party service providers who assist us in
          operating the Service.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information. You can manage your account settings or contact us for
          assistance.
        </p>

        <h2>6. Cookies</h2>
        <p>
          We use cookies and similar technologies to maintain your session and
          improve your experience. You can control cookies through your browser
          settings.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new policy on this page.
        </p>

        <h2>8. Contact</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at
          privacy@compassconsole.com.
        </p>
      </CardContent>
    </Card>
  )
}
