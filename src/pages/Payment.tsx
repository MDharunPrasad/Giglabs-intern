import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Lock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { useState } from "react";

export default function Payment() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const courseDetails = {
    name: "Full Stack Development",
    duration: "3 Months",
    price: 4999,
    discount: 1000,
    finalPrice: 3999
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Payment logic will be implemented with Stripe integration
    console.log("Payment processing...", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <Link to="/registration">
          <Button variant="ghost" size="sm" className="mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Registration
          </Button>
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Complete Your Payment
            </h1>
            <p className="text-muted-foreground text-lg">
              Secure payment gateway powered by Stripe
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold">Payment Details</h2>
                    <p className="text-sm text-muted-foreground">Enter your card information</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        maxLength={19}
                        className="bg-background/50 pl-4"
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="JOHN DOE"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value.toUpperCase() })}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        maxLength={5}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        maxLength={4}
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4 flex items-start gap-3">
                    <Lock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold text-foreground mb-1">Secure Payment</p>
                      <p className="text-muted-foreground">
                        Your payment information is encrypted and secure. We use industry-standard SSL encryption.
                      </p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Pay ₹{courseDetails.finalPrice.toLocaleString()}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="glass-card p-6 sticky top-24">
                <h3 className="text-xl font-display font-bold mb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="font-semibold text-foreground">{courseDetails.name}</p>
                    <p className="text-sm text-muted-foreground">{courseDetails.duration} Duration</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Course Price</span>
                      <span className="text-foreground">₹{courseDetails.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400">Early Bird Discount</span>
                      <span className="text-green-600 dark:text-green-400">-₹{courseDetails.discount.toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl text-primary">₹{courseDetails.finalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-4 space-y-3">
                  <p className="font-semibold text-sm text-foreground mb-2">What's Included:</p>
                  {[
                    "Lifetime Access",
                    "Certificate of Completion",
                    "Live Project Work",
                    "Career Support",
                    "1-on-1 Mentorship"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
}
