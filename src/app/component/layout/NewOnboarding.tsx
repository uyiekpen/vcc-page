"use client";

import { useState } from "react";
import { Button } from "@/app/component/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/component/ui/card";
import { Input } from "@/app/component/ui/input";
import { Label } from "@/app/component/ui/label";
import { Separator } from "@/app/component/ui/separator";
import { Checkbox } from "@/app/component/ui/checkbox";
import {
  ChevronRight,
  ChevronLeft,
  Mail,
  CheckCircle,
  Settings,
  Send,
  AlertCircle,
} from "lucide-react";

export default function WorkspaceSetupForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [workspaceData, setWorkspaceData] = useState({
    name: "",
    email: "",
  });
  const [documentation, setDocumentation] = useState({
    emailInstructions: false,
    dnsConfiguration: true,
    receivingSending: false,
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Create your workspace</h2>
              <p className="text-muted-foreground">
                Set up your workspace to receive and respond to customer
                messages.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="workspace-name">Workspace name</Label>
                <Input
                  id="workspace-name"
                  value={workspaceData.name}
                  onChange={(e) =>
                    setWorkspaceData({ ...workspaceData, name: e.target.value })
                  }
                  placeholder="e.g. Acme Support"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  This will be visible to your customers in communications
                </p>
              </div>

              <div>
                <Label htmlFor="support-email">
                  Your support email address
                </Label>
                <Input
                  id="support-email"
                  type="email"
                  value={workspaceData.email}
                  onChange={(e) =>
                    setWorkspaceData({
                      ...workspaceData,
                      email: e.target.value,
                    })
                  }
                  placeholder="e.g. support@acme.com"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Emails sent out will show the sender's name paired with your
                  workspace name, for example: Jane at JDoe Design
                  (help@jdoe-design.com)
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <h2 className="text-xl font-bold">Verification & Setting</h2>
              </div>
              <p className="text-muted-foreground">
                Verify your support email address to confirm that it is properly
                linked to your domain.
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <Settings className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Verification Required</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      We've sent a verification email to {workspaceData.email}.
                      Please click the link in that email to verify your
                      address.
                    </p>
                    <Button variant="link" size="sm" className="pl-0 mt-2">
                      Resend verification email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <h3 className="font-medium">Documentation</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email-instructions"
                    checked={documentation.emailInstructions}
                    onCheckedChange={(checked) =>
                      setDocumentation({
                        ...documentation,
                        emailInstructions: !!checked,
                      })
                    }
                  />
                  <Label htmlFor="email-instructions">Email Instructions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dns-config"
                    checked={documentation.dnsConfiguration}
                    onCheckedChange={(checked) =>
                      setDocumentation({
                        ...documentation,
                        dnsConfiguration: !!checked,
                      })
                    }
                  />
                  <Label htmlFor="dns-config">DNS Configuration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="receiving-sending"
                    checked={documentation.receivingSending}
                    onCheckedChange={(checked) =>
                      setDocumentation({
                        ...documentation,
                        receivingSending: !!checked,
                      })
                    }
                  />
                  <Label htmlFor="receiving-sending">
                    Receiving & Sending Emails
                  </Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Send className="h-5 w-5 text-green-500" />
                <h2 className="text-xl font-bold">Sending Emails</h2>
              </div>
              <p className="text-muted-foreground">
                Use your verified support email to respond to customer
                inquiries.
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Verified</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your email {workspaceData.email} has been successfully
                      verified.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="font-medium">Best Practices</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="bg-blue-50 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-3 w-3 text-blue-600" />
                  </div>
                  <span>
                    Ensure each email is sent with a clear and professional tone
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-50 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-3 w-3 text-blue-600" />
                  </div>
                  <span>
                    Represent your company's brand and values in communications
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-50 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-3 w-3 text-blue-600" />
                  </div>
                  <span>Respond to customer inquiries within 24 hours</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold">Create Issue</h2>
              </div>
              <p className="text-muted-foreground">
                Easily track and manage customer issues right from your email.
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Setup Complete!</h3>
                    <p className="text-muted-foreground mt-1">
                      Your workspace "{workspaceData.name}" is ready to use.
                    </p>
                  </div>
                  <Button className="mt-4">Go to Dashboard</Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-sm text-muted-foreground">
              You can always change these settings later in your workspace
              configuration.
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Kastamer</h1>
          <p className="text-muted-foreground">Add Workspace</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">
              STEP {currentStep} OF {totalSteps}
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </div>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">{renderStepContent()}</CardContent>

          <Separator />

          <CardContent className="p-6">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button onClick={nextStep}>
                {currentStep === totalSteps
                  ? "Finish Setup"
                  : "Save and continue"}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
