"use client";

import React from "react"

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  HelpCircle,
  Calculator,
  Brain,
  BarChart3,
  Lightbulb,
  ChevronRight,
  Home,
  MapPin,
  Ruler,
  Calendar,
  BedDouble,
  Bath,
  Sparkles,
} from "lucide-react";

interface HelpSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export function HelpSheet() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const helpSections: HelpSection[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Sparkles className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Welcome to the AI Real Estate Estimator! Follow these steps to get
            your property valuation:
          </p>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                1
              </span>
              <span>
                <strong className="text-foreground">Select Property Type</strong>
                <br />
                <span className="text-muted-foreground">
                  Choose between House, Apartment, or Villa
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                2
              </span>
              <span>
                <strong className="text-foreground">Enter Location</strong>
                <br />
                <span className="text-muted-foreground">
                  Select the Belgian city where the property is located
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                3
              </span>
              <span>
                <strong className="text-foreground">Fill Property Details</strong>
                <br />
                <span className="text-muted-foreground">
                  Add surface area, rooms, bathrooms, and construction year
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                4
              </span>
              <span>
                <strong className="text-foreground">Get Your Estimate</strong>
                <br />
                <span className="text-muted-foreground">
                  Click &quot;Quick Estimate&quot; or &quot;Compare Algorithms&quot;
                </span>
              </span>
            </li>
          </ol>
        </div>
      ),
    },
    {
      id: "property-fields",
      title: "Property Fields",
      icon: <Home className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Understanding each input field:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Home className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Property Type</p>
                <p className="text-xs text-muted-foreground">
                  The type of property significantly affects pricing. Villas
                  typically command higher prices than apartments.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <MapPin className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Location</p>
                <p className="text-xs text-muted-foreground">
                  Belgian cities have varying property markets. Brussels and
                  Antwerp typically have higher prices.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Ruler className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Surface Area (m²)
                </p>
                <p className="text-xs text-muted-foreground">
                  Total living space in square meters. This is one of the
                  strongest price predictors.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Calendar className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Construction Year
                </p>
                <p className="text-xs text-muted-foreground">
                  Newer properties may have premium pricing. Historic properties
                  can also command higher prices.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <BedDouble className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Number of Rooms
                </p>
                <p className="text-xs text-muted-foreground">
                  Total bedroom count. More rooms generally increase property
                  value.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <Bath className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Bathrooms</p>
                <p className="text-xs text-muted-foreground">
                  Number of bathrooms. Additional bathrooms add value,
                  especially in larger properties.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "algorithms",
      title: "ML Algorithms",
      icon: <Brain className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Our estimator uses multiple machine learning algorithms:
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="text-sm font-medium text-foreground">
                Linear Regression
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Finds the best linear relationship between property features and
                price. Fast and interpretable, works well for general trends.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Speed: Fast
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Best for: General estimates
                </span>
              </div>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="text-sm font-medium text-foreground">Decision Trees</p>
              <p className="text-xs text-muted-foreground mt-1">
                Makes predictions by learning decision rules from data. Great at
                capturing non-linear patterns in the market.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Speed: Fast
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Best for: Complex patterns
                </span>
              </div>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="text-sm font-medium text-foreground">k-NN Algorithm</p>
              <p className="text-xs text-muted-foreground mt-1">
                Predicts based on similar properties in the dataset. Excellent
                for finding comparable properties in the same area.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Speed: Medium
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Best for: Similar property lookup
                </span>
              </div>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="text-sm font-medium text-foreground">Random Forest</p>
              <p className="text-xs text-muted-foreground mt-1">
                Combines multiple decision trees for more robust predictions.
                Reduces overfitting and improves accuracy.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Speed: Slower
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Best for: Highest accuracy
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "results",
      title: "Understanding Results",
      icon: <BarChart3 className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            How to interpret your prediction results:
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-sm font-medium text-foreground">
                Estimated Price
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                The predicted market value based on the algorithm&apos;s analysis of
                similar properties and market trends.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-sm font-medium text-foreground">
                Confidence Score
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Indicates how confident the model is in its prediction. Higher
                scores mean the property closely matches known patterns.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-sm font-medium text-foreground">
                Processing Time
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                How long the algorithm took to compute. Useful when comparing
                algorithm performance.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-sm font-medium text-foreground">
                Factor Weights
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Shows which factors most influenced the prediction: Location
                (35%), Surface Area (28%), Property Type (15%), Construction
                Year (12%).
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tips",
      title: "Pro Tips",
      icon: <Lightbulb className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Get the most accurate estimates with these tips:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Compare Algorithms:</strong> Use
                &quot;Compare Algorithms&quot; to see estimates from all models and get a
                more complete picture.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Be Precise:</strong> Accurate
                input data leads to better predictions. Double-check your
                property details.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Consider Condition:</strong>{" "}
                Property condition significantly affects value. Our model
                factors this in when selected.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Check Confidence:</strong> Higher
                confidence scores indicate more reliable predictions.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Use Neural Net:</strong> For
                complex properties, try the Neural Network page for deep
                learning-based estimates.
              </span>
            </li>
          </ul>
          <Separator className="my-4" />
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-sm font-medium text-foreground">Disclaimer</p>
            <p className="text-xs text-muted-foreground mt-1">
              These estimates are for informational purposes only and should not
              replace professional property appraisals. Market conditions can
              change rapidly.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 border-0"
        >
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            How to Use
          </SheetTitle>
          <SheetDescription>
            Quick guide for the AI Real Estate Estimator
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)] pr-4">
          <div className="space-y-2">
            {helpSections.map((section) => (
              <div key={section.id} className="rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() =>
                    setActiveSection(
                      activeSection === section.id ? null : section.id
                    )
                  }
                  className="flex w-full items-center justify-between p-3 text-left hover:bg-secondary/50 transition-colors rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                      {section.icon}
                    </div>
                    <span className="font-medium text-foreground text-sm">
                      {section.title}
                    </span>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                      activeSection === section.id ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {activeSection === section.id && (
                  <div className="px-3 pb-3 pt-1">{section.content}</div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
